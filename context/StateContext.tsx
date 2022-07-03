import React, {
  createContext,
  useContext,
  useState,
  ReactElement,
 
} from "react";
import { ProductType } from '../interfaces/Product';
import { toast } from "react-hot-toast";
import { Product } from "../components";



type StateContextType = {
  showCart: boolean;
  cartItems: ProductType[];
  totalPrice?: number;
  totalQuantities?: number;
  quantity: number;
  increaseQty: () => void;
  decreaseQty: () => void;
  addToCart:(product:ProductType,quantity:number)=>void
  setShowCart:React.Dispatch<React.SetStateAction<boolean>>
  toggleCartItemQty:(id:string,value:string)=>void
  removeFromCart:(id:string)=>void
  setCartItems:React.Dispatch<React.SetStateAction<ProductType[]>>
  setTotalQuantities:React.Dispatch<React.SetStateAction<number>>
  setTotalPrice:React.Dispatch<React.SetStateAction<number>>
};

export const Context = createContext({} as StateContextType);

type PropTypes = {
  children: ReactElement;
};

export const StateContext = ({ children }: PropTypes) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<ProductType[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantities, setTotalQuantities] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  let foundProduct:ProductType | undefined;


  const addToCart = (product:ProductType,quantity:number) =>{
    const checkProductInCart = cartItems?.find((item)=>item._id === product._id)
    setTotalPrice((prevTotalPrice)=> prevTotalPrice + product.price * quantity)
    setTotalQuantities((prevTotalQuantities)=> prevTotalQuantities + quantity)

    if(checkProductInCart){

      const updatedCartItems = cartItems?.map(cartProduct =>{
        if(cartProduct._id === product._id) return {
          ...cartProduct,
          quantity:cartProduct?.quantity + quantity 
        }
        return cartProduct
      } )

      setCartItems(updatedCartItems)
    }else{
      product.quantity = quantity
      setCartItems([...cartItems,{...product}])
    }
    toast.success(`${quantity} ${product.name} added to the cart.`)
    setQuantity(1)
  }

  const toggleCartItemQty = (id:string,value:string) =>{
    foundProduct = cartItems.find(item=> item._id === id) 
 
    if(foundProduct && value === 'inc'){
      const updateCartItemQty = cartItems?.map(item=> {
        if(item._id === id){
          return {...item,quantity:item.quantity+1}
        }
        console.log("hola")
        return item
      })

      setCartItems(updateCartItemQty)
      setTotalPrice(prevTotalPrice => prevTotalPrice +foundProduct!.price)
      setTotalQuantities(prevTotalQuantities=>prevTotalQuantities + 1 )
    }else if(foundProduct && value === 'dec'){
      if(foundProduct.quantity >1){
        const updateCartItemQty = cartItems.map(item=> {
          if(item._id === id){
            return {...item,quantity:item.quantity-1}
          }
          return item
        })
        setCartItems(updateCartItemQty)
        setTotalPrice(prevTotalPrice => prevTotalPrice -foundProduct!.price)
        setTotalQuantities(prevTotalQuantities=>prevTotalQuantities - 1 )
      }else{
        removeFromCart(id)
      }
    }
  }

  const removeFromCart = (id:string) =>{
    foundProduct = cartItems.find(item=> item._id === id) 
    if(foundProduct){
    const newCartItems = cartItems.filter((item) => item._id !== foundProduct!._id)
       setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct!.price * foundProduct!.quantity)
        setCartItems(newCartItems)
        setTotalQuantities(prevTotalQuantities=> prevTotalQuantities - foundProduct!.quantity)
      }
  }
  const increaseQty = () => {
    setQuantity((prev) => prev + 1);
  };
  const decreaseQty = () => {
    setQuantity((prev) => (prev <= 2 ? 1 : prev - 1));
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        quantity,
        increaseQty,
        decreaseQty,
        addToCart,
        setShowCart,
        toggleCartItemQty,
        removeFromCart,
        setCartItems,
        setTotalQuantities,
        setTotalPrice
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => {
 return useContext(Context);
};
