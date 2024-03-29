import Link from "next/link";
import React, { useRef } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";
import Image from "next/image";

const Cart = () => {
  const cartRef = useRef(null);
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQty,
    removeFromCart,
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    console.log(cartItems);
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'mode': "no-cors"
      },
      body: JSON.stringify({ cartItems }),
    });

    if (response.status === 500) return;

    const data = await response.json();
    console.log(data);
    toast.loading("Redirecting...");
    if (stripe) stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>
        {cartItems.length < 1 ? (
          <div className="empty-cart">
            {<AiOutlineShopping size={150} />}
            <h3>Your shopping bag is empty.</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="product-container">
            {cartItems?.map((item) => (
              <div className="product" key={item._id}>
                <Image
                  src={urlFor(item?.image[0]).url()}
                  className="cart-product-image"
                  alt={item.name}
  height="400"
  width="400"                
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() => toggleCartItemQty(item._id, "dec")}
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num" style={{ userSelect: "none" }}>
                          {item.quantity}
                        </span>
                        <span
                          className="plus"
                          onClick={() => toggleCartItemQty(item._id, "inc")}
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => removeFromCart(item._id)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {cartItems.length >= 1 && (
          <div className="cart-bottom" style={{ backgroundColor: "#fff" }}>
            <div className="total">
              <h3>Subtotal</h3>
              <h3>${totalPrice?.toFixed(2)}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
