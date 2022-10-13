import React, { useContext, useReducer } from "react";
import { EmployeeContext } from "./EmployeeContext";
import EmployeeReducer from "./EmployeeReducer";

export const useEmployee = () => {
  const { state, dispatch } = useContext(EmployeeContext);
  return [state, dispatch];
};

export const EmployeeState = ({ children }) => {
  const initialState = {
    employee: {
      name : '',
      age: '',
      email:'',
      dateOfBirth:'',
      address:'',
      photo: null
    },
    employeesList: {},
    loading: true,
    error: false,
    message: ""
  };

  const [state, dispatch] = useReducer(EmployeeReducer, initialState);

  return (
    <EmployeeContext.Provider
      value={{
        state: state,
        dispatch: dispatch
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

