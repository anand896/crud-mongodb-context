import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { CustomAlert } from "./Components/form/CustomAlert";
import { useEmployee } from "./contexts/Employee/EmployeeState";
import { getSingleEmployee, editEmployee } from "./contexts/Employee/EmployeeAction";
import { useParams } from 'react-router-dom';


const Edit = () => { 
    const [employeeState, employeeDispatch] = useEmployee();
    const { employee, error } = employeeState;

    let { userId } = useParams();
    
    const [employeeDetails, setEmployeeDetails] = useState(employee);
    const [alertMsg, setAlertMsg] = useState({message : '', variant: ''});

    useEffect(() => {
        getSingleEmployee(employeeDispatch, userId);
        setEmployeeDetails({name:employee.name, age:employee.age, email:employee.email,
            dateOfBirth:employee.dateOfBirth, address:employee.address, photo:employee.photo
        })
    }, [employee.name, employee.age, employee.email,
        employee.dateOfBirth, employee.address, employee.photo, employeeDispatch, userId]);

    let addNewemployeeAction = (evt) => {
        if(employeeDetails.name === "" || employeeDetails.age === ""
        || employeeDetails.email === ""){
            setAlertMsg({...alertMsg, message:'Please fill all required fields', variant: 'danger'});
        }else{
            editEmployee(employeeDispatch, employeeDetails, userId);
            if(!error) setAlertMsg({...alertMsg, message:'Updated Successfully', variant: 'success'});
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
                                <Form.Control type="text" defaultValue={employeeDetails.name} onChange={(e)=>setEmployeeDetails({...employeeDetails, name:e.target.value})} placeholder="Employee Name" />
                            </Form.Group>
                            <Form.Group controlId="employee_age">
                                <Form.Label>Age</Form.Label>
                                <Form.Control type="text" defaultValue={employeeDetails.age} onChange={(e)=>setEmployeeDetails({...employeeDetails, age:e.target.value})} placeholder="Employee Age" />
                            </Form.Group>
                            <Form.Group controlId="employee_email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" defaultValue={employeeDetails.email} onChange={(e)=>setEmployeeDetails({...employeeDetails, email:e.target.value})} placeholder="Employee Email" />
                            </Form.Group>
                            <Form.Group controlId="employee_dateOfBirth">
                                <Form.Label>Date Of Birth</Form.Label>
                                <Form.Control type="text" defaultValue={employeeDetails.dateOfBirth} onChange={(e)=>setEmployeeDetails({...employeeDetails, dateOfBirth:e.target.value})} placeholder="Employee Date Of Birth" />
                            </Form.Group>
                            <Form.Group controlId="employee_Address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" defaultValue={employeeDetails.address} onChange={(e)=>setEmployeeDetails({...employeeDetails, address:e.target.value})} placeholder="Employee Address" />
                            </Form.Group>
                            <Form.Group controlId="employee_photo">
                                <Form.Label>Photo</Form.Label>
                                <Form.Control type="file" onChange={(e)=>setEmployeeDetails({...employeeDetails, photo: e.target.files[0]})} placeholder="Employee Photo" />
                            </Form.Group>
                            <Button variant="primary" onClick={addNewemployeeAction} type="button">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            {alertMsg.message && <CustomAlert className="customErrorBottomRight" variant={alertMsg.variant} alertMsg={alertMsg.message} setAlertMsg={setAlertMsg} /> }
        </>
  );
};

export default Edit;
