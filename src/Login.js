import React,{useState} from 'react';
import './Login.css';
import { Link, useNavigate} from "react-router-dom";
import { auth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from './firebase';

function Login() {
    const navigate=useNavigate(); 
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 
const signIn = e => {
    e.preventDefault();
   
      signInWithEmailAndPassword(auth,email,password)
      .then(auth =>{
        navigate('/')
      })
      .catch(error =>alert(error.message))

    //some fancy firebase login shitttt....
 }
 const register = e => {
    e.preventDefault();

   
    createUserWithEmailAndPassword(auth,email,password)
    .then((auth) => {
//it successfully created a new user with email and password

        //console.log(auth);
        if(auth) {
           navigate('/ ')
        }
    })
    .catch(error => alert( error.message))

    ////some fancy firebase register shitttt....
 }

  return (
    <div className='login'>
        <Link to='/'>
        <img 
         className='login__logo'
         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_umixnVplgh8Ivltsk9SG7v3fYbtl7QHH1w&usqp=CAU" 
         alt="nand"
        />
        </Link>
        <div className='login__container'>
            <h1>Sign-in</h1>

            <form>
                <h5>E-mail</h5>
                <input 
                type='text'  
                value={email} 
                onChange={e => setEmail(e.target.value)}
                />

                <h5>Passward</h5>
                <input 
                type='passward' 
                value={password} 
                onChange={e =>setPassword(e.target.value)}
                />

                 <button 
                 type='sumit'
                 onClick={signIn} 
                 className='login__signInButton'>Sign In </button>
            </form>

            <p>
                By signing-in you agree to the AMAZON FAKE CLONE
                Conditions of Use & sale. Pleasesee our PrivacyNotice
                ,our Cookies Notice and our interest-Based Ads Notice.
            </p>

            <button 
            onClick={register}
            className='login__registerButton'>Create your Amazon account</button>
        </div>
    </div>
  ) 
}

export default Login