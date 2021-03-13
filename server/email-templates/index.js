import path from 'path';
import Email from 'email-templates';
// import { minify } from 'html-minifier';
import utils from './utils';
import templateData from './template-data';

const email = new Email({
    views: {
        root: path.join(__dirname, 'templates')
    },
    juice: true,
    juiceResources: {
        preserveImportant: true,
        webResources: {
            relativeTo: path.join(__dirname, 'templates')
        }
    },
    i18n: {},

    // message: {
    //     from: 'no-reply@gmail.com'
    // },
    // // uncomment below to send emails in development/test env:
    // // send: true,
    // transport: {
    //     jsonTransport: true
    // }
});

// const minifyOptions = {
//     removeComments: true,
//     collapseBooleanAttributes: true,
//     // collapseInlineTagWhitespace: true,
//     // collapseWhitespace: true,
//     // removeAttributeQuotes: true,
//     // removeTagWhitespace: true,
//     // useShortDoctype: true,
//     // minifyURLs: true,
//     // minifyCSS: true
// };

const renderEmailTemplate = async (templateName, data) => {

    if (typeof templateName !== "string") {
        throw new Error("First parameter must be a string!");
    }

    let localData = templateData[templateName];
    let defaultData = utils.defaultTemplateData();

    if (!localData) {
        throw new Error(`Invalid template name: ${templateName}!. template name must be mention inside template-data.js file.`);
    }

    Object.assign(localData, data, defaultData);

    try {
        let html = email.render(templateName, localData);
        // html = minify(html, minifyOptions);
        return html;
    } catch (err) {
        throw err;
    }
};

export default renderEmailTemplate;








