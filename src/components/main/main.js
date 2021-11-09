import React, { useEffect } from "react";
import { Form, Row, InputGroup, Col, FormControl } from "react-bootstrap";
import TitleDesc from "../titleDesc/titleDesc";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  changeMainValue,
  changeEmailValue
} from "../../redux/reducers/main";
const Main = ({ options }) => {
  const dispatch = useDispatch();
  const getInputBox = (option) => {
    switch (option.type) {
      case "text":
        return (
          <InputGroup
            className="w-75"
            onChange={(event) => {
              const payload = { value: event.target.value, option: option };
              console.log(payload);
              dispatch(changeMainValue(payload));
            }}
          >
            <FormControl
              id="inlineFormInputGroup"
              placeholder=""
              value={option.value}
              
            />
          </InputGroup>
        );
        break;
      case "select":
        return (
          <Form.Select
            className="w-75"
            onChange={(event) => {
              const payload = { value: event.target.value, option: option };
              console.log(payload);
              dispatch(changeMainValue(payload));
            }}
          >
            {option.values.map((value, index) => {
              return (
                <option value={value.value} key={index}>
                  {value.label}
                </option>
              );
            })}
          </Form.Select>
        );
      case "checkbox":
        return (
          <Form.Check
            type="checkbox"
            checked={option.value}
            onChange={(event) => {
              const payload = { value: event.target.checked, option: option };
              console.log(payload);
              dispatch(changeMainValue(payload));
            }}
          />
        );
      default:
        return null;
        break;
    }
  };
  useEffect(() => {
    console.log("main ", options);
    return () => {};
  }, []);
  return (
    <div className="col-md-10">
      {options.options.map((option, index) => {
        return (
          <div className="row border-top py-4" key={index}>
            <div className="col-md-3">
              <TitleDesc
                title={option.title}
                description={option.description}
              />
            </div>
            <div className="col-md-9">{getInputBox(option)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Main;
