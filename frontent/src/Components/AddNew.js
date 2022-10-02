import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { CustomAlert } from "./form/CustomAlert";

import { useEmployee } from "../contexts/Employee/EmployeeState";
import { addEmployee, setLoading } from "../contexts/Employee/EmployeeAction";

const Home = () => { 
    const [employeeState, employeeDispatch] = useEmployee();
    const { employee, loading, error, message } = employeeState;

    const [employeeDetails, setEmployeeDetails] = useState({
            name : '',
            age: '',
            email:'',
            dateOfBirth:'',
            address:'',
            photo:''
        });
    const [alertMsg, setAlertMsg] = useState({message : '', variant: ''});


    const employee_name = useRef(null);
    const employee_age = useRef(null);
    const employee_email = useRef(null);
    const employee_dateOfBirth = useRef(null);
    const employee_address = useRef(null);
    const employee_photo = useRef(null);


    let addNewemployeeAction = (evt) => {
        if(employeeDetails.name === "" || employeeDetails.age === ""
        || employeeDetails.email === "" || employeeDetails.dateOfBirth === ""
        || employeeDetails.address === "" || employeeDetails.photo === ""){
            setAlertMsg({...alertMsg, message:'Please fill all required fields', variant: 'danger'});
        }else{
           addEmployee(employeeDispatch, {...employeeDetails});
           employee_name.current.value = '';
           employee_age.current.value = '';
           employee_email.current.value = '';
           employee_dateOfBirth.current.value = '';
           employee_address.current.value = '';
           employee_photo.current.value = '';
           setAlertMsg({...alertMsg, message:'New Employee Added Successfully', variant: 'success'});
        }
    }


  return (
    <>
            <Container fluid>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Add New</h1>
                </div>
                <Row className="mt-4">
                    <Col xs={6} md={5}>
                        <Form>
                            <Form.Group controlId="employee_name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" ref={employee_name} defaultValue={employeeDetails.name} onChange={(e)=>setEmployeeDetails({...employeeDetails, name:e.target.value})} placeholder="Employee Name" />
                            </Form.Group>
                            <Form.Group controlId="employee_age">
                                <Form.Label>Age</Form.Label>
                                <Form.Control type="text" ref={employee_age} defaultValue={employeeDetails.age} onChange={(e)=>setEmployeeDetails({...employeeDetails, age:e.target.value})} placeholder="Employee Age" />
                            </Form.Group>
                            <Form.Group controlId="employee_email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" ref={employee_email} defaultValue={employeeDetails.email} onChange={(e)=>setEmployeeDetails({...employeeDetails, email:e.target.value})} placeholder="Employee Email" />
                            </Form.Group>
                            <Form.Group controlId="employee_dateOfBirth">
                                <Form.Label>Date Of Birth</Form.Label>
                                <Form.Control type="date" ref={employee_dateOfBirth} defaultValue={employeeDetails.dateOfBirth} onChange={(e)=>setEmployeeDetails({...employeeDetails, dateOfBirth:e.target.value})} placeholder="Employee Date Of Birth" />
                            </Form.Group>
                            <Form.Group controlId="employee_Address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" ref={employee_address} defaultValue={employeeDetails.address} onChange={(e)=>setEmployeeDetails({...employeeDetails, address:e.target.value})} placeholder="Employee Address" />
                            </Form.Group>
                            <Form.Group controlId="employee_photo">
                                <Form.Label>Photo</Form.Label>
                                <Form.Control type="text" ref={employee_photo} defaultValue={employeeDetails.photo} onChange={(e)=>setEmployeeDetails({...employeeDetails, photo:e.target.value})} placeholder="Employee Photo" />
                            </Form.Group>
                            <br></br>
                            <Button variant="primary" onClick={addNewemployeeAction} type="button">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            {alertMsg.message && <CustomAlert className="customErrorBottomRight" variant={alertMsg.variant} alertMsg={alertMsg.message} setAlertMsg={setAlertMsg} /> }
        </>
  );
};

export default Home;
