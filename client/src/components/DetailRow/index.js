import React from "react";
import "./DetailRow.scss";

const DetailRow = ({ className, iconSource, text, isLink, link }) => {
  const textSplit = text.split(": ");

  const detailValue = (text) =>
    isLink ? (
      <a className="detail-row__text-value-link" href={link}>
        {text}
      </a>
    ) : (
      <span className="detail-row__text-value">{text}</span>
    );

  return (
    <div className={`detail-row ${className}`}>
      <div className="image">
        <img
          src={require(`../../Images/${iconSource.image}`)}
          alt={iconSource.alt}
        />
      </div>
      <div className="detail-row__text">
        {textSplit.length === 2 ? (
          <>
            <span className="detail-row__text-key">{`${textSplit[0]}:  `}</span>
            {detailValue(textSplit[1])}
          </>
        ) : (
          <span className="detail-row__text-value">{text}</span>
        )}
      </div>
    </div>
  );
};

export default DetailRow;
