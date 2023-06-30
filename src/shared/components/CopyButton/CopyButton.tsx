import React, { useState } from "react";
import "./CopyButton.css";

const COPY_BUTTON: string = require("@assets/copybtn.png");
const CopyButton = ({ className, text }: any) => {
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
      <span>{isCopied ? "Скопировано!" : "Копировать URL"}</span>
    </button>
  );
};

export default CopyButton;
