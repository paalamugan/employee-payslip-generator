import path from 'path';
import pug from 'pug';
import puppeteer from 'puppeteer';
import _ from 'lodash';
import numeral from 'numeral';

import { siteUrl, convertNumberToRupees } from '../common';

const pdfOptions = {
    width: '10in',
    height: '11.7in',
    // format: 'A4',
    printBackground: true
};

const PDF_TEMPLATE_PATH = path.join(__dirname, 'templates');

const pdfContent = async (pdfTemplateName, pdfTemplateData) => {

    pdfTemplateData = pdfTemplateData || {};

    pdfTemplateData.siteUrl = siteUrl;
    pdfTemplateData.invalidIcon = '/images/no-icon.jpg';

    pdfTemplateData.convertNumberToRupees = (n) => {
        let word = convertNumberToRupees(n, '&') || '';
        if (!word) {
            return word;
        }
        return _.capitalize(word) + ' only';
    }

    pdfTemplateData.formatCurrency = (amount) => {
        return '₹' + numeral(amount).format('0,0.00')
    }

    try {
        let pdfHtml = pug.renderFile(`${PDF_TEMPLATE_PATH}/${pdfTemplateName}.pug`, pdfTemplateData);

        // we are using headless mode
        const browser = await puppeteer.launch({
            args: [
              '--no-sandbox',
              '--disable-setuid-sandbox',
            ],
        });
        const page = await browser.newPage();

        // We set the page content as the generated html by handlebars
        await page.setContent(pdfHtml);

        await page.addStyleTag({
            content: '@page { size: auto; }',
        })

        // We Use pdf function to generate the pdf in the same folder as this file.
        let content = await page.pdf(pdfOptions);

        await browser.close();

        return content;

    } catch (err) {
        console.log("err", err);
        throw err;
    }

};

export default pdfContent;