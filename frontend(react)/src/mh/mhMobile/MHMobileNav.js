import React from "react";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Stack from 'react-bootstrap/Stack';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';

function UserMobileNav(props){
  const [btnList, setBtnList] = useState({profile: false , time_free: false , meeting: true});

  const btnProfile = (e) => {
      setBtnList({profile: true , time_free: false , meeting: false});
      props.setPage("profile");
      e.preventDefault();
      return;
  };
  const btnTimeFree = (e) => {
      setBtnList({profile: false , time_free: true , meeting: false});
      props.setPage("time_free");
      e.preventDefault();
      return;
  };
  const btnMeeting = (e) => {
      setBtnList({profile: false , time_free: false , meeting: true});
      props.setPage("meeting");
      e.preventDefault();
      return;
  };
    
    return(
      <nav style={{width: "100%", position: "fixed", left: '0', bottom: '0', background: ""}} className="bottom-nav bottom-nav--visible">
      <div style={{margin : "5px 8px 5px 8px"}} >
        <Card>
          <Stack>
              <ButtonGroup size="" className="mb-2">
                  <Button variant={(props.page == "profile") ? props.color.color2 : props.color.color1} onClick={btnProfile} disabled={(props.page == "profile")}> پروفایل </Button>
                  <Button variant={(props.page == "time_free") ? props.color.color2 : props.color.color1} onClick={btnTimeFree} disabled={(props.page == "time_free")}> زمان ها</Button>
                  <Button variant={(props.page == "meeting") ? props.color.color2 : props.color.color1} onClick={btnMeeting} disabled={(props.page == "meeting")}> قرارهای من </Button>
              </ButtonGroup>
          </Stack>
        </Card>
      </div>
      </nav>
    );
}

export default UserMobileNav;


/*

style={{position: 'sticky', top: "0"}}
<nav style={{width: "100%", position: "fixed", left: '0', bottom: '0', background: "black"}} className="bottom-nav bottom-nav--visible">
      <div style={{margin : "5px 8px 5px 8px"}} >
        <Card>

          <Stack>
              <ButtonGroup size="" className="mb-2">
                  <Button variant={btnList.profile ? props.color.color2 : props.color.color1} onClick={btnProfile} disabled={btnList.profile}> پروفایل </Button>
                  <Button variant={btnList.time_free ? props.color.color2 : props.color.color1} onClick={btnTimeFree} disabled={btnList.mh_list}> زمان ها</Button>
                  <Button variant={btnList.meeting ? props.color.color2 : props.color.color1} onClick={btnMeeting} disabled={btnList.meeting}> قرارهای من </Button>
              </ButtonGroup>
          </Stack>
        </Card>
      </div>
      </nav>
*/


/*
<nav class="bottom-nav bottom-nav--visible"><a aria-current="page" class="bottom-nav__item-e7ce4 bottom-nav__item--active-e12fe" href="/s/tehran"><i class="kt-icon kt-icon-social-divar kt-icon--lg bottom-nav__item-icon-f2f8a"></i>آگهی‌ها</a><button class="bottom-nav__item-e7ce4"><i class="kt-icon kt-icon-toc kt-icon--lg bottom-nav__item-icon-f2f8a"></i>دسته‌ها</button><button class="bottom-nav__item-e7ce4"><i class="kt-icon kt-icon-add-circle-f kt-icon--lg bottom-nav__item-icon-f2f8a"></i> ثبت آگهی </button><a class="bottom-nav__item-e7ce4" href="https://chat.divar.ir"><i class="kt-icon kt-icon-chat-bubble-f kt-icon--lg bottom-nav__item-icon-f2f8a"></i> چت </a><a class="bottom-nav__item-e7ce4" href="/user"><i class="kt-icon kt-icon-person-f kt-icon--lg bottom-nav__item-icon-f2f8a"></i> دیوار من </a></nav>
*/