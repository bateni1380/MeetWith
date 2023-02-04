import React from "react";
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import {farsiDegree , farsiUni , farsiField , farsiMHDegree} from "./../../Farsi";
import {userProfileAPI , userMHListAPI , userProfileEditAPI} from "../../API";

function UserProfileEditBrowser(props){
    const [firstName , setFirstName] = useState("");
    const [lastName , setLastName] = useState("");
    const [phone , setPhone] = useState("");
    const [pass1 , setPass1] = useState("");
    const [pass2 , setPass2] = useState("");
    const [studentNum , setStudentNum] = useState("");
    const [field , setField] = useState("");
    const [degree , setDegree] = useState("");
    const [uni , setUni] = useState("");
    const [adviserNew , setAdviserNew] = useState("");
    const [showModal, setShowModal] = useState(false);

    const [info ,  setInfo] = useState({first_name: "", last_name: "", user_email:"", user_password: "", student_number:"", mobile_number: "", degree: "" , 
        field:"", university: "", adviserID: "", is_succesfull: false, error_string: ""})
    const [adviser , setAdviser] = useState({id: -2, first_name: "", last_name: "", mh_email: "", degree: "", field: "", link_to_webpage: ""})
    const [mhList, setMHList] = useState({mh_list: [], is_succesfull: false, error_string: ""});
    const [res , setRes] = useState({is_succesfull: false, error_string: ""});
    console.log(mhList);
    
    if(!info.is_succesfull){
        userProfileAPI(props.userNameApp, props.passApp, setInfo);
    }
    if(!mhList.is_succesfull){
        userMHListAPI(setMHList);
    }
    if(info.is_succesfull && mhList.is_succesfull && adviser.id == -2){
        setAdviser(mhList.mh_list.find((i)=>{return i.id == info.adviserID;}))
    }
    if(res.is_succesfull){
        alert("تغییرات با موفقیت اعمال شد.");
        props.setPage("profile");
    }


    const btnEdit = (e) => {
        if(!(pass1 == pass2)){
            alert("رمز عبور را چک کنید.");
            return;
        }
        if(info.is_succesfull){
            userProfileEditAPI(props.userNameApp, props.passApp, (firstName=="" ? info.first_name : firstName), (lastName=="" ? info.last_name : lastName), 
            info.user_email, (pass1=="" ? props.passApp : pass1), (studentNum=="" ? info.student_number : studentNum), (degree=="" ? info.degree : degree), 
            (field=="" ? info.field : field), (phone=="" ? info.mobile_number : phone), (adviserNew=="" ? info.adviserID : adviser), (uni=="" ? info.university : uni), setRes);
        }
        e.preventDefault();
        return;
    };

    const btnCancel = (e) => {
        props.setPage("profile");
        e.preventDefault();
        return;
    };


    return(
        <div style={{margin : "20px 8px 5px 8px"}} dir="rtl">
        
        <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
            <Modal.Title>استاد مشاور خود را انتخاب کنید</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <ListGroup className="list-group-flush">
                            <Stack>
                                {mhList.mh_list.map((data)=>
                                    <Button onClick={(e)=>{setAdviserNew(data.id); setShowModal(false); e.preventDefault();}} variant="outline-dark">{data.first_name}{" "}{data.last_name}{" , "}{farsiMHDegree(data.degree)}{" "}{farsiField(data.field)}</Button>
                                )}
                            </Stack>
                    </ListGroup>
                </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>

        <Stack className="col-md-5 mx-auto">
        <Card style={{ width: '40rem' }} className="mx-auto">
            <Card.Body>
                <Card.Title className="text-center" >تغییر مشخصات</Card.Title>
                <Card.Text className="text-center"></Card.Text>
            </Card.Body>
            <Container>
                    <Row>
                        <Col>
                            <Form>
                                <Form.Group className="mb-3" >
                                    <FloatingLabel  label="نام" className="mb-3" >
                                        <Form.Control type="email" placeholder="name@example.com" value={firstName} onChange={(event) => {setFirstName(event.target.value);}}/>
                                    </FloatingLabel>
                                    <FloatingLabel label="نام خانوادگی" className="mb-3">
                                        <Form.Control type="email" placeholder="name@example.com" value={lastName} onChange={(event) => {setLastName(event.target.value);}}/>
                                    </FloatingLabel>
                                    <FloatingLabel label="تلفن" className="mb-3">
                                        <Form.Control type="email" placeholder="name@example.com" value={phone} onChange={(event) => {setPhone(event.target.value);}}/>
                                    </FloatingLabel>
                                    <FloatingLabel label="رمز عبور" className="mb-3">
                                        <Form.Control type="email" placeholder="name@example.com" value={pass1} onChange={(event) => {setPass1(event.target.value);}}/>
                                    </FloatingLabel>
                                    <FloatingLabel label="تکرار رمز عبور" className="mb-3">
                                        <Form.Control type="email" placeholder="name@example.com" value={pass2} onChange={(event) => {setPass2(event.target.value);}}/>
                                    </FloatingLabel>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col>
                        <Form>
                            <Form.Group className="mb-3" >
                                <FloatingLabel label="شماره دانشجویی" className="mb-3">
                                    <Form.Control type="email" placeholder="name@example.com" value={studentNum} onChange={(event) => {setStudentNum(event.target.value);}}/>
                                </FloatingLabel>
                                <Stack>
                                        <Button variant="outline-dark" size="" onClick={()=>{setShowModal(true);}} className="mb-3">
                                            استاد مشاور: {adviserNew=="" ? "انتخاب کنید" : mhList.mh_list.find((element)=>{if(element.id == adviserNew){return true;}else{return false;}}).first_name}
                                            {" "}{adviserNew=="" ? "" : mhList.mh_list.find((element)=>{if(element.id == adviserNew){return true;}else{return false;}}).last_name}
                                            {", "}{adviserNew=="" ? "" : farsiMHDegree(mhList.mh_list.find((element)=>{if(element.id == adviserNew){return true;}else{return false;}}).degree)}
                                            {" "}{adviserNew=="" ? "" : farsiField(mhList.mh_list.find((element)=>{if(element.id == adviserNew){return true;}else{return false;}}).field)}
                                        </Button>
                                    </Stack>
                                <FloatingLabel label="گرایش" className="mb-3">
                                    <Form.Control type="email" placeholder="name@example.com" value={field} onChange={(event) => {setField(event.target.value);}}/>
                                </FloatingLabel>
                                <FloatingLabel label="مقطع" className="mb-3">
                                    <Form.Select aria-label="Floating label select example" value={degree} onChange={(e) => {setDegree(e.target.value);}}>
                                        <option value="">انتخاب کنید</option>
                                        <option value="BA">کارشنانی</option>
                                        <option value="MA">کارشناسی ارشد</option>
                                        <option value="DR">دکتری</option>
                                    </Form.Select>
                                </FloatingLabel>
                                <FloatingLabel label="دانشگاه" className="mb-3">
                                    <Form.Select aria-label="Floating label select example" value={uni} onChange={(e) => {setUni(e.target.value);}}>
                                        <option value="">انتخاب کنید</option>
                                        <option value="AUT">دانشگاه صنعتی امیرکبیر</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Form.Group>
                        </Form>
                        </Col>
                    </Row>
                </Container>
            <Card.Body>
                <Stack gap={2} className="col-md-5 mx-auto">
                    <Button variant={props.color.color1} onClick={btnEdit}>تایید</Button>
                    <Button variant={props.color.color2} onClick={btnCancel}>لغو</Button>
                </Stack>
            </Card.Body>
        </Card>
        </Stack>
    </div>
    );
}

export default UserProfileEditBrowser;