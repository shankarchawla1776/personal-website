import * as React from 'react';

const ReadingList = ({ papers }) => {
  return (
    <div className="reading-list-container">
      <h1>Academic Reading List</h1>
      <ul>
        {papers.map((paper, index) => (
          <li key={index} className="paper-item">
            <h2>{paper.title}</h2>
            <p className="author">by {paper.author}</p>
            <p className="date">Published: {paper.date}</p>
            <a href={paper.link} className="read-more">Read More</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReadingList;
