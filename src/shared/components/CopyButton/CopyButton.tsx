import React, { useState } from "react";
import "./CopyButton.css";

const copyBtnGray = require("@assets/copybtnngray.svg").default as string;
const copyBtnGreen = require("@assets/copybtngreen.svg").default as string;

const CopyButton = ({ className, text, children }: any) => {
  const [isHover, setIsHover] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true);
      })
      .catch((error) => {});
  };

  return (
    <button
      className={className}
      onClick={copyToClipboard}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      {isHover || isCopied ? (
        <img alt="greenCopyBtn" src={copyBtnGreen} />
      ) : (
        <img alt="grayCopyBtn" src={copyBtnGray} />
      )}
      <span>{children && isCopied ? "Скопировано!" : children}</span>
    </button>
  );
};

export default CopyButton;
