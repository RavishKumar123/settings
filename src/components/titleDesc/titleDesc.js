import React from "react";

const TitleDesc = ({ title, description }) => {
  return (
    <>
      <span className="d-block">{title}</span>
      <span className="text-muted">{description}</span>
    </>
  );
};

export default TitleDesc;
