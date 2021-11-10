import React, { useEffect } from "react";
import { Form, Row, InputGroup, Col, FormControl } from "react-bootstrap";
import TitleDesc from "../titleDesc/titleDesc";
import { useSelector, useDispatch } from "react-redux";
import {
  changeMainValue,
  changeNestedMainValue,
} from "../../redux/reducers/main";
import Select from "react-select";
import MyEditor from "../editor/editor";

const Main = ({ options, name }) => {
  const dispatch = useDispatch();
  const main = useSelector((state) => state.settings.tabs[name]);
  const getInputBox = (option, innerMain, isSwitch, propertyName) => {
    console.log(option, " ++", name);
    switch (option.type) {
      case "text":
        return (
          <InputGroup
            className="w-75"
            onChange={(event) => {
              const payload = {
                value: event.target.value,
                option: isSwitch ? { ...option, name: propertyName } : option,
                tabName: name,
                propertyName: option.name,
              };
              console.log(payload);
              dispatch(
                isSwitch
                  ? changeNestedMainValue(payload)
                  : changeMainValue(payload)
              );
            }}
          >
            <FormControl
              id="inlineFormInputGroup"
              placeholder=""
              value={innerMain[option.name]}
            />
          </InputGroup>
        );
        break;
      case "select":
        return (
          <Select
            options={option.values}
            className="w-75"
            onChange={(event) => {
              const payload = {
                value: event,
                option: option,
                tabName: name,
              };
              console.log(payload);
              dispatch(changeMainValue(payload));
            }}
            isMulti={option.multiple}
            value={innerMain[option.name]}
          />
        );
      case "checkbox":
        return (
          <Form.Check
            type="checkbox"
            checked={innerMain[option.name]}
            onChange={(event) => {
              const payload = {
                value: event.target.checked,
                option: option,
                tabName: name,
              };
              console.log(payload);
              dispatch(changeMainValue(payload));
            }}
          />
        );
      case "switch":
        return (
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
                      checked={innerMain[value.name].value}
                      onChange={(event) => {
                        const payload = {
                          value: event.target.checked,
                          option: value,
                          tabName: name,
                          propertyName: "value",
                        };
                        console.log(payload);
                        dispatch(changeNestedMainValue(payload));
                      }}
                    />
                    <div className="float-end">
                      <span className="text-primary">Edit template</span>
                    </div>
                  </div>
                  {innerMain[value.name].value &&
                    value.options.map((op) => {
                      console.log("OP", op);
                      return getInputBox(
                        op,
                        innerMain[value.name],
                        true,
                        value.name
                      );
                    })}
                  <br />
                </div>
              );
            })}
          </Form>
        );
      case "editor":
        return (
          <MyEditor
            value={innerMain[option.name]}
            onChange={(event) => {
              const payload = {
                value: event,
                option: isSwitch ? { ...option, name: propertyName } : option,
                tabName: name,
                propertyName: option.name,
              };
              console.log(payload);
              dispatch(
                isSwitch
                  ? changeNestedMainValue(payload)
                  : changeMainValue(payload)
              );
            }}
          />
        );
      default:
        return null;
        break;
    }
  };
  useEffect(() => {
    console.log("main ", main);
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
            {main && (
              <div className="col-md-9">{getInputBox(option, main, false)}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Main;
