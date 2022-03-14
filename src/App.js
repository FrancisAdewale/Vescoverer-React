import './App.css';
import firebase from './firebase';
import Home from './componenets/Home'


function App() {
  const db = firebase.firestore
  const auth = firebase.auth

  return (
    <div className='outer'>
      <div className='middle'>
        <div className='inner'>
        <Home />
        </div>

      </div>

    </div>
   
  );
}

export default App;
