import React from "react";
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import {useState} from "react";
import { loginAPI } from "./API";



function Landing(props){
    const [res, setRes] = useState({role: "user", user_id: -1, is_succesfull: false, error_string: ""});
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [pass, setPass] = useState(localStorage.getItem("password"));
    if(res.is_succesfull){
        props.setRole(res.role);
        props.setlogIn(5);
        props.setUserNameApp(res.person_id);
        props.setPassApp(pass);
    }
    else if(res.person_id == -1){
        props.setlogIn(2);
    }
    const f = (e)=>{
        if(email == null || email == ""){
            props.setlogIn(2);
        }else{
            loginAPI(email, pass, true, setRes);
        }
        e.preventDefault();
        return;
    }

    return(
        <div className="bgImageAut" style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
            <div>
                <Stack>
                    <Button onClick={f} variant="success" size="lg">همین حالا شروع کنید</Button>
                </Stack>
            </div>
        </div>
    );
}

export default Landing;



/*

*/