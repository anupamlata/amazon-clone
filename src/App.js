import React,{ useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';
import Orders from './Order';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe('pk_test_51MBGdISGyb8FG0iWA4zujZRdTCp1uGkzwBvi68jAPNmwZWAeo9UMtDxDqmrxoW32FvocTkGLqaF41b84AYCTLqkN00qSay2ARq')

function App() {
  const [{},dispatch] = useStateValue();
  useEffect (() =>{
     //will only run once when the aap component loads...
     auth.onAuthStateChanged(authUser => {
       console.log('THE USER IS >>>',authUser);

       if(authUser) {
        //the user just logged in / the user was logged in
        
        dispatch ({
          type: 'SET_USER',
          user: authUser
        })
       }else {
        //the user logged out
        dispatch ({
          type: 'SET_USER',
          user: null
        })
       }
     })
  },[])

  return (
    <BrowserRouter>
      <div className="App">
        <h1>hey anupam programmer,lets build a amazon-clone</h1>
        <Routes>
          <Route path='/order' element={
          <>
          <Header />
          <Orders />
          </>
          } />
          <Route path='/login' element={
            <React.Fragment>
              <Login />
            </React.Fragment>
          } />
          <Route path='/checkout' element={
            <>
              <Header />
              <Checkout />
            </>
          } />
          <Route path='/payment' element={
            <>
              <Header />
              <Elements stripe={promise}>
               <Payment />
              </Elements>
            </>
          } />
          <Route path='/' element={
            <>
              <Header />
              <Home />
            </>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
