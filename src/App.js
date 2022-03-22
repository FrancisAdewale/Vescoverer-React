import './App.css';
import Home from './componenets/Home';
import { useEffect, useState } from 'react';
import WhiteBlob from "./imgs/white-blob.png"
import BrandBlob from "./imgs/brand-blob.png"

function App() {

  const [vegan, setVegan] = useState(false)
  const [shake, setShake] = useState(false);


  let result = JSON.parse(localStorage.getItem('isVegan'))

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
      <img src={WhiteBlob} className="white-blob" />
      <img src={BrandBlob} className="brand-blob" />
       
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
