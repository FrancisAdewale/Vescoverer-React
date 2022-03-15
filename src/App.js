import './App.css';
import firebase from './firebase';
import Home from './componenets/Home';
import Login from "./componenets/Login"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function App() {

  const [vegan, setVegan] = useState(false)
  const [shake, setShake] = useState(false);


  let result = JSON.parse(localStorage.getItem('isVegan'))
  console.log(result)

  const db = firebase.firestore
  const auth = firebase.auth


  function isVegan() {

    if(vegan) {
      localStorage.setItem("isVegan", JSON.stringify(vegan))
      
    } else {
         setShake(true);
         setTimeout(() => setShake(false), 2000);
    }
  }

  function checkIfVegan(e) {
    const {type, checked} = e.target
    setVegan(checked)
  }

  return (
    <div className='outer'>
      <div className='middle'>
        <div className='inner'>
          
         <Home 
        callback={isVegan}
        handleChange={checkIfVegan}
        shake={shake}
        isVegan={vegan}
         /> 

        </div>
      </div>

    </div>
   
  );
}

export default App;
