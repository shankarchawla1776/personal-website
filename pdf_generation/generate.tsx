import React from "react";
import { ReadingListTemplate } from "./components/pdf-template";
import { Onedoc } from "@onedoc/client";
import { readFileSync } from "fs";
import { compile } from "@onedoc/react-print";
import { join } from "path";

// const ONEDOC_API_KEY = process.env.ONEDOC_API_KEY; // Replace this with your actual API key
const ONEDOC_API_KEY = "38fb520f-27ba-4d9b-9e1a-a4a9fc53c6de";

(async () => {
  try {
    const papers = [
      { title: "SWE-Bench: Can Language Models Resolve Real-World GitHub Issues? ", author: "Jimenez et al.", year: "2023", url: "https://arxiv.org/pdf/2310.06770" },
      { title: "Reciprocal interactions between parietal and occipito-temporal representations support everyday object-directed actions", author: "Mahon & Almeida", year: "2024", url: "https://www.sciencedirect.com/science/article/pii/S0028393224000563" },
      { title: "DevBench: A Comprehensive Benchmark for Software Development", author: "Li et al.", year: "2024", url: "https://arxiv.org/pdf/2403.08604"},
      { title: "Hybrid Internal Model: Learning Agile Legged Locomotion with Simulated Robot Response", author: "Long et al.", year:"2024", url: "https://arxiv.org/pdf/2312.11460"}, 
      { title: "LLMSat: A Large Language Model-Based Goal-Oriented Agent for Autonomous Space Exploration", author: "David Maranto", year: "2024", url: "https://arxiv.org/pdf/2405.01392"}
    ];

    const onedoc = new Onedoc(ONEDOC_API_KEY);

    let doc = {
      html: await compile(<ReadingListTemplate papers={papers} />),
      title: "Academic Reading List",
      test: false,
      save: true,
      expiresIn: 1,
      assets: [
        {
          path: "./stylesheet.css",
          content: readFileSync(join(process.cwd(), "stylesheet.css")).toString(),
        },
      ],
    };

    const { file, link, error, info } = await onedoc.render(doc);

    if (error) {
      throw error;
    }

    console.log(link);
  } catch (e) {
    console.error("Failed to generate PDF:", e);
  }
})();
