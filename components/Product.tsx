import React from "react";
import Link from "next/link";
import { ProductType } from "../interfaces/Product";
import { urlFor } from "../lib/client";
import Image from "next/image";

type PropTypes = {
  product: ProductType;
};
const Product = ({ product: { image, name, slug, price } }: PropTypes) => {
  return (
    <div>
      <Link href={`/product/${slug?.current}`}>
        <div className="product-card">
          {image&&<Image
            src={urlFor(image[0]).url()}
            alt={name}
            width={250}
            height={250}
            className="product-image"
          />}
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>

        </div>
      </Link>
    </div>
  );
};

export default Product;
