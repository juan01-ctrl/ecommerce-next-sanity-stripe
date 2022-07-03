import React from 'react'
import {client} from '../lib/client'
import {Navbar,Footer,Product,HeroBanner,Cart,FooterBanner,Layout} from '../components';
import { ProductType } from '../interfaces/Product';
import { BannerType } from '../interfaces/Banner';

type PropTypes = {
  products:ProductType[],
  banner:BannerType[]
}

const index = ({products,banner}:PropTypes) => {
  return (
    <>

      <HeroBanner heroBanner={banner[0]}/>
      <div className='products-heading'>
        <h2>Beset Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>


      <div className='products-container'>
     {products?.map((product)=>(<Product key={product._id} product={product}/>
     ))}
      </div>

      <FooterBanner footerBanner={banner && banner[0]}/>

    </>
  )
}

export const getServerSideProps= async() =>{
  const query = '*[_type == "product"]'
  const products = await client.fetch(query)

  const bannerQuery = '*[_type == "banner"]'
  const banner = await client.fetch(bannerQuery)

  return {
    props:{products,banner}
  }
}

export default index
