import $ from 'jquery';
import {useState} from "react";
import React from "react";


async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

function loginAPI(email , password , saveIt, state){
  //call api api_login
  //get email and password of user and return the role and id of them. mh and user use it.
  const d = {role: "", person_id: -1, is_succesfull: false, error_string: ""};
  try {    
    postData("https://bia2django.iran.liara.run/api/login/", {"email" : email , "password" : password })
    .then((data) => {
      if(data.is_succesfull){
        d.role = data.role;
        d.person_id = data.person_id;
        d.is_succesfull = data.is_succesfull;
        d.error_string = data.error_string;
        if(d.is_succesfull && saveIt){
          localStorage.setItem("email",email);
          localStorage.setItem("password", password);
        }
        state({role: d.role, person_id: d.person_id, is_succesfull: d.is_succesfull, error_string: d.error_string})
    }else{
      d.is_succesfull = data.is_succesfull;
      d.error_string = data.error_string;
      state({role: "", person_id: -1, is_succesfull: d.is_succesfull, error_string: d.error_string})
    }
  });
      
  } catch (error) {
    d.is_succesfull = false;
  }
}

function userProfileAPI(user_id, user_password, state){
  //call api api_get_user_account
  const d = {first_name: "", last_name: "", user_email:"", user_password: "", student_number:"", mobile_number: "", degree: "" , 
  field:"", university: "", adviserID: "", is_succesfull: false, error_string: ""}
  
  try {
      
    postData("https://bia2django.iran.liara.run/api/get_user_account/", {"user_id" : user_id , "user_password" :  user_password })
    .then((data) => {
      if(data.is_succesfull){
        d.first_name = data.first_name;
        d.last_name = data.last_name;
        d.user_email = data.user_email;
        d.user_password = data.user_password;
        d.student_number = data.student_number;
        d.mobile_number = data.mobile_number;
        d.degree = data.degree;
        d.field = data.field;
        d.university = data.university;
        d.adviserID = data.adviserID;
        d.is_succesfull = data.is_succesfull;
        d.error_string = data.error_string;
        state({...d});
      }else{
        d.is_succesfull = data.is_succesfull;
        d.error_string = data.error_string;
      }
    });
      
  } catch (error) {
      d.is_succesfull = false;
  }
}

function userRegisterAPI(first_name, last_name, user_email, user_password1, user_password2, 
  student_number, mobile_number, adviserID, degree, field, university, state){
  //call api api_register_user
  //get data for login and a state"useState" for save the res

  if(!(user_password1 == user_password2)){
    return({user_id: -1, is_succesfull: false, error_string: "رمز عبور نامعتبر است"});
  }

  let a = {"first_name": first_name, "last_name": last_name, "user_email": user_email, "user_password": user_password1, "student_number": student_number,
            "mobile_number": mobile_number, "adviserID": adviserID, "degree": degree, "field": field, "university": university};
  let d = {user_id: -1, is_succesfull: false, error_string: "رمز عبور نامعتبر است"};
  
  try {
    postData("https://bia2django.iran.liara.run/api/register_user/", a)
    .then((data) => {
      if(data.is_succesfull){
        d.user_id = data.user_id;
        d.is_succesfull = data.is_succesfull;
        d.error_string = data.error_string;
        state({user_id: d.user_id, is_succesfull: d.is_succesfull, error_string: d.error_string})
      }else{
        d.is_succesfull = data.is_succesfull;
        d.error_string = data.error_string;
      }
    });
  } catch (error) {

  }
}


/*
const listMeetingPast = [
    {meeting_id: "1", MH_id: "p2@aut.ac.ir", user_id: "s@aut.ac.ir", start_time: "12", end_time: "13", date: "1/1/1", subject: "نظریه اعداد", description:"برسی اثبات حدث گلد باخ", was_holded: true},
    {meeting_id: "2", MH_id: "p1@aut.ac.ir", user_id: "s@aut.ac.ir", start_time: "12", end_time: "13", date: "1/1/3", subject: "آنالیز عددی", description:"برسی اثبات حدث گلد باخ", was_holded: true},
    {meeting_id: "3", MH_id: "p4@aut.ac.ir", user_id: "s@aut.ac.ir", start_time: "12", end_time: "13", date: "1/1/6", subject: "جبر", description:"برسی اثبات حدث گلد باخ", was_holded: true},
    {meeting_id: "4", MH_id: "p3@aut.ac.ir", user_id: "s@aut.ac.ir", start_time: "14", end_time: "15", date: "1/1/8", subject: "هندسه", description:"برسی اثبات حدث گلد باخ", was_holded: true},
    {meeting_id: "5", MH_id: "p2@aut.ac.ir", user_id: "s@aut.ac.ir", start_time: "16", end_time: "17", date: "1/1/8", subject: "نظریه اعداد", description:"برسی اثبات حدث گلد باخ", was_holded: true},
    {meeting_id: "6", MH_id: "p2@aut.ac.ir", user_id: "s@aut.ac.ir", start_time: "10", end_time: "11", date: "1/1/8", subject: "نظریه اعداد", description:"برسی اثبات حدث گلد باخ", was_holded: true}
  ];
  const listMeetingToDay = [
    {meeting_id: "10", MH_id: "abc@gmail.com", user_id: "s@aut.ac.ir", start_time: "14", end_time: "15", date: "1401/10/10", subject: "نظریه اعداد", description:"برسی اثبات حدث گلد باخ", was_holded: true},
    {meeting_id: "20", MH_id: "def@gmai.com", user_id: "s@aut.ac.ir", start_time: "8", end_time: "9", date: "1401/10/10", subject: "آنالیز عددی", description:"برسی سیستم های دینامیکی پیوسته", was_holded: true},
    ];
  const listMeetingFuture = [
    {meeting_id: "100", MH_id: "p1@aut.ac.ir", user_id: "s@aut.ac.ir", start_time: "12", end_time: "13", date: "1/1/12", subject: "نظریه اعداد", description:"برسی اثبات حدث گلد باخ", was_holded: false},
    {meeting_id: "200", MH_id: "p1@aut.ac.ir", user_id: "s@aut.ac.ir", start_time: "17", end_time: "18", date: "1/1/16", subject: "آنالیز عددی", description:"برسی اثبات حدث گلد باخ", was_holded: false},
    {meeting_id: "300", MH_id: "p3@aut.ac.ir", user_id: "s@aut.ac.ir", start_time: "12", end_time: "13", date: "1/1/11", subject: "جبر", description:"برسی اثبات حدث گلد باخ", was_holded: false},
    {meeting_id: "400", MH_id: "p1@aut.ac.ir", user_id: "s@aut.ac.ir", start_time: "10", end_time: "11", date: "1/1/17", subject: "هندسه", description:"برسی اثبات حدث گلد باخ", was_holded: false},
    {meeting_id: "500", MH_id: "p4@aut.ac.ir", user_id: "s@aut.ac.ir", start_time: "12", end_time: "13", date: "1/1/16", subject: "نظریه اعداد", description:"برسی اثبات حدث گلد باخ", was_holded: false},
    {meeting_id: "600", MH_id: "p5@aut.ac.ir", user_id: "s@aut.ac.ir", start_time: "15", end_time: "16", date: "1/1/12", subject: "نظریه اعداد", description:"برسی اثبات حدث گلد باخ", was_holded: false}
  ];
*/

function userMeetingAPI(user_id, user_password, year, month, day, state){
  //call api api_get_user_timeline
  const d = {listMeetingPast: [], listMeetingToDay: [], listMeetingFuture: [], is_succesfull: false, error_string: ""}
  
  try {
    postData("https://bia2django.iran.liara.run/api/get_user_timeline/", {"user_id": user_id, "user_password": user_password, "date": {"year": year, "month": month, "day": day}})
    .then((data) => {
      if(data.is_succesfull){
        d.listMeetingPast = [...data.past_meetings];
        d.listMeetingToDay = [...data.present_meetings];
        d.listMeetingFuture = [...data.future_meetings];
        d.is_succesfull = data.is_succesfull;
        d.error_string = data.error_string;
        state({listMeetingPast: [...d.listMeetingPast], listMeetingToDay: [...d.listMeetingToDay], listMeetingFuture: [...d.listMeetingFuture], is_succesfull: true, error_string: ""})
      }else{
        d.is_succesfull = data.is_succesfull;
        d.error_string = data.error_string;
      }
    });
  } catch (error) {
      d.is_succesfull = false;
  }
}

/*
{id: "101", first_name: "جان", last_name: "نش", mh_email: "nash@gmail.com", degree: "استادیار", field: "Applied Mathematics", link_to_webpage: "www.nash.com"}
    ,{id: "202", first_name: "برنهارت", last_name: "ریمان", mh_email: "rieman@gmail.com", degree: "دانشیار", field: "Statistics", link_to_webpage: "www.en.com"}
    ,{id: "303", first_name: "کورت", last_name: "گودل", mh_email: "godel@gmail.com", degree: "استاد", field: "Pure Mathematics", link_to_webpage: "www.godel.com"}
    ,{id: "404", first_name: "کارل فردریش", last_name: "گاوس", mh_email: "go@gmail.com", degree: "استاد", field: "Pure Mathematics", link_to_webpage: "www.go.com"}
    ,{id: "505", first_name: "آلن", last_name: "تورینگ", mh_email: "go@gmail.com",  degree: "استاد", field: "Computer science", link_to_webpage: "www.go.com"}
*/

function userMHListAPI(state){
  //call api api_get_list_of_mh
  //get a setState"useState" and get the list of teachers from back and reset the state.
  const d = {mh_list: [], is_succesfull: false, error_string: "bad"};

  try {
    postData("https://bia2django.iran.liara.run/api/get_list_of_mh/", {})
    .then((data) => {
      if(data.is_succesfull){
        data.mh_list.forEach((i)=>{d.mh_list.push({...i})});
        d.is_succesfull = data.is_succesfull;
        d.error_string = data.error_string;
        state({mh_list: [...d.mh_list], is_succesfull: d.is_succesfull, error_string: d.error_string})
      }else{
        d.is_succesfull = data.is_succesfull;
        d.error_string = data.error_string;
      }
    });
    
  } catch (error) {

  }

}



/*
{
        "mh_id": "1",
        "mh_password":"87654321",
        "days": [
            {
                "date": {"year":2022, "month":12, "day":24},
                "meetings": [
                    {
                        "start_time": {"hour":12, "minute":0, "second":0},
                        "end_time": {"hour":13, "minute":30, "second":0}
                    },
                    {
                        "start_time": {"hour":14, "minute":0, "second":0},
                        "end_time": {"hour":17, "minute":30, "second":0}
                    }
                ]
            },
            {
                "date": {"year":2022, "month":12, "day":25},
                "meetings": [
                    {
                        "start_time": {"hour":14, "minute":30, "second":0},
                        "end_time": {"hour":18, "minute":30, "second":0}
                    },
                    {
                        "start_time": {"hour":9, "minute":30, "second":0},
                        "end_time": {"hour":11, "minute":30, "second":0}
                    }
                ]
            },
            {
                "date": {"year":2022, "month":12, "day":27},
                "meetings": [
                    {
                        "start_time": {"hour":8, "minute":0, "second":0},
                        "end_time": {"hour":8, "minute":45, "second":0}
                    },
                    {
                        "start_time": {"hour":9, "minute":30, "second":0},
                        "end_time": {"hour":9, "minute":45, "second":0}
                    }
                ]
            }
        ]
    }

    const d = {mh_id: 1, is_succesfull: true, error_string: "",
      days: [{date: {"year":2022, "month":12, "day":8}, meetings: [{start_time: "07:30", end_time: "09:30"}, {start_time: "10:30", end_time: "13:30"}, {start_time: "17:30", end_time: "18:30"}]},
        {date: {"year":2022, "month":12, "day":9}, meetings: [{start_time: "11:30", end_time: "13:30"}, {start_time: "17:30", end_time: "18:30"}]},
        {date: {"year":2022, "month":12, "day":10}, meetings: [{start_time: "12:30", end_time: "13:30"}, {start_time: "17:30", end_time: "18:30"}]},
        {date: {"year":2022, "month":12, "day":11}, meetings: [{start_time: "13:30", end_time: "19:30"}, {start_time: "17:30", end_time: "18:30"}]},
        {date: {"year":2022, "month":12, "day":12}, meetings: [{start_time: "14:30", end_time: "19:30"}, {start_time: "17:30", end_time: "18:30"}]},
        {date: {"year":2022, "month":12, "day":13}, meetings: [{start_time: "15:30", end_time: "19:30"}, {start_time: "17:30", end_time: "18:30"}]},
        {date: {"year":2022, "month":12, "day":14}, meetings: [{start_time: "16:30", end_time: "10:30"}, {start_time: "17:30", end_time: "18:30"}]}
      ]
    }
    ...MHFreeTimeListAPIHelp([...d.days[0].meetings])
    function TimeToNum(time){
          return 4 * Number(time.substring(0, 2)) + Number(time.substring(3)) / 15;
        }
        
        function MHFreeTimeListAPIHelp(rawTimeList){
          const time = [];
          let i = 0;
          for(i = 0 ; i < 96 ; i++){
            time.push("full");
          }
          rawTimeList.forEach((data)=>{
            let j = 0;
            for(j = TimeToNum(data.start_time) ; j < TimeToNum(data.end_time) ; j++){
              time[j] = "free";
            }
          })
          return [...time];
        }
*/

function MHFreeTimeListAPI(mh_id, year, month, day, state){
  //call api api_get_timetable

    const d = {mh_id: -1, is_succesfull: false, error_string: "",
      days: [{date: {"year":2022, "month":12, "day":8}, meetings: []},
        {date: {"year":2022, "month":12, "day":9}, meetings: []},
        {date: {"year":2022, "month":12, "day":10}, meetings: []},
        {date: {"year":2022, "month":12, "day":11}, meetings: []},
        {date: {"year":2022, "month":12, "day":12}, meetings: []},
        {date: {"year":2022, "month":12, "day":13}, meetings: []},
        {date: {"year":2022, "month":12, "day":14}, meetings: []}
      ]
    }
  
  try {
    postData("https://bia2django.iran.liara.run/api/get_timetable/", {"mh_id": mh_id, "date": {"year":year, "month":month, "day":day}})
    .then((data) => {
      if(data.is_succesfull){
        const TimeToNum = (time)=>{
          return 4 * time.hour + time.minute / 15;
        }
        
        const MHFreeTimeListAPIHelp = (rawTimeList)=>{
          const time = [];
          let i = 0;
          for(i = 0 ; i < 96 ; i++){
            time.push("full");
          }
          rawTimeList.forEach((data)=>{
            let j = 0;
            for(j = TimeToNum(data.start_time) ; j < TimeToNum(data.end_time) ; j++){
              time[j] = "free";
            }
          })
          return [...time];
        }
        d.mh_id = data.mh_id;
        d.days = [...data.days];
        d.is_succesfull = data.is_succesfull;
        d.error_string = data.error_string;
        state({mh_id: d.mh_id, is_succesfull: d.is_succesfull, error_string: d.error_string,
          days: [
            {date: d.days[0].date , meetings: [...MHFreeTimeListAPIHelp([...d.days[0].meetings])]},
            {date: d.days[1].date , meetings: [...MHFreeTimeListAPIHelp([...d.days[1].meetings])]},
            {date: d.days[2].date , meetings: [...MHFreeTimeListAPIHelp([...d.days[2].meetings])]},
            {date: d.days[3].date , meetings: [...MHFreeTimeListAPIHelp([...d.days[3].meetings])]},
            {date: d.days[4].date , meetings: [...MHFreeTimeListAPIHelp([...d.days[4].meetings])]},
            {date: d.days[5].date , meetings: [...MHFreeTimeListAPIHelp([...d.days[5].meetings])]},
            {date: d.days[6].date , meetings: [...MHFreeTimeListAPIHelp([...d.days[6].meetings])]}
          ]});
      }else{
        d.is_succesfull = data.is_succesfull;
        d.error_string = data.error_string;
      }
    });
  } catch (error) {
      d.is_succesfull = false;
  }
  

  
}

function MHRegisterAPI(first_name, last_name, mh_email, mh_password1, mh_password2, teacher_number, degree, field, link_to_webpage){
  //call api 


  return {
    "mh_id": 1,
    "is_succesfull": true,
    "error_string": ""
  }
}

function MHFillTimeTableAPI(mh_id, mh_password, rawDays ,state){
  //call api api_mh_fill_timetable
  const MHFillTimeTableAPIListMaker = (strList)=>{
    let i = 0;
    let j = 0;
    const mList = [];
    for(i = 0 ; i < 96 ; i++){
      if(strList[i]=="free"){
        for(j = i ; j < 96 ; j++){
          if(!(strList[j]=="free")){
            break;
          }
        }
        mList.push({
          "start_time": {"hour": Number.parseInt(i/4), "minute": ((i%4)*15), "second": 0},
          "end_time": {"hour": Number.parseInt(j/4), "minute": ((j%4)*15), "second": 0}
        })
        i = j;
      }
    }
    return [...mList]
  }
  const MHFillTimeTableAPIHelp = ()=>{
    const days = [];
    rawDays.forEach((day)=>{
      days.push({date: {...day.date}, meetings: [...MHFillTimeTableAPIListMaker([...day.meetings])]})
    })
    return [...days];
  }

  const a = [...MHFillTimeTableAPIHelp()];
  const d = {is_succesfull: false, error_string: ""}
  
  try {
    postData("https://bia2django.iran.liara.run/api/mh_fill_timetable/", {"mh_id": mh_id, "mh_password": mh_password,  "days": [...a]})
    .then((data) => {
      if(data.is_succesfull){
        d.is_succesfull = data.is_succesfull;
        d.error_string = data.error_string;
        state({is_succesfull: data.is_succesfull, error_string: data.error_string});
      }else{
        d.is_succesfull = data.is_succesfull;
        d.error_string = data.error_string;
      }
    });
  } catch (error) {
      d.is_succesfull = false;
  }
  
  
  return{is_succesfull: d.is_succesfull, error_string: d.error_string}
}

function userReserveMeetingAPI(mh_id, user_id, user_password, dateYear, dateMonth, dateDay, start_timeHour, start_timeMinute, 
  end_timeHour, end_timeMinute, subject, rate, description, was_holded, state){
  //call api api_reserve_meeting

  const d = {is_succesfull: false, error_string: ""};
  
  try {
    postData("https://bia2django.iran.liara.run/api/reserve_meeting/", {"mh_id": mh_id, "user_id": user_id, "user_password": user_password, 
      "date": {"year": dateYear, "month": dateMonth, "day": dateDay}, "start_time": {"hour": start_timeHour, "minute": start_timeMinute, "second": 0},
      "end_time": {"hour": end_timeHour, "minute": end_timeMinute, "second": 0}, "subject": subject, "rate": rate, "description": description, "was_holded": was_holded})
    .then((data) => {
      if(data.is_succesfull){
        d.is_succesfull = data.is_succesfull;
        d.error_string = data.error_string;
        state({is_succesfull: d.is_succesfull, error_string: d.error_string})
      }else{
        d.is_succesfull = data.is_succesfull;
        d.error_string = data.error_string;
      }
    });
  } catch (error) {
      d.is_succesfull = false;
  }

  return {is_succesfull: d.is_succesfull, error_string: d.error_string};
}

/*
const listMeetingPast = [
    {meeting_id: "1", MH_id: "p2@aut.ac.ir", user_id: "s@aut.ac.ir", start_time: "12", end_time: "13", date: "1/1/1", subject: "نظریه اعداد", description:"برسی اثبات حدث گلد باخ", was_holded: true},
    {meeting_id: "2", MH_id: "p1@aut.ac.ir", user_id: "s@aut.ac.ir", start_time: "12", end_time: "13", date: "1/1/3", subject: "آنالیز عددی", description:"برسی اثبات حدث گلد باخ", was_holded: true},
    {meeting_id: "3", MH_id: "p4@aut.ac.ir", user_id: "s@aut.ac.ir", start_time: "12", end_time: "13", date: "1/1/6", subject: "جبر", description:"برسی اثبات حدث گلد باخ", was_holded: true},
    {meeting_id: "4", MH_id: "p3@aut.ac.ir", user_id: "s@aut.ac.ir", start_time: "14", end_time: "15", date: "1/1/8", subject: "هندسه", description:"برسی اثبات حدث گلد باخ", was_holded: true},
    {meeting_id: "5", MH_id: "p2@aut.ac.ir", user_id: "s@aut.ac.ir", start_time: "16", end_time: "17", date: "1/1/8", subject: "نظریه اعداد", description:"برسی اثبات حدث گلد باخ", was_holded: true},
    {meeting_id: "6", MH_id: "p2@aut.ac.ir", user_id: "s@aut.ac.ir", start_time: "10", end_time: "11", date: "1/1/8", subject: "نظریه اعداد", description:"برسی اثبات حدث گلد باخ", was_holded: true}
  ];
  const listMeetingToDay = [
    {meeting_id: "10", MH_id: "abc@gmail.com", user_id: "s@aut.ac.ir", start_time: "14", end_time: "15", date: "1401/10/10", subject: "نظریه اعداد", description:"برسی اثبات حدث گلد باخ", was_holded: true},
    {meeting_id: "20", MH_id: "def@gmai.com", user_id: "s@aut.ac.ir", start_time: "8", end_time: "9", date: "1401/10/10", subject: "آنالیز عددی", description:"برسی سیستم های دینامیکی پیوسته", was_holded: true},
    ];
  const listMeetingFuture = [
    {meeting_id: "100", MH_id: "p1@aut.ac.ir", user_id: "s@aut.ac.ir", start_time: "12", end_time: "13", date: "1/1/12", subject: "نظریه اعداد", description:"برسی اثبات حدث گلد باخ", was_holded: false},
    {meeting_id: "200", MH_id: "p1@aut.ac.ir", user_id: "s@aut.ac.ir", start_time: "17", end_time: "18", date: "1/1/16", subject: "آنالیز عددی", description:"برسی اثبات حدث گلد باخ", was_holded: false},
    {meeting_id: "300", MH_id: "p3@aut.ac.ir", user_id: "s@aut.ac.ir", start_time: "12", end_time: "13", date: "1/1/11", subject: "جبر", description:"برسی اثبات حدث گلد باخ", was_holded: false},
    {meeting_id: "400", MH_id: "p1@aut.ac.ir", user_id: "s@aut.ac.ir", start_time: "10", end_time: "11", date: "1/1/17", subject: "هندسه", description:"برسی اثبات حدث گلد باخ", was_holded: false},
    {meeting_id: "500", MH_id: "p4@aut.ac.ir", user_id: "s@aut.ac.ir", start_time: "12", end_time: "13", date: "1/1/16", subject: "نظریه اعداد", description:"برسی اثبات حدث گلد باخ", was_holded: false},
    {meeting_id: "600", MH_id: "p5@aut.ac.ir", user_id: "s@aut.ac.ir", start_time: "15", end_time: "16", date: "1/1/12", subject: "نظریه اعداد", description:"برسی اثبات حدث گلد باخ", was_holded: false}
  ];
  {listMeetingPast: [...d.listMeetingPast], listMeetingToDay: [...d.listMeetingToDay], listMeetingFuture: [...d.listMeetingFuture], is_succesfull: d.is_succesfull, error_string: d.error_string}
*/

function MHMeetingAPI(mh_id, mh_password, year, month, day, state){
  //call api api_get_mh_timeline
  

  const d = {listMeetingPast: [], listMeetingToDay: [], listMeetingFuture: [], is_succesfull: false, error_string: ""}

  
  try {
    postData("https://bia2django.iran.liara.run/api/get_mh_timeline/", 
      {"mh_id": mh_id, "mh_password": mh_password,  "date": {"year": year, "month": month, "day": day}})
    .then((data) => {
      if(data.is_succesfull){
        d.listMeetingPast = [...data.past_meetings];
        d.listMeetingToDay = [...data.present_meetings];
        d.listMeetingFuture = [...data.future_meetings];
        d.is_succesfull = data.is_succesfull;
        d.error_string = data.error_string;
        state({listMeetingPast: [...d.listMeetingPast], listMeetingToDay: [...d.listMeetingToDay], listMeetingFuture: [...d.listMeetingFuture], is_succesfull: d.is_succesfull, error_string: d.error_string})
      }else{
        d.is_succesfull = data.is_succesfull;
        d.error_string = data.error_string;
      }
    });
  } catch (error) {
      d.is_succesfull = false;
  }
  
}

/*
const d = {first_name: "هادی", last_name: "هادی زاده", mh_email:"ab@aut.ac.ir", mh_password: "87654321", teacher_number:"9712000", degree: "MA" , 
  field:"ریاضی و کاربردها", link_to_webpage: "www.google.com", is_succesfull: true, error_string: ""}
*/

function MHProfileAPI(mh_id, mh_password, state){
  //call api api_get_mh_account

  const d = {first_name: "", last_name: "", mh_email:"", mh_password: "", teacher_number:"", degree: "" , 
  field:"", link_to_webpage: "", is_succesfull: false, error_string: ""}
  
  
  try {
      
    postData("https://bia2django.iran.liara.run/api/get_mh_account/", {"mh_id": mh_id, "mh_password": mh_password})
    .then((data) => {
      if(data.is_succesfull){
        d.first_name = data.first_name;
        d.last_name = data.last_name;
        d.mh_email = data.mh_email;
        d.mh_password = data.mh_password;
        d.teacher_number = data.teacher_number;
        d.degree = data.degree;
        d.field = data.field;
        d.link_to_webpage = data.link_to_webpage;
        d.is_succesfull = data.is_succesfull;
        d.error_string = data.error_string;
        state({first_name: d.first_name, last_name: d.last_name, mh_email: d.mh_email, mh_password: d.mh_password, teacher_number: d.teacher_number, 
          degree: d.degree, field: d.field, link_to_webpage: d.link_to_webpage, is_succesfull: d.is_succesfull, error_string: d.error_string})

      }else{
        d.is_succesfull = data.is_succesfull;
        d.error_string = data.error_string;
      }
    });
      
  } catch (error) {
      d.is_succesfull = false;
  }
}

/*
{
        "mh_id":1,
        "mh_password": "87654321",
        "first_name": "John",
        "last_name": "Nash",
        "mh_email": "JohnN@gmaiil.com",
        "mh_password_new": "12345678",
        "teacher_number": "0",
        "degree": "Full Teacher",
        "field": "Math",
        "link_to_webpage": "",
        "is_succesfull": true,
        "error_string": ""
    }
*/

function MHProfileEditAPI(mh_id, mh_password, first_name, last_name, mh_email, mh_password_new, 
  teacher_number, degree, field, link_to_webpage, state){
  //call api api_login
  //get email and password of user and return the role and id of them. mh and user use it.
  const d = {is_succesfull: false, error_string: ""};
  try {    
    postData("https://bia2django.iran.liara.run/api/fill_mh_account/", {'mh_id': mh_id, 'mh_password': mh_password, 
    'first_name': first_name, 'last_name': last_name, 'mh_email': mh_email, 'mh_password_new': mh_password_new, 
    'teacher_number': teacher_number, 'degree': degree, 'field': field, 'link_to_webpage': link_to_webpage, is_succesfull: true})
    .then((data) => {
      if(data.is_succesfull){
        d.is_succesfull = data.is_succesfull;
        d.error_string = data.error_string;
        state({is_succesfull: d.is_succesfull, error_string: d.error_string});
    }else{
      d.is_succesfull = data.is_succesfull;
      d.error_string = data.error_string;
    }
  });
      
  } catch (error) {
    d.is_succesfull = false;
  }
}

function userProfileEditAPI(user_id, user_password, first_name, last_name, user_email, user_password_new, 
  student_number, degree, field, mobile_number, mh_id, university, state){
  //call api api_login
  //get email and password of user and return the role and id of them. mh and user use it.
  const d = {is_succesfull: false, error_string: ""};
  try {    
    postData("https://bia2django.iran.liara.run/api/fill_user_account/", {'user_id': user_id, 'user_password': user_password, 
    'first_name': first_name, 'last_name': last_name, 'user_email': user_email, 'user_password_new': user_password_new, 
    'student_number': student_number, 'degree': degree, 'field': field, 'mobile_number': mobile_number, 'mh_id': mh_id, 'university': university})
    .then((data) => {
      if(data.is_succesfull){
        d.is_succesfull = data.is_succesfull;
        d.error_string = data.error_string;
        state({is_succesfull: d.is_succesfull, error_string: d.error_string})
        console.log("good : ", d);
    }else{
      d.is_succesfull = data.is_succesfull;
      d.error_string = data.error_string;
      console.log("bad : ", d);
    }
  });
      
  } catch (error) {
    d.is_succesfull = false;
    console.log("very bad : ", d);
  }
}


export {loginAPI, userProfileAPI, userRegisterAPI, userMeetingAPI, userMHListAPI, MHFreeTimeListAPI, 
  MHRegisterAPI, MHFillTimeTableAPI, userReserveMeetingAPI, MHMeetingAPI, MHProfileAPI, MHProfileEditAPI, userProfileEditAPI};


/*
{meeting_id: "30", MH_id: "p1@aut.ac.ir", user_id: "s@aut.ac.ir", start_time: "19", end_time: "20", date: "1/1/10", subject: "جبر", description:"برسی اثبات حدث گلد باخ", was_holded: true},
    {meeting_id: "40", MH_id: "p2@aut.ac.ir", user_id: "s@aut.ac.ir", start_time: "10", end_time: "11", date: "1/1/10", subject: "هندسه", description:"برسی اثبات حدث گلد باخ", was_holded: false},
    {meeting_id: "50", MH_id: "p1@aut.ac.ir", user_id: "s@aut.ac.ir", start_time: "12", end_time: "13", date: "1/1/10", subject: "نظریه اعداد", description:"برسی اثبات حدث گلد باخ", was_holded: false},
    {meeting_id: "60", MH_id: "p3@aut.ac.ir", user_id: "s@aut.ac.ir", start_time: "20", end_time: "21", date: "1/1/10", subject: "نظریه اعداد", description:"برسی اثبات حدث گلد باخ", was_holded: false}
  


   $.ajax({
        url: "https://bia2django.iran.liara.run/api/register_mh/",
        type: "GET",
        async: true,
        crossDomain: true,
        dataType: "json",
        
        body: JSON.stringify(a),
        contentType:"application/json",
        success: function(res) {
          d.role = res.role;
          d.person_id = res.person_id;
          d.is_succesfull = res.is_succesfull;
          d.error_string = res.error_string;
          console.log(a,d);
        },
        error: (er)=> {
          d.error_string = er;
          d.is_succesfull = false;
        }
      });


      postData("https://bia2django.iran.liara.run/api/register_mh/", a)
  .then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
  });
  import $ from 'jquery'

  https://bia2django.iran.liara.run/api/
*/