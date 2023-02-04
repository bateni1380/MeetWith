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
import {MHProfileAPI , MHProfileEditAPI} from "../../API"


function MHProfileEditMobile(props){
    const [firstName , setFirstName] = useState("");
    const [lastName , setLastName] = useState("");
    const [web , setWeb] = useState("");
    const [pass1 , setPass1] = useState("");
    const [pass2 , setPass2] = useState("");
    const [teacherNum , setTeacherNum] = useState("");
    const [field , setField] = useState("");
    const [degree , setDegree] = useState("");

    const [info, setInfo] = useState({first_name: "", last_name: "", mh_email:"", mh_password: "", teacher_number:"", degree: "" , 
        field:"", link_to_webpage: "", is_succesfull: false, error_string: ""});
    const [res , setRes] = useState({is_succesfull: false, error_string: ""});
    console.log(res);

    if(!info.is_succesfull){
        MHProfileAPI(props.userNameApp, props.passApp, setInfo);
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
            MHProfileEditAPI(props.userNameApp, props.passApp, (firstName=="" ? info.first_name : firstName), (lastName=="" ? info.last_name : lastName), 
            info.mh_email,  (pass1=="" ? props.passApp : pass1),  (teacherNum=="" ? info.teacher_number : teacherNum), 
             (degree=="" ? info.degree : degree),  (field=="" ? info.field : field),  (web=="" ? info.link_to_webpage : web), setRes);
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
        <div style={{margin : "20px 8px 100px 8px"}} dir="rtl">
            <Stack className="col-md-5 mx-auto">
            <Card style={{ width: '20rem' }} className="mx-auto">
                <Card.Body>
                    <Card.Title className="text-center" >تغییر مشخصات</Card.Title>
                    <Card.Text className="text-center">
                    </Card.Text>
                </Card.Body>
                            <Form>
                                <Form.Group className="mb-3" >
                                    <FloatingLabel  label="نام" className="mb-3" >
                                        <Form.Control type="email" placeholder="name@example.com" value={firstName} onChange={(event) => {setFirstName(event.target.value);}}/>
                                    </FloatingLabel>
                                    <FloatingLabel label="نام خانوادگی" className="mb-3">
                                        <Form.Control type="email" placeholder="name@example.com" value={lastName} onChange={(event) => {setLastName(event.target.value);}}/>
                                    </FloatingLabel>
                                    <FloatingLabel label="رمز عبور" className="mb-3">
                                        <Form.Control type="email" placeholder="name@example.com" value={pass1} onChange={(event) => {setPass1(event.target.value);}}/>
                                    </FloatingLabel>
                                    <FloatingLabel label="تکرار رمز عبور" className="mb-3">
                                        <Form.Control type="email" placeholder="name@example.com" value={pass2} onChange={(event) => {setPass2(event.target.value);}}/>
                                    </FloatingLabel>
                                </Form.Group>
                            </Form>
                        <Form>
                            <Form.Group className="mb-3" >
                                <FloatingLabel label="شماره استادی" className="mb-3">
                                    <Form.Control type="email" placeholder="name@example.com" value={teacherNum} onChange={(event) => {setTeacherNum(event.target.value);}}/>
                                </FloatingLabel>
                                <FloatingLabel label="وبسایت" className="mb-3">
                                    <Form.Control type="email" placeholder="name@example.com" value={web} onChange={(event) => {setWeb(event.target.value);}}/>
                                </FloatingLabel>
                                <FloatingLabel label="مرتبه علمی" className="mb-3">
                                    <Form.Select aria-label="Floating label select example" value={degree} onChange={(e) => {setDegree(e.target.value);}}>
                                        <option value="">انتخاب کنید</option>
                                        <option value="P3">استادیار</option>
                                        <option value="P2">دانشیار</option>
                                        <option value="P1">استاد</option>
                                    </Form.Select>
                                </FloatingLabel>
                                <FloatingLabel label="گرایش" className="mb-3">
                                    <Form.Select aria-label="Floating label select example" value={field} onChange={(e) => {setField(e.target.value);}}>
                                        <option value="">انتخاب کنید</option>
                                        <option value="Pure Mathematics">ریاضی محض</option>
                                        <option value="Applied Mathematics">ریاضی کاربردی</option>
                                        <option value="Computer science">علوم کامپیوتر</option>
                                        <option value="آمار">آمار</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Form.Group>
                        </Form>
                
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

export default MHProfileEditMobile;