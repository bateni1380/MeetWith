import React from "react";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import { loginAPI } from "./API";

function Login(props){
    const [userName , setUserName] = useState("");
    const [pass , setPass] = useState("");
    const [saveIt , setSaveIt] = useState(false);
    const [info, setInfo] = useState({role: "", person_id: -2, is_succesfull: false, error_string: ""});
    if(info.is_succesfull){
        props.setlogIn(5);
        props.setRole(info.role);
        props.setUserNameApp(info.person_id);
        props.setPassApp(pass);
    }else if(info.person_id == -1){
        alert("نام کاربری یا رمز عبور اشتباه است");
        setInfo({role: "", person_id: -2, is_succesfull: false, error_string: ""})
    }
    const userF = (event) => {
        setUserName(event.target.value);
        return;
    };
    const passF = (event) => {
        setPass(event.target.value);
        return;
    };
    const saveItF = () => {
        setSaveIt(!saveIt);
        return;
    };
    const btnLogin = (e) => {
        
        loginAPI(userName, pass, saveIt, setInfo);        
        e.preventDefault();
        return;
    };
    const btnSignUp = (e) => {
        props.setlogIn(3);
        e.preventDefault();
        return;
    };

    return (
        <div className="bgImageAut" dir="rtl" style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
        <Card style={{ width: '22rem' }}>
        <Form style={{margin : "30px 30px 30px 30px"}}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label >ایمیل</Form.Label>
            <Form.Control type="email" placeholder="ایمیل دانشگاهی خود را وارد کنید." onChange={userF}/>
            <Form.Text className="text-muted">
              
            </Form.Text>
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>رمز عبور</Form.Label>
            <Form.Control type="password" placeholder="رمز عبور خود را وارد کنید" onChange={passF}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="مرا به خاطر بسپار" checked={saveIt} onChange={saveItF}/>
          </Form.Group>
          <Stack gap={2} className="col-md-5 mx-auto">
            <Button variant="success" type="submit" onClick={btnLogin}>
             ورود
             </Button>
             <Button variant="outline-success" type="submit" onClick={btnSignUp }>
                ثبت نام
            </Button>
          </Stack>
        </Form>
        </Card>
        </div>
    );
}

export default Login;




    /*return(
        <div>
            <h1>ورود</h1>
            <div>
                <h3>نام کاربری</h3>
                <input type="text" onChange={userF}></input>
                <h3>رمز عبور</h3>
                <input type="password" onChange={passF}></input>
                <div>
                    <span>مرا به خواطر بسپار</span>
                    <input type="checkbox" checked={saveIt} onChange={saveItF}></input>
                </div>
            </div>
            <button onClick={btnF}>ورود</button>
        </div>
    );*/