import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BannerType } from "../interfaces/Banner";
import { urlFor } from "../lib/client";

type PropTypes = {
  footerBanner: BannerType;
};

const FooterBanner = ({
  footerBanner: {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    desc,
    buttonText,
    product,
    image,

  },
}: PropTypes) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>
        {image &&
        <div className="footer-banner-image">
          <Image src={urlFor(image).url()} alt="product" height="450" width="450"/>
        </div>
          }
      </div>
    </div>
  );
};

export default FooterBanner;
