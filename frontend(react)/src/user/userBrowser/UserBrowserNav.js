import React from "react";
import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

function UserBrowserNav(props){

  const btnProfile = (e) => {
      props.setPage("profile");
      e.preventDefault();
      return;
  };
  const btnMHList = (e) => {
      props.setPage("mh_list");
      e.preventDefault();
      return;
  };
  const btnMeeting = (e) => {
      props.setPage("meeting");
      e.preventDefault();
      return;
  };
  const btnBarcode = (e) => {
      props.setPage("barcode");
      e.preventDefault();
      return;
  };

  const btnBack = (e) => {
    if(props.page == "reserve"){
      props.setPage("mh_list");
    }else if(props.page == "profile_edit"){
      props.setPage("profile");
    }
    e.preventDefault();
    return;
  };
    
    return(
        <div >
          <Navbar bg="light" expand="lg">
            <Container fluid>
              <Navbar.Brand href="#">MeetWith</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                  <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>  
                    <Stack direction="horizontal" gap={3} className="" >
                      <Button variant={(props.page == "profile") ? props.color.color2 : props.color.color1} onClick={btnProfile} disabled={(props.page == "profile")} className="border" size="lg"> پروفایل </Button>
                      <Button variant={(props.page == "mh_list") ? props.color.color2 : props.color.color1} onClick={btnMHList} disabled={(props.page == "mh_list")} className="border" size="lg"> اساتید</Button>
                      <Button variant={(props.page == "meeting") ? props.color.color2 : props.color.color1} onClick={btnMeeting} disabled={(props.page == "meeting")} className="border" size="lg"> قرارهای من </Button>
                      <Button variant={(props.page == "barcode") ? props.color.color2 : props.color.color1} onClick={btnBarcode} disabled={(props.page == "barcode")} className="ms-auto border" size="lg">اسکن</Button>
                    </Stack>
                  </Nav>
                  <Form className="d-flex">  
                    <Button variant={props.color.color1} className="" onClick={btnBack}>بازگشت</Button>
                  </Form>
                </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
    );
}

export default UserBrowserNav;


/*

style={{position: 'sticky', top: "0"}}

*/


/*
<Navbar bg={props.color.color2} expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Stack direction="horizontal" gap={3}>
            <Button variant={btnList.profile ? props.color.color2 : props.color.color1} onClick={btnProfile} disabled={btnList.profile} className="border"> پروفایل </Button>
            <Button variant={btnList.mh_list ? props.color.color2 : props.color.color1} onClick={btnMHList} disabled={btnList.mh_list} className="border"> اساتید</Button>
            <Button variant={btnList.meeting ? props.color.color2 : props.color.color1} onClick={btnMeeting} disabled={btnList.meeting} className="border"> قرارهای من </Button>
            <Button variant={btnList.barcode ? props.color.color2 : props.color.color1} onClick={btnBarcode} disabled={btnList.barcode} className="ms-auto border">اسکن</Button>
            <Button variant={props.color.color1} className="border">بازگشت</Button>
          </Stack>
        </Navbar.Collapse>
      </Container>
    </Navbar>

*/