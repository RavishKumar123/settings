import React, { useEffect } from "react";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import TitleDesc from "../titleDesc/titleDesc";
import { useSelector, useDispatch } from "react-redux";
import { changeMainValue } from "../../redux/reducers/main";
import Select from "react-select";
import MyEditor from "../editor/editor";

const Main = ({ options, name }) => {
  const dispatch = useDispatch();
  const main = useSelector((state) => state.settings.tabs);
  const isStateReady = useSelector((state) => state.settings.stateReady);

  const getInputBox = (option, index) => {
    switch (option.type) {
      case "text":
        return (
          <InputGroup key={index} className="w-75">
            <FormControl
              id={option.name}
              placeholder=""
              value={main[option.name]}
              onChange={(event) => {
                const payload = {
                  value: event.target.value,
                  option: option,
                };
                dispatch(changeMainValue(payload));
              }}
            />
          </InputGroup>
        );
      case "select":
        return (
          <Select
            key={index}
            options={option.values}
            className="w-75"
            onChange={(event) => {
              const payload = {
                value: event.map((val) => val.value),
                option: option,
              };
              dispatch(changeMainValue(payload));
            }}
            isMulti={option.multiple}
            value={main[option.name].map((val) => ({ value: val, label: val }))}
          />
        );
      case "checkbox":
        return (
          <Form.Check
            key={index}
            type="checkbox"
            checked={main[option.name]}
            onChange={(event) => {
              const payload = {
                value: event.target.checked,
                option: option,
              };
              dispatch(changeMainValue(payload));
            }}
          />
        );
      case "switch":
        return (
          <Form key={index}>
            {option.values.map((value, index) => {
              return (
                <div key={index}>
                  {" "}
                  <div className="d-flex justify-content-between align-items-center">
                    <Form.Check
                      type="switch"
                      id={value.name}
                      label={value.label}
                      checked={main[value.name]}
                      onChange={(event) => {
                        const payload = {
                          value: event.target.checked,
                          option: value,
                        };
                        dispatch(changeMainValue(payload));
                      }}
                    />
                    <div className="float-end">
                      <span className="text-primary">Edit template</span>
                    </div>
                  </div>
                  {main[value.name] &&
                    value.options.map((op, index) => {
                      return getInputBox(op, index);
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
            key={index}
            value={main[option.name]}
            onChange={(event) => {
              const payload = {
                value: event,
                option: option,
                tabName: name,
              };
              dispatch(changeMainValue(payload));
            }}
          />
        );
      default:
        break;
    }
  };
  useEffect(() => {
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
            {isStateReady && (
              <div className="col-md-9">{getInputBox(option)}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Main;
