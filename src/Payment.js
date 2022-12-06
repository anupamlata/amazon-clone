import React, {useEffect, useState } from 'react'
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import { useStateValue } from './StateProvider'
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format'; 
import { getBasketTotal } from './Reducer';
import { async } from '@firebase/util';
import axios from "axios";
import { db } from './firebase';

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setclientSecret] = useState(true);

    useEffect(() => {
       //generate the special stripe secret which allows us to charge
        // a cutomer 
        const getClientSecret = async() =>{
            const response =await axios({
                method: 'post',
                //Stripe expects the total in a currencies sumites 
                url: `/payments/create?total=${getBasketTotal(basket)* 100}`
            });
            setclientSecret(response.data.clientSecret)
            }
      getClientSecret();
    },[basket]);

    console.log('THE SECRET IS>>>',clientSecret);
    //console.log('person',user);

    const handleSumit = async (event) => {
        //  do all the fancy stripe stuff..  
       event.preventDefault();
       setProcessing(true);

       const payload = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement)
          }
       }).then(({paymentIntent}) => {
        //paymentIntent = payment confirmation
        db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')        //firebase
        .doc(paymentIntent.id)      //from cloud firestore
        .set({
            basket: basket,
            amount: paymentIntent.amount,
            created:paymentIntent.created
        })

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
            type:'EMPTY_BASKET'
        })

        navigate('/orders',{replace: true})
       })
    }

    const handleChange = event => {
        //Listen  for changes in the CardElements
        //and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout(
                    <Link to='/checkout'>{basket?.length} items</Link>
                    )
                </h1>
                {/* payment section -divery adress*/}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Dilevery Adress</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>123 react lane</p>
                        <p>Loc Angeles ,CA</p>
                    </div>

                </div>
                {/* payment section -review item*/}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and Delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>

                </div>
                {/* payment section - payment method*/}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment method</h3>
                    </div>
                    <div className='payment__details'>
                        {/* stripe magic will go */}
                        <form onSubmit={handleSumit}>
                            <CardElement onChange={handleChange} />

                            <div className='payment__priceContainer'>
                                <CurrencyFormat
                                    renderText={(value) => (
                                       <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}  
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix="$"
                                />
                                <button disabled = {processing || disabled || succeeded}>
                                    <span>
                                        {processing ? <p>Processing</p> : "Buy Now"}
                                    </span>
                                </button>
                            </div>

                            {/* Errors */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>

            </div>

        </div>

    )
}

export default Payment