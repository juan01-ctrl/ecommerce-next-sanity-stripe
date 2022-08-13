import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BannerType } from "../interfaces/Banner";
import {urlFor} from '../lib/client'

type PropTypes = {
  heroBanner: BannerType 
};

const HeroBanner = ({ heroBanner }: PropTypes) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner?.smallText}</p>
        <h3>{heroBanner?.midText}</h3>
        <h1>{heroBanner?.largeText1}</h1>
        <div className="hero-banner-image">
        <Image src={urlFor(heroBanner?.image)?.url()} alt="headphones" height="550" width="550" />
        </div>

        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button type="button">{heroBanner?.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner?.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
