import React, { useEffect } from "react";
import "./App.css";
import { Form, Row, InputGroup, Col, FormControl } from "react-bootstrap";
import Main from "./components/main/main";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addTabsState } from "./redux/reducers/main";
const OPTIONS = {
  main: {
    name: "Main settings", // tab name
    options: [
      {
        name: "role", // option attr name
        value: [{ label: "Customer", value: "customer" }], // defalut option value
        title: "Who can manage", // option title
        description: "Who can manage", // option description
        type: "select", // option type
        multiple: true,
        order: 10, // option sort order
        values: [
          // select values
          {
            label: "Translator",
            value: "translator",
          },
          {
            label: "Customer",
            value: "customer",
          },
          {
            label: "Subscriber",
            value: "subscriber",
          },
          {
            label: "Editor",
            value: "editor",
          },
        ],
      },
      {
        name: "cur",
        value: "$",
        title: "Currency",
        description: "Description here",
        type: "text", // input type text
        multiple: false,
        order: 30,
      },
      {
        name: "time",
        value: 1,
        title: "AM/PM time Format",
        description: "AM/PM time Format",
        type: "checkbox", // input type checkbox
        multiple: false,
        order: 20,
        values: [
          {
            label: "",
            value: false,
          },
        ],
      },
    ],
  },
  email: {
    name: "Email", // tab name
    options: [
      {
        name: "", // option attr name - empty for switch
        value: "", // option attr value - empty for switch
        title: "Shortcodes", // option title
        description: "description for this", // option description
        type: "switch", // option view type bootstrap switch
        multiple: true,
        order: 40, // sort order
        values: [
          {
            label: "New booking", // switch label
            name: "e_new", // switch name
            value: "", // switch value
            options: [
              // these options appear and can be edited if this switch is enabled
              {
                name: "e_new_title",
                value: "",
                title: "",
                description: "",
                type: "text",
                multiple: false,
                order: 10,
              },
              {
                name: "e_new_template",
                value: "",
                title: "",
                description: "",
                type: "editor",
                multiple: false,
                order: 20,
              },
            ],
          },
          {
            label: "Reminder", // switch label
            name: "e_rem", // switch name
            value: 1, // switch value
            options: [
              {
                name: "e_rem_title",
                value: "Reminder Title",
                title: "",
                description: "",
                type: "text",
                multiple: false,
                order: 10,
              },
              {
                name: "e_rem_template",
                value: "<p>Hello <strong>world!</strong></p>",
                title: "",
                description: "",
                type: "editor",
                multiple: false,
                order: 20,
              },
            ],
          },
          {
            label: "Register", // switch label
            name: "e_reg", // switch name
            value: "", // switch value
            options: [
              {
                name: "e_reg_title",
                value: "",
                title: "",
                description: "",
                type: "text",
                multiple: false,
                order: 10,
              },
              {
                name: "e_reg_template",
                value: "",
                title: "",
                description: "",
                type: "editor",
                multiple: false,
                order: 20,
              },
            ],
          },
        ],
      },
    ],
  },
  third: {
    name: "Third",
    options: [
      {
        name: "e_another",
        value: "en",
        title: "Title",
        description: "desc",
        type: "text",
        multiple: false,
        order: 10,
      },
    ],
  },
};
function App() {
  // const main = useSelector((state) => state.settings.main);
  // const email = useSelector((state) => state.settings.email);
  const TABS = Object.keys(OPTIONS);
  const dispatch = useDispatch();
  const generateValueState = () => {
    let state = {};
    TABS.map((tab) => {
      state[tab] = {};
      OPTIONS[tab].options.map((op) => {
        if (
          op.type === "select" ||
          op.type === "text" ||
          op.type === "checkbox"
        ) {
          state[tab][op.name] = op.value;
        } else if (op.type === "switch") {
          op.values.map((childOp) => {
            state[tab][childOp.name] = { value: childOp.value };
            childOp.options.map((nested) => {
              state[tab][childOp.name][nested.name] = nested.value;
            });
          });
        }
      });
    });
    dispatch(addTabsState(state));
  };
  useEffect(() => {
    generateValueState();
    return () => {};
  }, []);
  return (
    <BrowserRouter>
      <div className="container">
        <div className="header pt-5 pb-3 border-bottom">
          <p className="h1">Settings</p>
        </div>
        <div className="row mt-5">
          <div className="col-md-2">
            {TABS.map((tab) => {
              return (
                <NavLink
                  to={`/${tab}`}
                  activeclassname="settings-active"
                  className="mb-2 d-block"
                >
                  <button className="btn setting-btn">{tab}</button>
                </NavLink>
              );
            })}
          </div>
          <Routes>
            {TABS.map((tab) => {
              return (
                <Route
                  path={`/${tab}`}
                  element={<Main options={OPTIONS[tab]} name={tab} />}
                />
              );
            })}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
