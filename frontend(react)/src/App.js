import logo from './logo.svg';
import './App.css';
import React from 'react'
import { useState } from 'react';
import Landing from './Landing';
import Login from './Login';
import AppU from './user/AppU';
import AppMH from './mh/AppMH';
import RegisterU from './RegisterU';


function App() {
  // 1=Landing  2=RegisterU 3=Login 5=App
  const [logIn, setlogIn] = useState(1);
  const [role, setRole] = useState("");
  const [userNameApp, setUserNameApp] = useState("");
  const [passApp, setPassApp] = useState("");

  if(logIn == 1){
    return(
      <div>
       <Landing setlogIn={setlogIn} setRole={setRole} setUserNameApp={setUserNameApp} setPassApp={setPassApp}/>
      </div>
    )
  }
  else if(logIn == 2){
    return(
      <div>
       <Login setlogIn={setlogIn} setRole={setRole} setUserNameApp={setUserNameApp} setPassApp={setPassApp}/>
      </div>
    )
  }else if(logIn == 3){
    return(
      <div>
       <RegisterU setlogIn={setlogIn} setRole={setRole} setUserNameApp={setUserNameApp} setPassApp={setPassApp}/>
      </div>
    )
  }else if(logIn == 5 && role == "user"){
    return(
      <div>
       <AppU setUserNameApp={setUserNameApp} setPassApp={setPassApp} userNameApp={userNameApp} passApp={passApp}/>
      </div>
    )
  }else if(logIn == 5 && role == "mh"){
    return(
      <div>
       <AppMH setUserNameApp={setUserNameApp} setPassApp={setPassApp} userNameApp={userNameApp} passApp={passApp}/>
      </div>
    )
  }
  return(
    <div>
      error
    </div>
  )
  


}

export default App;


  /*
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
*/