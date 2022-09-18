import path from "path";
import pug from "pug";
import _ from "lodash";
import numeral from "numeral";
import fetch from "node-fetch";

import { siteUrl, convertNumberToRupees } from "../common";
import { writeFileSync } from "fs";

const PDF_TEMPLATE_PATH = path.join(__dirname, "templates");

const pdfContent = async (pdfTemplateName, pdfTemplateData) => {
  pdfTemplateData = pdfTemplateData || {};

  pdfTemplateData.siteUrl = siteUrl;
  pdfTemplateData.invalidIcon = "/images/no-icon.jpg";

  pdfTemplateData.convertNumberToRupees = (n) => {
    let word = convertNumberToRupees(n, "&") || "";
    if (!word) {
      return word;
    }
    return _.capitalize(word) + " only";
  };

  pdfTemplateData.formatCurrency = (amount) => {
    return numeral(amount).format("0,0.00");
  };

  let pdfHtml = pug.renderFile(`${PDF_TEMPLATE_PATH}/${pdfTemplateName}.pug`, pdfTemplateData);

  try {
    const response = await fetch(`${process.env.PDF_GENERATOR_ENDPOINT}/api/pdfGenerator`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payload: pdfHtml,
      }),
    });
    if (!response.ok) {
      throw await response.json();
    }

    return response.buffer();
  } catch (err) {
    throw new Error(err.error || err.message);
  }
};

export default pdfContent;
