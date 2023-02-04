import React from "react";
import {useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {BrowserView, MobileView} from 'react-device-detect';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import { userRegisterAPI , userMHListAPI , loginAPI} from "./API";
import { farsiField } from "./Farsi"

function RegisterU(props){
    const [mhList , setMHList] = useState({mh_list: [], is_succesfull: false, error_string: ""});
    if(!mhList.is_succesfull){
        userMHListAPI(setMHList); 
    }

    const [firstName , setFirstName] = useState("");
    const [lastName , setLastName] = useState("");
    const [email , setEmail] = useState("");
    const [pass1 , setPass1] = useState("");
    const [pass2 , setPass2] = useState("");
    const [studentNum , setStudentNum] = useState("");
    const [phone , setPhone] = useState("");
    const [adviser , setAdviser] = useState("");
    const [field , setField] = useState("");
    const [degree , setDegree] = useState("");
    const [university , setUniversity] = useState("");

    const [saveIt , setSaveIt] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [res , setRes] = useState({user_id: -1, is_succesfull: false, error_string: ""});

    const registerUser = function(e){
        if(firstName == ""){ alert("لطفا نام را وارد کنید"); return; }
        else if(lastName == ""){ alert("لطفا نام خانوادگی را وارد کنید"); return; }
        else if(email == ""){ alert("لطفا ایمیل را وارد کنید"); return; }
        else if(pass1 == "" || !(pass1 == pass2)){ alert("لطفا پسورد خود را چک کنید"); return; }
        else if(studentNum == ""){ alert("لطفا شماره دانشجویی را وارد کنید"); return; }
        else if(phone == ""){ alert("لطفا شماره تلفن همراه خود را وارد کنید"); return; }
        else if(degree == ""){ alert("لطفا مقطق خود را وارد کنید"); return; }
        else if(university == ""){ alert("لطفا دانشگاه خود را وارد کنید"); return; }
            
        userRegisterAPI(firstName, lastName, email, pass1, pass2, studentNum, phone, adviser, degree, field, university, setRes);
        if(res.is_succesfull){
            props.setRole("user");
            props.setUserNameApp(res.user_id);
            props.setPassApp(pass1);
            props.setlogIn(5);
        }else{
            alert(res.error_string);
        }
        loginAPI(email, pass1, saveIt, setRes);
        e.preventDefault();
        return;
    }

    return(
        <div dir="rtl" style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
            
            <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>استاد مشاور خود را انتخاب کنید</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <ListGroup className="list-group-flush">
                    <Stack>
                        {mhList.mh_list.map((data)=>
                            <Button onClick={(e)=>{setAdviser(data.id); setShowModal(false); e.preventDefault();}} variant="outline-dark">{data.first_name}{" "}{data.last_name}{" , "}{data.degree}{" "}{farsiField(data.field)}</Button>
                        )}
                    </Stack>
                </ListGroup>
                </Modal.Body>
                <Modal.Footer>
          
                </Modal.Footer>
                
            </Modal>

            <MobileView>
            <Card style={{ width: '23rem' , margin : "500px 30px 30px 30px"}}>
            <Form style={{margin : "30px 30px 30px 30px"}}>
                <Form.Group className="mb-3">
                    <Form.Label>مشخصات فردی</Form.Label>
                    <FloatingLabel label="نام" >
                        <Form.Control type="text" placeholder="نام" onChange={(event) => {setFirstName(event.target.value);}} value={firstName}/>
                    </FloatingLabel>
                    <FloatingLabel label="نام خانوادگی" >
                        <Form.Control type="text" placeholder="نام خانوادگی" onChange={(event) => {setLastName(event.target.value);}} value={lastName}/>
                    </FloatingLabel>
                    <FloatingLabel label="شماره تلفن همراه" >
                        <Form.Control type="text" placeholder="09120000000" onChange={(event) => {setPhone(event.target.value);}} value={phone}/>
                    </FloatingLabel>
                    <FloatingLabel label="ایمیل" >
                        <Form.Control type="email" placeholder="name@example.com" onChange={(event) => {setEmail(event.target.value);}} value={email}/>
                    </FloatingLabel>
                    <Form.Text className="text-muted">لطفا ایمیل دانشگاهی خود را وارد کنید.</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>مشخصات دانشگاهی</Form.Label>
                    <FloatingLabel label="شماره دانشجویی" >
                        <Form.Control type="text" placeholder="شماره دانشجویی" onChange={(event) => {setStudentNum(event.target.value);}} value={studentNum}/>
                    </FloatingLabel>
                    <FloatingLabel label="دانشگاه">
                        <Form.Select aria-label="Floating label select example" value={university} onChange={(e) => {setUniversity(e.target.value);}}>
                            <option value="" >انتخاب کنید</option>
                            <option value="AUT" >دانشگاه صنعتی امیر کبیر</option>
                        </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel label="گرایش" >
                        <Form.Control type="email" placeholder="گرایش" onChange={(event) => {setField(event.target.value);}} value={field}/>
                    </FloatingLabel>
                    <Stack>
                        <Button variant="outline-dark" size="" onClick={()=>{setShowModal(true);}}>
                            استاد مشاور: {adviser=="" ? "انتخاب کنید" :mhList.mh_list.find((element)=>{if(element.id == adviser){return true;}else{return false;}}).first_name}
                            {" "}{adviser=="" ? "" : mhList.mh_list.find((element)=>{if(element.id == adviser){return true;}else{return false;}}).last_name}
                            {", "}{adviser=="" ? "" : mhList.mh_list.find((element)=>{if(element.id == adviser){return true;}else{return false;}}).degree}
                            {" "}{adviser=="" ? "" : farsiField(mhList.mh_list.find((element)=>{if(element.id == adviser){return true;}else{return false;}}).field)}
                        </Button>
                    </Stack>
                    <FloatingLabel label="مقطع">
                        <Form.Select aria-label="Floating label select example" value={degree} onChange={(e) => {setDegree(e.target.value);}}>
                            <option onClick={()=>{setDegree("")}}>انتخاب کنید</option>
                            <option value="BA">کارشناسی</option>
                            <option value="MA">کارشناسی ارشد</option>
                            <option value="DR">دکتری</option>
                        </Form.Select>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>رمز عبور</Form.Label>
                    <FloatingLabel label="رمز عبور" >
                        <Form.Control type="password" placeholder="name@example.com" onChange={(event) => {setPass1(event.target.value);}} value={pass1}/>
                    </FloatingLabel>
                    <FloatingLabel label="تکرار رمز عبور" >
                        <Form.Control type="password" placeholder="name@example.com" onChange={(event) => {setPass2(event.target.value);}} value={pass2}/>
                    </FloatingLabel>
                    <Form.Text className="text-muted">رمز عبور باید ترکیبی از اعداد و حروف انگلیسی و حداقل 8 کاراکتر باشد.</Form.Text>
                    <Form.Check type="checkbox" label="مرا به خاطر بسپار" checked={saveIt} onClick={()=>{setSaveIt(!saveIt);}}/>
                </Form.Group>
                
                <Stack gap={2} className="col-md-5 mx-auto">
                    <Button variant="success" type="submit" onClick={registerUser}>
                        ثبت نام
                    </Button>
                    <Button variant="outline-success" type="submit" onClick={(e)=>{props.setlogIn(2); e.preventDefault();}}>
                        بازگشت به ورود
                    </Button>
                </Stack>
            </Form>
            </Card>
            </MobileView>

            <BrowserView>
                <Card style={{ width: '64rem' , margin : "3px 30px 30px 30px"}}>
                <Container>
                    <Row>
                        <Col>
                            <Form style={{ margin : "30px 30px 30px 30px"}}>
                            <Form.Group className="mb-3">
                                <Form.Label>مشخصات فردی</Form.Label>
                                <FloatingLabel label="نام" >
                                    <Form.Control type="text" placeholder="name@example.com" onChange={(event) => {setFirstName(event.target.value);}} value={firstName}/>
                                </FloatingLabel>
                                <FloatingLabel label="نام خانوادگی" >
                                    <Form.Control type="text" placeholder="name@example.com" onChange={(event) => {setLastName(event.target.value);}} value={lastName}/>
                                </FloatingLabel>
                                <FloatingLabel label="شماره تلفن همراه" >
                                    <Form.Control type="text" placeholder="name@example.com" onChange={(event) => {setPhone(event.target.value);}} value={phone}/>
                                </FloatingLabel>
                                
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>رمز عبور</Form.Label>
                                    <FloatingLabel label="رمز عبور" >
                                        <Form.Control type="password" placeholder="name@example.com" onChange={(event) => {setPass1(event.target.value);}} value={pass1}/>
                                    </FloatingLabel>
                                    <FloatingLabel label="تکرار رمز عبور" >
                                        <Form.Control type="password" placeholder="name@example.com" onChange={(event) => {setPass2(event.target.value);}} value={pass2}/>
                                    </FloatingLabel>
                                    <Form.Text className="text-muted">رمز عبور باید ترکیبی از اعداد و حروف انگلیسی و حداقل 8 کاراکتر باشد.</Form.Text>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col>
                            <Form style={{margin : "30px 30px 30px 30px"}}>
                                <Form.Group className="mb-3">
                                    <Form.Label>مشخصات دانشگاهی</Form.Label>
                                    <FloatingLabel label="شماره دانشجویی" >
                                        <Form.Control type="text" placeholder="name@example.com" onChange={(event) => {setStudentNum(event.target.value);}} value={studentNum}/>
                                    </FloatingLabel>
                                    <FloatingLabel label="دانشگاه">
                                        <Form.Select aria-label="Floating label select example" value={university} onChange={(e) => {setUniversity(e.target.value);}}>
                                            <option value="" >انتخاب کنید</option>
                                            <option value="AUT" >دانشگاه صنعتی امیر کبیر</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                    <FloatingLabel label="گرایش" >
                                        <Form.Control type="email" placeholder="name@example.com" onChange={(event) => {setField(event.target.value);}} value={field}/>
                                    </FloatingLabel>
                                    <FloatingLabel label="مقطع">
                                        <Form.Select aria-label="Floating label select example" value={degree} onChange={(e) => {setDegree(e.target.value);}}>
                                            <option onClick={()=>{setDegree("")}}>انتخاب کنید</option>
                                            <option value="BA">کارشناسی</option>
                                            <option value="MA">کارشناسی ارشد</option>
                                            <option value="DR">دکتری</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                    <Stack>
                                        <Button variant="outline-dark" size="" onClick={()=>{setShowModal(true);}}>
                                            استاد مشاور: {adviser=="" ? "انتخاب کنید" : mhList.mh_list.find((element)=>{if(element.id == adviser){return true;}else{return false;}}).first_name}
                                            {" "}{adviser=="" ? "" : mhList.mh_list.find((element)=>{if(element.id == adviser){return true;}else{return false;}}).last_name}
                                            {", "}{adviser=="" ? "" : mhList.mh_list.find((element)=>{if(element.id == adviser){return true;}else{return false;}}).degree}
                                            {" "}{adviser=="" ? "" : farsiField(mhList.mh_list.find((element)=>{if(element.id == adviser){return true;}else{return false;}}).field)}
                                        </Button>
                                    </Stack>
                                    <FloatingLabel label="ایمیل" >
                                        <Form.Control type="email" placeholder="name@example.com" onChange={(event) => {setEmail(event.target.value);}} value={email}/>
                                    </FloatingLabel>
                                    <Form.Text className="text-muted">لطفا ایمیل دانشگاهی خود را وارد کنید.</Form.Text>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check type="checkbox" label="مرا به خاطر بسپار" checked={saveIt} onClick={()=>{setSaveIt(!saveIt);}}/>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Stack gap={2} className="col-md-5 mx-auto">
                                <Button variant="success" type="submit" onClick={registerUser}>
                                    ثبت نام
                                </Button>
                                <Button variant="outline-success" type="submit" onClick={(e)=>{props.setlogIn(2); e.preventDefault();}}>
                                    بازگشت به ورود
                                </Button>
                            </Stack>
                        </Col>
                    </Row>
                </Container>
            </Card>
            </BrowserView>
        </div>
    );
}

export default RegisterU;


/*

<FloatingLabel label="استاد مشاور" >
                                        <Form.Select aria-label="Floating label select example">
                                            <option onClick={()=>{setAdviser("")}}>انتخاب کنید</option>
                                            {mhList.map((data , index)=>{
                                                <option value="1" onClick={()=>{setAdviser(data.id)}}>{data.first_name}{" "}{data.last_name}{" , "}{data.degree}{" "}{farsiField(data.field)}</option>
                                            })}
                                        </Form.Select>
                                    </FloatingLabel>

*/