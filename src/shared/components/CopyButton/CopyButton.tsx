import React, { useState } from "react";
import "./CopyButton.css";

const COPY_BUTTON: string = require("@assets/copybtn.png");
const CopyButton = ({ className, text, children }: any) => {
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
    <button className={className} onClick={copyToClipboard}>
      <img alt="icon_copybtn" src={COPY_BUTTON} />
      <span>{children && isCopied ? "Скопировано!" : children}</span>
    </button>
  );
};

export default CopyButton;
