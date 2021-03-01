import path from 'path';
import pug from 'pug';
import puppeteer from 'puppeteer';
import { siteUrl } from '../common';

const pdfOptions = {
    width: '10in', 
    height: '11.7in', 
    printBackground: true
};

const PDF_TEMPLATE_PATH = path.join(__dirname, 'templates');

const pdfContent = async (pdfName, pdfData) => {

    pdfData = pdfData || {};

    pdfData.siteUrl = siteUrl;

    try {
        let pdfHtml = pug.renderFile(`${PDF_TEMPLATE_PATH}/${pdfName}.pug`, pdfData);
	
        // we are using headless mode 
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        // We set the page content as the generated html by handlebars
        await page.setContent(pdfHtml);
        
        // We Use pdf function to generate the pdf in the same folder as this file.
        let content = await page.pdf(pdfOptions);
        
        await browser.close();
    
        return content;

    } catch (err) {
        throw err;
    }

};

export default pdfContent;