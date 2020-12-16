import React from "react";
import "./DetailRow.scss";

const DetailRow = ({ className, iconSource, text }) => {
  const textSplit = text.split(":");

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
            <span className="detail-row__text-value">{textSplit[1]}</span>
          </>
        ) : (
          <span className="detail-row__text-value">{text}</span>
        )}
      </div>
    </div>
  );
};

export default DetailRow;
