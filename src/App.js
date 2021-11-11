import React, { useEffect } from "react";
import "./App.css";
import { Row, Col, Tab, Nav } from "react-bootstrap";
import Main from "./components/main/main";
import { useDispatch } from "react-redux";
import { addTabsState } from "./redux/reducers/main";
const OPTIONS = {
  main: {
    name: "Main settings", // tab name
    options: [
      {
        name: "role", // option attr name
        value: ["customer"], // defalut option value
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
  const TABS = Object.keys(OPTIONS);
  const dispatch = useDispatch();
  useEffect(() => {
    const generateValueState = () => {
      let state = {};
      TABS.forEach((tab) => {
        OPTIONS[tab].options.forEach((op) => {
          if (
            op.type === "select" ||
            op.type === "text" ||
            op.type === "checkbox"
          ) {
            state[op.name] = op.value;
          } else if (op.type === "switch") {
            op.values.forEach((childOp) => {
              state[childOp.name] = childOp.value;
              childOp.options.forEach((nested) => {
                state[nested.name] = nested.value;
              });
            });
          }
        });
      });
      dispatch(addTabsState(state));
    };
    generateValueState();
    return () => {};
    
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps
  return (
    <div className="container">
      <div className="header pt-5 pb-3 border-bottom">
        <p className="h1">Settings</p>
      </div>
      <div className="row mt-5">
        <Tab.Container id="left-tabs-example" defaultActiveKey={TABS[0]}>
          <Row>
            <Col sm={2}>
              <Nav variant="pills" className="flex-column">
                {TABS.map((tab, index) => {
                  return (
                    <Nav.Item key={index}>
                      <Nav.Link eventKey={tab}>{tab}</Nav.Link>
                    </Nav.Item>
                  );
                })}
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                {TABS.map((tab, index) => {
                  return (
                    <Tab.Pane eventKey={tab} key={index}>
                      <Main options={OPTIONS[tab]} name={tab} />
                    </Tab.Pane>
                  );
                })}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
  );
}

export default App;
