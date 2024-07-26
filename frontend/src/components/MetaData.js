import React from "react";
import { Helmet } from "react-helmet-async";

const MetaData = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

MetaData.defaultProps = {
  title:
    "Welcome to Phoneky | Online Shop for quality gadgets",
  description:
    "Online Shop for Laptops, Phones, Desktops",
  keywords:
    "buy, laptop, cheap phones, cheap gadgets, redmi, new phones, new laptop",
};

export default MetaData;
