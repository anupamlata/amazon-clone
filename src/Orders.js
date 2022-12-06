import React,{useState, useEffect} from 'react';
import {db} from './firebase';
import './Orders.css';
import { useStateValue } from './StateProvider'; 
import Order from './Order';

function Orders() {
    const [{ basket, user }, dispatch] = useStateValue();
    const  [order, setOrder] = useState([]);

    useEffect(() => {
        if(user) {
        db
          .collection('users')
          .doc(user?.uid)
          .collection('order')
          .orderBy('created','desc')
          .onSnapshot(snapshot => (
             setOrders(snapshot.docs.map(doc => ({
                 id: doc.id,
                 data: doc.data()
             })))
          ))
            }else{
                setOrder([]);
            }
    },[user])
  return (
    <div className='order'>
        <h1>your order</h1>
        <div className='orders__order'>
            {orders?.map(order => (
                <Order oeder={order} />
            ))}
        </div>
    </div>
  )
}

export default Orders