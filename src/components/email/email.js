import React, { useEffect } from "react";
import {
  Form,
  Row,
  InputGroup,
  Col,
  FormControl,
  Accordion,
} from "react-bootstrap";
import MyEditor from "../editor/editor";
import TitleDesc from "../titleDesc/titleDesc";
import { useSelector, useDispatch } from "react-redux";
import {
  changeEmailValue,
  changeEmailValueOptions,
} from "../../redux/reducers/main";
const Email = ({ options }) => {
  const dispatch = useDispatch();
  const getInputBox = (option, value) => {
    switch (option.type) {
      case "text":
        return (
          <InputGroup
            className="w-75 my-4 rounded"
            onChange={(event) => {
              const payload = {
                singleValue: event.target.value,
                option: value,
                value: option,
              };
              console.log(payload);
              dispatch(changeEmailValueOptions(payload));
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
      case "editor":
        return (
          <MyEditor
            value={option.value}
            onChange={(event) => {
              const payload = {
                singleValue: event,
                option: value,
                value: option,
              };
              console.log(payload);
              dispatch(changeEmailValueOptions(payload));
            }}
          />
        );

      default:
        return null;
        break;
    }
  };
  useEffect(() => {
    console.log("email ", options);
    return () => {};
  }, []);
  return (
    <div className="col-md-10">
      {options.options.map((option, index) => {
        return (
          <div key={index}>
            <div className="row">
              <div className="col-md-4 py-2">
                <TitleDesc
                  title={option.title}
                  description={option.description}
                />
              </div>
              <div className="col-md-8">
                <Form>
                  {option.values.map((value, index) => {
                    return (
                      <div key={index}>
                        {" "}
                        <div className="d-flex justify-content-between align-items-center">
                          <Form.Check
                            type="switch"
                            id="custom-switch"
                            label={value.label}
                            checked={value.value}
                            onChange={(event) => {
                              const payload = {
                                value: event.target.checked,
                                option: value,
                              };
                              console.log(payload);
                              dispatch(changeEmailValue(payload));
                            }}
                          />
                          <div className="float-end">
                            <span className="text-primary">Edit template</span>
                          </div>
                        </div>
                        {value.value &&
                          value.options.map((op) => {
                            return getInputBox(op, value);
                          })}
                        <br />
                      </div>
                    );
                  })}
                </Form>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Email;
