import React, { useState, useContext } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { GetStaticPaths } from "next";
import { ProductType } from "../../interfaces/Product";
import { client, urlFor } from "../../lib/client";
import { Product } from "../../components";
import { useStateContext } from "../../context/StateContext";
import Image from "next/image";

type PropTypes = {
  product: ProductType;
  products: ProductType[];
};

const ProductDetails = ({ product, products }: PropTypes) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState<number>(0);

  const { increaseQty, decreaseQty, quantity, addToCart, setShowCart } =
    useStateContext();

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setShowCart(true);
  };
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <div className="product-detail-image">
              {image && (
                <Image
                  src={urlFor(image[index]).url()}
                  alt={name}
                  width="400px"
                  height="400px"
                />
              )}
            </div>
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <Image
                src={urlFor(item).url()}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                alt={name}
                onMouseEnter={() => setIndex(i)}
                key={i}
                width="400"
                height="400"
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={() => decreaseQty()}>
                <AiOutlineMinus />
              </span>
              <span className="num" style={{ userSelect: "none" }}>
                {quantity}
              </span>
              <span className="plus" onClick={() => increaseQty()}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons" style={{ userSelect: "none" }}>
            <button
              type="button"
              className="add-to-cart"
              onClick={() => addToCart(product, quantity)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "product"]{
    slug{
      current
    }
  }
  `;
  const products = await client.fetch(query);

  const paths = products.map((product: ProductType) => ({
    params: {
      slug: product.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  console.log(product);
  return {
    props: { product, products },
  };
};

export default ProductDetails;
