 import React from 'react'
 import './Checkout.css';
 import Subtotal from './Subtotal';
 import { useStateValue } from "./StateProvider";
 import CheckoutProduct from './CheckoutProduct';

 function Checkout() {
  const [{ basket,user },dispatch] = useStateValue();

   return (
     <div className='checkout'>
        <div className='checkout__left'>
             <img 
             className="checkout__ad" 
             src='https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/887c81fe-4fce-457e-bd2a-2e2376585052.jpg'
             alt="" />
             <div>
                 <h3>hello,{user?.email}</h3>   
                <h2 className='checkout__title'>Your Shoping Basket</h2>
                
               {basket.map(item => (
                <CheckoutProduct 
                id= {item.id}
                title= {item.title}
                image= {item.image}
                price= {item.price}
                rating= {item.rating}
                />
               ))}
             </div>
        </div>

        <div className='checkout__right'>
            <Subtotal />
        </div>
     </div>
   )
 }
 
 export default Checkout