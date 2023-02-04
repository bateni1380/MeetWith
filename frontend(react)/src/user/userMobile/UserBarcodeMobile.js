import React from "react";
import { useState } from 'react';
import QrReader from 'react-qr-scanner';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import { userMHListAPI } from "../../API"

function UserBarcodeMobile(props){
    const [rawMHList, setRawMHList] = useState({mh_list: [], is_succesfull: false, error_string: ""});
    const [res , setRes] = useState(-1);
    const [done , setDone] = useState(true);
    const [linkS , setLinkS] = useState("");
    
    const handleScan = (data) =>{
        if(!(data==null) && done){
            setLinkS(data.text);
            console.log(data , data.text);
            setDone(false);
        }
    }
    const handleError = (err) => {
        console.error(err)
    }

    if(!rawMHList.is_succesfull){
        userMHListAPI(setRawMHList);
    }
    if(!(linkS == "")){
        console.log("res" , res);
        if(linkS.search("mh=")>=0){
            setRes(Number.parseInt(linkS.slice(linkS.search("=")+1)));
            rawMHList.mh_list.forEach((i)=>{
                if(i.id == res){
                    props.setMHApp(res);
                    props.setPage("reserve");
                }
            });
        }else{
            setDone(true);
        }
    }

    return(
        <div dir="rtl" style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
            <Stack>
                <div>
                    <QrReader constraints={{facingMode: 'environment'}} facingMode="rear"  style={{height: 240, width: 320,margin : "30px 28px 10px 0px"}} delay={100} onError={handleError} onScan={handleScan}/>
                </div>
                <div>
                    <Alert variant={props.color.color1}>
                        <Alert.Heading className="text-center"> بارکد را اسکن کنید.</Alert.Heading>
                    </Alert>
                </div>
            </Stack>
                        
        </div>
    );
}

export default UserBarcodeMobile;


/*
<Container fluid="md" style={{margin : "30px 0px 10px 0px"}}>
                    <Row>
                        <Col>
                        <div>
                            <QrReader style={{height: 240, width: 320,}} delay={100} onError={handleError} onScan={handleScan}/>
                        </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <div>
                            <Alert variant={props.color.color1}>
                                بارکد را اسکن کنید.
                            </Alert>
                        </div>
                        </Col>
                    </Row>
                </Container>


*/