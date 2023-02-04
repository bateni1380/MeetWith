import React from "react";
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Stack from 'react-bootstrap/Stack';
import Dropdown from 'react-bootstrap/Dropdown';
import CloseButton from 'react-bootstrap/CloseButton';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { userMHListAPI } from "../../API"
import { farsiField , farsiMHDegree} from "./../../Farsi"

// MHApp={props.MHApp} setMHApp={props.setMHApp} 
function UserMHBrowserItem(props){
    //console.log("card");
    return(
        <div dir="rtl">
            <Card style={{margin : "20px 8px 5px 8px"}}>
                <Card.Header as="h5" className="text-center">{props.data.first_name} {" "} {props.data.last_name}</Card.Header>
                <Card.Body>
                    <Card.Title className="text-center">{farsiMHDegree(props.data.degree)} {" "} {farsiField(props.data.field)}</Card.Title>
                    <Card.Title className="text-center">{props.data.mh_email}</Card.Title>
                    <Card.Text>
                        
                    </Card.Text>
                    <Stack>
                        <Button variant={props.color.color1} 
                        onClick={()=>{
                            props.setMHApp(props.data.id);
                            props.setPage("reserve");
                        }}
                        >رزرو</Button>
                    </Stack>
                </Card.Body>
            </Card>

        </div>
    );
}


function filterFunction(MHRaw){
    let h = {
        Applied_Mathematics: [...MHRaw.filter((value) => {
            if(value.field == "Applied Mathematics"){
                return true;
            }
            return false;
        })],
        Pure_Mathematics: [...MHRaw.filter((value) => {
            if(value.field == "Pure Mathematics"){
                return true;
            }
            return false;
        })],
        Computer_science: [...MHRaw.filter((value) => {
            if(value.field == "Computer science"){
                return true;
            }
            return false;
        })],
        Statistics: [...MHRaw.filter((value) => {
            if(value.field == "Statistics"){
                return true;
            }
            return false;
        })],
        All: [...MHRaw],
        set: true
    };
    return h;
}

function searchFunction(Search, filterTitle, MHList){
    let h1 = [];
    if(filterTitle == "Applied Mathematics"){
        h1 = [...(MHList.Applied_Mathematics)];
    }else if(filterTitle == "Pure Mathematics"){
        h1 = [...(MHList.Pure_Mathematics)];
    }else if(filterTitle == "Computer science"){
        h1 = [...(MHList.Computer_science)];
    }else if(filterTitle == "Statistics"){
        h1 = [...(MHList.Statistics)];
    }else{
        h1 = [...(MHList.All)];
    }
    let h2 = [...h1.filter((value) => {
        if(value.first_name.search(Search) >= 0 || value.last_name.search(Search) >= 0 || value.mh_email.search(Search) >= 0 || farsiMHDegree(value.degree).search(Search) >= 0 || farsiField(value.field).search(Search) >= 0){
            return true;
        }
        return false;
    })];

    return [...h2];
}

//filterFunction(userMHListAPI())
//filterTitle = Applied Mathematics , Pure Mathematics , Computer science , Statistics , All
function UserMHListBrowser(props){
    const [rawMHList, setRawMHList] = useState({mh_list: [], is_succesfull: false, error_string: ""});
    const [MHList, setMHList] = useState({set: false, Applied_Mathematics: [], Pure_Mathematics: [], Computer_science: [], Statistics: [], All: []});
    const [filterTitle, setfilterTitle] = useState("All");
    const [showList, setShowList] = useState([...MHList.All]);
    const [Search, setSearch] = useState("");
    const [firstTimeIn, setFirstTimeIn] = useState(true);

    if(!rawMHList.is_succesfull){
        userMHListAPI(setRawMHList);
    }else if(!(MHList.set)){
        setMHList(filterFunction([...rawMHList.mh_list]));
        setShowList([...MHList.All])
    }
    if(MHList.set && showList.length < 1 && filterTitle=="All" && firstTimeIn){
        setFirstTimeIn(false);
        setShowList([...MHList.All]);
    }

    const textSearch = (event) => {
        setSearch(event.target.value);
        return;
    };
    const btnSearch = (e) => {
        let h = searchFunction(Search, filterTitle, MHList);
        setShowList([...h]);
        e.preventDefault();
        return;
    };
    const btnClear = (e) => {
        setSearch("");
        let h1 = [];
        if(filterTitle == "Applied Mathematics"){
            h1 = [...(MHList.Applied_Mathematics)];
        }else if(filterTitle == "Pure Mathematics"){
            h1 = [...(MHList.Pure_Mathematics)];
        }else if(filterTitle == "Computer science"){
            h1 = [...(MHList.Computer_science)];
        }else if(filterTitle == "Statistics"){
            h1 = [...(MHList.Statistics)];
        }else{
            h1 = [...(MHList.All)];
        }
        setShowList([...h1]);
        e.preventDefault();
        return;
    };

    return(
        <div dir="rtl" style={{margin : "0px 0px 100px 0px"}}>
            <Container>
                <Row>
                    <Col sm={5}>
                    <Card style={{margin : "10px 0px 10px 0px"}}>

                    <Container>
                        <Stack direction="horizontal" gap={3} style={{margin : "10px 0px 10px 0px"}}>
                            <Form.Control className="me-auto" placeholder="جستجو" onChange={textSearch} value={Search}/>
                            <CloseButton variant={props.color.color1} onClick={btnClear}/>
                            <Button variant={props.color.color1} onClick={btnSearch}>جستجو</Button>
                        </Stack>
                    </Container>
                    <Alert variant={props.color.color1} style={{margin : "10px 5px 10px 5px"}}>
                        <Alert.Heading className="text-center">{farsiField(filterTitle)}</Alert.Heading>
                    </Alert>
                    
                        <ButtonGroup vertical size="lg" style={{margin : "10px 5px 10px 5px"}}>
                            <Button variant={filterTitle=="All" ? props.color.color2 : props.color.color1} 
                                onClick={(e)=>{setShowList([...(MHList.All)]); setfilterTitle("All"); e.preventDefault();}}>همه اساتید</Button>
                            <Button variant={filterTitle=="Pure Mathematics" ? props.color.color2 : props.color.color1} 
                                onClick={(e)=>{setShowList([...(MHList.Pure_Mathematics)]); setfilterTitle("Pure Mathematics"); e.preventDefault();}}>اساتید ریاضی محض</Button>
                            <Button variant={filterTitle=="Applied Mathematics" ? props.color.color2 : props.color.color1} 
                                onClick={(e)=>{setShowList([...(MHList.Applied_Mathematics)]); setfilterTitle("Applied Mathematics"); e.preventDefault();}}>اساتید ریاضی کاربردی</Button>
                            <Button variant={filterTitle=="Computer science" ? props.color.color2 : props.color.color1} 
                                onClick={(e)=>{setShowList([...(MHList.Computer_science)]); setfilterTitle("Computer science"); e.preventDefault();}}>اساتید علوم کامپیوتر</Button>
                            <Button variant={filterTitle=="Statistics" ? props.color.color2 : props.color.color1} 
                                onClick={(e)=>{setShowList([...(MHList.Statistics)]); setfilterTitle("Statistics"); e.preventDefault();}}>اساتید آمار</Button>
                        </ButtonGroup>
            
                    </Card>
                </Col>
            <Col sm={7}>
            {showList.map((data) => (
                <UserMHBrowserItem id={data.mh_id} data={data} color={props.color} page={props.page} setPage={props.setPage}
                    MHApp={props.MHApp} setMHApp={props.setMHApp} />
                ))}    
            </Col>
                </Row>
            
            </Container>
        </div>
    );
}

export default UserMHListBrowser;

/*
<Dropdown>
                            <Dropdown.Toggle variant={props.color.color1} id="dropdown-basic">
                                فیلتر
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item type="button" onClick={(e)=>{setShowList([...(MHList.All)]); setfilterTitle("All"); e.preventDefault();}}>همه اساتید</Dropdown.Item>
                                <Dropdown.Item type="button" onClick={(e)=>{setShowList([...(MHList.Pure_Mathematics)]); setfilterTitle("Pure Mathematics"); e.preventDefault();}}>اساتید ریاضی محض</Dropdown.Item>
                                <Dropdown.Item type="button" onClick={(e)=>{setShowList([...(MHList.Applied_Mathematics)]); setfilterTitle("Applied Mathematics"); e.preventDefault();}}>اساتید ریاضی کاربردی</Dropdown.Item>
                                <Dropdown.Item type="button" onClick={(e)=>{setShowList([...(MHList.Computer_science)]); setfilterTitle("Computer science"); e.preventDefault();}}>اساتید علوم کامپیوتر</Dropdown.Item>
                                <Dropdown.Item type="button" onClick={(e)=>{setShowList([...(MHList.Statistics)]); setfilterTitle("Statistics"); e.preventDefault();}}>اساتید آمار</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
*/