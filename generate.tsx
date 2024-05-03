import React from "react";
import { PDFTemplate } from "./components/pdf-template";
import { Onedoc } from "@onedoc/client";
import { readFileSync } from "fs";
import { compile } from "@onedoc/react-print";
import { join } from "path";
// import dotenv from 'dotenv';

// dotenv.config();

const ONEDOC_API_KEY = process.env.ONEDOC_API_KEY;

(async () => {
  try {
    const onedoc = new Onedoc(ONEDOC_API_KEY);
    const papers = [
      { title: "Understanding AI", author: "John Doe", date: "2022-01-15", link: "https://example.com/paper1" },
      { title: "Advances in Quantum Computing", author: "Jane Smith", date: "2022-05-20", link: "https://example.com/paper2" }
      // More papers can be added here
    ];

    let doc = {
      html: await compile(<PDFTemplate name="Sathwik Pericherla" papers={papers} />),
      title: "Academic Reading List",
      test: true,
      save: true,
      expiresIn: 30,
      assets: [
        {
          path: "./stylesheet.css",
          content: readFileSync(join(process.cwd(), "stylesheet.css"), 'utf8'),
        },
      ],
    };

    const { file, link, error, info } = await onedoc.render(doc);

    if (error) {
      throw error;
    }

    console.log(link);
  } catch (error) {
    console.error("Failed to generate PDF: ", error);
  }
})();
