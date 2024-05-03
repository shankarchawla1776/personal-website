import * as React from "react";

export const ReadingListTemplate = ({ papers }) => {
  return (
    <div className="container">
      <h1>Shankar's Reading List</h1>
      <ul>
        {papers.map((paper, index) => (
          <li key={index}>
            <h2><a href={paper.url} target="_blank" rel="noopener noreferrer">{paper.title}</a></h2>
            <p>Author(s): {paper.author}</p>
            <p>Published: {paper.year}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
