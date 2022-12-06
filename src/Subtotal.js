import React from 'react'
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format'; 
import { Button } from '@mui/material';
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from './Reducer';
import { useNavigate } from 'react-router-dom';

function Subtotal() {
  const navigate = useNavigate()
  const [{basket},dispatch] = useStateValue();

  return (
    <div className='subtotal'>
    <CurrencyFormat
    renderText={(value)=>(
        <>
         <p>
            Subtotal({basket.length} items):<strong>{value}</strong>
         </p>
         <small className='subtotal__gift'>
            <input type="checkbox" />
            This Order contains a gift
         </small>
         </>
           )}
         decimalScale={2}
         value={getBasketTotal(basket)}  //part of homework
         displayType={'text'}
         thousandSeparator={true}
         prefix="$"
         />

         <Button onClick={e =>navigate('/payment')}>Proceed to Checkout</Button>
      </div>
  ) 
} 
 
export default Subtotal