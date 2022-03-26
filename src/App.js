import './App.css';
import Home from './componenets/Home';
import { useEffect, useState } from 'react';
import WhiteBlob from "./imgs/white-blob.png"
import BrandBlob from "./imgs/brand-blob.png"
import { Navigate, useNavigate } from 'react-router-dom';
import Login from "./componenets/Login"


function App() {

  const navigate = useNavigate()


  const [vegan, setVegan] = useState(false)
  const [shake, setShake] = useState(false);


  const [result, setResult] = useState(JSON.parse(localStorage.getItem('isVegan')) )


  
  useEffect(() => {
    if(result) {

      navigate("/login")
    }
    
  }, [])


    
  function isVegan() {
    if(!vegan) {
         setShake(true);
         setTimeout(() => setShake(false), 2000);
    }
  }

  function checkIfVegan(e) {
    const {type, checked} = e.target

    setVegan(checked)
    localStorage.setItem("isVegan", JSON.stringify(checked))

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
