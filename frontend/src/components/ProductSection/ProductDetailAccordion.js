import React, { useEffect, useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

const ProductDetailAccordion = ({
  title,
  description,
  shippingInfo,
  alwaysOpen,
}) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  useEffect(() => {
    if (alwaysOpen) {
      setAccordionOpen(!!alwaysOpen);
    }
  }, [alwaysOpen]);

  const handleAccordion = () => {
    if (!alwaysOpen) {
      accordionOpen ? setAccordionOpen(false) : setAccordionOpen(true);
    } else {
      setAccordionOpen(!accordionOpen);
    }
  };

  return (
    <div className="w-full">
      <button
        className="outline-none flex justify-between w-full p-3 items-center bg-dash-bg"
        onClick={handleAccordion}
      >
        <span>
          <h2 className="font-bold text-base text-left">{title} </h2>
        </span>
        {accordionOpen ? (
          <span>
            <SlArrowUp />
          </span>
        ) : (
          <SlArrowDown />
        )}
      </button>
      <div
        className={` text-left grid overflow-hidden mt-2 transition-all ease-in-out duration-300  ${
          accordionOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div
          className={`overflow-hidden ${accordionOpen ? "p-3" : "p-0"}  
`}
        >
          <div
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <div className="text-sm ">{shippingInfo}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailAccordion;
