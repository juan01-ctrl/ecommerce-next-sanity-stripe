import type { NextApiRequest, NextApiResponse } from "next";
import { ProductType } from "../../interfaces/Product";




const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      console.log(req.body)
      const params = {
        submit_type: "pay",
        mode:"payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate:"shr_1LGU25JIgugbDGD80jIOAG52" },
          { shipping_rate:"shr_1LGU3VJIgugbDGD8bAqBPBJE" },
        ],
        line_items: req.body.cartItems.map((item: ProductType) => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/vfxfwnaw/production/"
            )
            .replace("-webp", ".webp");
          return { 
             
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
           
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };
      
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      console.log(res)

      res.status(200).json(session);
    } catch (error) {
      if(error instanceof Error){
        
        res.status(400).json({error:error.message});
      }
    }
  } else {
    res.setHeader("Allow", "POST");
    
    res.status(405).end("Method Not Allowed");
  }
}
