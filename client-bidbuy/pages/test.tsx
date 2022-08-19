import QRCode from "qrcode.react";
import React from "react";

const test = () => {
  return (
    <QRCode
      value={`http://hasanjahidul.com/product/detail.php?id=${1}`}
      height="100%"
      width="100%"
      size={300}
      renderAs="canvas"
    />
  );
};

export default test;
