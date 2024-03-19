import { ReactElement, useCallback } from "react";
import widgets from "../Widgets/index";
import { Col, Row, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { PageType } from "./type";
import styles from "./styles.module.scss";
import Toolbar from "../Toolbar/Toolbar";
import Skeleton from "../Skeleton/Skeleton";
import { useGetContentQuery } from "../../features/common/commonApiSlice";

const Page = ({clientId, endpoint}: PageType) => {
  const ls = localStorage.getItem("user");
  const username = ls && JSON.parse(ls)?.user.username;
  const group = ls && JSON.parse(ls)?.groups[0];
  const {data, isLoading, isSuccess, isError} = useGetContentQuery({endpoint, username, group});

  const fetchPage = (clientId: string, endpoint: string) => {
    console.log(clientId, endpoint);

    // Catalog page
    if (window.location.pathname === "/") {
      return {
        "kind": "Row",
        "apiVersion": "layout.ui.krateo.io/v1alpha1",
        "metadata": {
          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbb",
        },
        "status": {
          "content": {
            "kind": "ColumnList",
            "apiVersion": "layout.ui.krateo.io/v1alpha1",
            "metadata": {
              "uid": "e14d5e2d-1170-4360-9b86-827d527dabbc",
            },
            "items": [
              {
                "kind": "Column",
                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                "metadata": {
                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbd",
                },
                "spec": {
                  "app": {
                    "props": {
                      "width": "12"
                    }
                  },
                },
                "status": {
                  "content": {
                    "kind": "CardTemplateList",
                    "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                    "metadata": {
                      "uid": "e14d5e2d-1170-4360-9b86-827d527dabbe",
                    },
                    "items": [
                      {
                        "kind": "CardTemplate",
                        "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                        "metadata": {
                          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbf",
                        },
                        "status": {
                          "content": [
                            {
                              "title": "Lorem Ipsum",
                              "content": "Nulla quam lectus, venenatis at nunc nec, suscipit convallis sapien. \nSuspendisse id venenatis orci, a semper ante. \nMauris convallis sagittis tincidunt. \nAenean egestas auctor interdum.",
                              "icon": "server",
                              "color": "red",
                              "tags": "lorem,ipsum",
                              "panel": {
                                title: "This is the title of the panel",
                                description: "This is the panel description",
                                size: "large",
                                type: "form",
                                buttons: [
                                  { label: "Clear", type: "text", action: "reset" },
                                  { label: "Submit", type: "primary", action: "submit" },
                                ],
                                content: {
                                  element: "FormGenerator",
                                  props: { // pass the data to render fields
                                    title: "This is the title of the form",
                                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                                    endpoint: "/testsubmit", // endpoint to call submitting values in POST
                                    prefix: undefined, // "TemplateList" label to connect data list
                                    fieldsEndpoint: "/apis/widgets.ui.krateo.io/formtemplates/fireworksapp"
                                  }
                                }
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              },
              {
                "kind": "Column",
                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                "metadata": {
                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbm",
                },
                "spec": {
                  "app": {
                    "props": {
                      "width": "12"
                    }
                  },
                },
                "status": {
                  "content": {
                    "kind": "CardTemplateList",
                    "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                    "metadata": {
                      "uid": "e14d5e2d-1170-4360-9b86-827d527dabbh",
                    },
                    "items": [
                      {
                        "kind": "CardTemplate",
                        "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                        "metadata": {
                          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbi",
                        },
                        "status": {
                          "content": [
                            {
                              "title": "Lorem Ipsum",
                              "content": "Nulla quam lectus, venenatis at nunc nec, suscipit convallis sapien. \nSuspendisse id venenatis orci, a semper ante. \nMauris convallis sagittis tincidunt. \nAenean egestas auctor interdum.",
                              "color": "blue",
                              "icon": "code-branch",
                              "tags": "lorem,ipsum",
                              "allowedActions": ["remove"],
                              "actions": [{
                                "name": "remove",
                                "verb": "DELETE",
                              }]
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              },
              {
                "kind": "Column",
                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                "metadata": {
                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbg",
                },
                "spec": {
                  "app": {
                    "props": {
                      "width": "12"
                    }
                  },
                },
                "status": {
                  "content": {
                    "items": [
                      {
                        "kind": "ChartPie",
                        "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                        "metadata": {
                          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbq",
                        },
                        "status": {
                          "content": [
                            {
                              title: "Templates",
                              tooltip: "this is a beautiful chart",
                              label: "used",
                              value: 428,
                              total: 695,
                              status: "default"
                            }
                          ]
                        },
                      },
                    ]
                  }
                }
              },
              {
                "kind": "Column",
                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                "metadata": {
                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabb13",
                },
                "spec": {
                  "app": {
                    "props": {
                      "width": "12"
                    }
                  },
                },
                "status": {
                  "content": {
                    "items": [
                      {
                        "kind": "ChartMultipleBars",
                        "apiVersion": "widgets.ui.krateo.io/v1alpha1jh",
                        "metadata": {
                          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbwx4",
                        },
                        "status": {
                          "content": [
                            {
                              title: "Templates Trend",
                              tooltip: "this is a beautiful chart",
                            }
                          ]
                        },
                      },
                    ]
                  }
                }
              },
              {
                "kind": "Column",
                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                "metadata": {
                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabb1",
                },
                "spec": {
                  "app": {
                    "props": {
                      "width": "24"
                    }
                  },
                },
                "status": {
                  "content": {
                    "items": [
                      {
                        "kind": "ChartLine",
                        "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                        "metadata": {
                          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbw",
                        },
                        "status": {
                          "content": [
                            {
                              title: "Templates Trend",
                              tooltip: "this is a beautiful chart",
                            }
                          ]
                        },
                      },
                    ]
                  }
                }
              },
              {
                "kind": "Column",
                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                "metadata": {
                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabb13z",
                },
                "spec": {
                  "app": {
                    "props": {
                      "width": "12"
                    }
                  },
                },
                "status": {
                  "content": {
                    "items": [
                      {
                        "kind": "ChartBars",
                        "apiVersion": "widgets.ui.krateo.io/v1alpha1jh",
                        "metadata": {
                          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbwx3",
                        },
                        "status": {
                          "content": [
                            {
                              title: "Most used Templates",
                              tooltip: "this is a beautiful chart",
                              data: [
                                {
                                  label: "Lorem ipsum 1",
                                  value: "82",
                                  percentage: 23,
                                  color: "normal"
                                },
                                {
                                  label: "Lorem ipsum 2",
                                  value: "124",
                                  percentage: 68,
                                  color: "normal"
                                },
                                {
                                  label: "Lorem ipsum 3",
                                  value: "75",
                                  percentage: 16,
                                  color: "normal"
                                },
                                {
                                  label: "Lorem ipsum 4",
                                  value: "93",
                                  percentage: 43,
                                  color: "normal"
                                },
                                {
                                  label: "Lorem ipsum 5",
                                  value: "93",
                                  percentage: 43,
                                  color: "normal"
                                },
                              ]
                            }
                          ]
                        },
                      },
                    ]
                  }
                }
              },
              {
                "kind": "Column",
                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                "metadata": {
                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabb13z1",
                },
                "spec": {
                  "app": {
                    "props": {
                      "width": "12"
                    }
                  },
                },
                "status": {
                  "content": {
                    "items": [
                      {
                        "kind": "ChartBars",
                        "apiVersion": "widgets.ui.krateo.io/v1alpha1jh",
                        "metadata": {
                          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbwll",
                        },
                        "status": {
                          "content": [
                            {
                              title: "Less used Templates",
                              tooltip: "this is a beautiful chart",
                              data: [
                                {
                                  label: "Lorem ipsum 1",
                                  value: "82",
                                  percentage: 23,
                                  color: "exception"
                                },
                                {
                                  label: "Lorem ipsum 2",
                                  value: "124",
                                  percentage: 68,
                                  color: "exception"
                                },
                                {
                                  label: "Lorem ipsum 3",
                                  value: "75",
                                  percentage: 16,
                                  color: "exception"
                                },
                                {
                                  label: "Lorem ipsum 4",
                                  value: "93",
                                  percentage: 43,
                                  color: "exception"
                                },
                                {
                                  label: "Lorem ipsum 5",
                                  value: "93",
                                  percentage: 43,
                                  color: "exception"
                                },
                              ]
                            }
                          ]
                        },
                      },
                    ]
                  }
                }
              },
            ]
          }
        }
      }
    }

    // templates page
    if (window.location.pathname.indexOf("/templates") > -1) {
      return {
        component: "Tabs",
        content: [
          {
            component: "TabPane",
            props: {
              label: "Charts"
            },
            content: [
              {
                component: "Row",
                content: [
                  {
                    component: "Col",
                    props: 5,
                    content: [
                      {
                        component: "Row",
                        content: [
                          {
                            component: "Col",
                            props:  2,
                            content: [{
                              component: "Widget",
                              element: "ChartPie",
                              props: {
                                title: "Templates",
                                tooltip: "this is a beautiful chart",
                                label: "used",
                                value: 428,
                                total: 695,
                                status: "default"
                              }
                            }],
                          },
                          {
                            component: "Col",
                            props: 2,
                            content: [{
                              component: "Widget",
                              element: "ChartBars",
                              props: {
                                title: "Most used Templates",
                                tooltip: "Lorem ipsum dolor sit amet",
                                data: [
                                  {
                                    label: "Lorem ipsum 1",
                                    value: "82",
                                    percentage: 23,
                                    color: "normal"
                                  },
                                  {
                                    label: "Lorem ipsum 2",
                                    value: "124",
                                    percentage: 68,
                                    color: "normal"
                                  },
                                  {
                                    label: "Lorem ipsum 3",
                                    value: "75",
                                    percentage: 16,
                                    color: "normal"
                                  },
                                  {
                                    label: "Lorem ipsum 4",
                                    value: "93",
                                    percentage: 43,
                                    color: "normal"
                                  },
                                  {
                                    label: "Lorem ipsum 5",
                                    value: "93",
                                    percentage: 43,
                                    color: "normal"
                                  },
                                ]
                              }
                            }],
                          },
                          {
                            component: "Col",
                            props: 2,
                            content: [{
                              component: "Widget",
                              element: "ChartBars",
                              props: {
                                title: "Less used Templates",
                                tooltip: "Lorem ipsum dolor sit amet",
                                data: [
                                  {
                                    label: "Lorem ipsum 1",
                                    value: "82",
                                    percentage: 23,
                                    color: "exception"
                                  },
                                  {
                                    label: "Lorem ipsum 2",
                                    value: "124",
                                    percentage: 68,
                                    color: "exception"
                                  },
                                  {
                                    label: "Lorem ipsum 3",
                                    value: "75",
                                    percentage: 16,
                                    color: "exception"
                                  },
                                  {
                                    label: "Lorem ipsum 4",
                                    value: "93",
                                    percentage: 43,
                                    color: "exception"
                                  },
                                  {
                                    label: "Lorem ipsum 5",
                                    value: "93",
                                    percentage: 43,
                                    color: "exception"
                                  },
                                ]
                              }
                            }],
                          },
                        ],
                      },
                      {
                        component: "Row",
                        content: [
                          {
                            component: "Col",
                            props:  6,
                            content: [{
                              component: "Widget",
                              element: "ChartLine",
                              props: {
                                title: "Templates Trend",
                                tooltip: "this is a beautiful line chart",
                              }
                            }],
                          }
                        ],
                      },
                    ]
                  }
                ]
              }
            ]
          },
          {
            component: "TabPane",
            props: {
              label: "Data"
            },
            content: [
              {
                component:"Row",
                content:[
                  {
                    component:"Col",
                    props: 5,
                    content:[
                        {
                          component:"Toolbar",
                          content:[
                            {
                              component: "Widget",
                              element: "ButtonPanel",
                              props: {
                                button: {
                                  label: "Filters",
                                  icon: "filter",
                                  badge: true,
                                },
                                panel: {
                                  title: "Filters",
                                  description: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet",
                                  size: "default",
                                  content: {
                                    element: "FormGenerator",
                                    props: { // pass the data to render fields
                                      title: "Form Name",
                                      description: "lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.",
                                      endpoint: null, // endpoint to call submitting values in POST
                                      prefix: "TemplateList", // label to connect data list
                                      fields: [
                                        {
                                          name: "title",
                                          type: "text",
                                          label: "Title",
                                          rules: [],
                                          placeholder: "type a title",
                                        },
                                        {
                                          name: "content",
                                          type: "text",
                                          label: "Content",
                                          rules: [],
                                          placeholder: "type a text",
                                        },
                                        {
                                          name: "status",
                                          type: "radioGroup",
                                          label: "Status",
                                          rules: [],
                                          placeholder: "",
                                          extra: {
                                            options: [
                                              {
                                                label: "active",
                                                value: "",
                                              },
                                              {
                                                label: "archived",
                                                value: "archived",
                                              },
                                            ]
                                          }
                                        },
                                        {
                                          name: "date",
                                          type: "datetime",
                                          label: "archived date",
                                          rules: [],
                                          placeholder: "",
                                          initialValue: "",
                                          extra: {
                                            format: "DD MMM YYYY",
                                          }
                                        },
                                      ]
                                    }
                                  }
                                }
                              }
                            },
                            {
                              component: "Widget",
                              element: "ButtonPanel",
                              props: {
                                button: {
                                  label: "Add Template",
                                  icon: "circle-plus",
                                  type: "primary"
                                },
                                panel: {
                                  title: "Add Template",
                                  description: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet",
                                  size: "default",
                                  content: {
                                    element: "FormGenerator",
                                    props: {
                                      title: "Form Name",
                                      description: "lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.",
                                      endpoint: "/createTemplate", // endpoint to call submitting values in POST
                                      prefix: "", // label to connect data list
                                      fields: [
                                        {
                                          name: "endpointType",
                                          type: "select",
                                          label: "Endpoint Type",
                                          required: true,
                                          rules: [],
                                          placeholder: "",
                                          extra: {
                                            options: [
                                              {
                                                label: "lorem ipsum 1",
                                                value: "lorem ipsum 1",
                                              },
                                              {
                                                label: "lorem ipsum 2",
                                                value: "lorem ipsum 2",
                                              },
                                              {
                                                label: "lorem ipsum 3",
                                                value: "lorem ipsum 3",
                                              },
                                            ]
                                          }
                                        },
                                        {
                                          name: "url",
                                          type: "text",
                                          label: "URL",
                                          required: true,
                                          rules: [],
                                          placeholder: "https://",
                                        },

                                      ]
                                    }
                                  }
                                }
                              }
                            }
                          ]
                        },
                        {
                          component:"Widget",
                          element:"DataList",
                          props:{
                              prefix:"TemplateList", // label to connect filters
                              data:[
                                {
                                  element:"CardTemplate",
                                  props:{
                                    id: 1,
                                    icon:"server",
                                    color:"blue",
                                    title:"Lorem Ipsum dolor sit",
                                    status:"",
                                    date:"",
                                    content:"<p>lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>",
                                    tags:"",
                                    actions:[
                                        {
                                          name:"remove",
                                          enabled:true,
                                          path:"/lorem-ipsum",
                                          verb:"DELETE"
                                        }
                                    ]
                                  }
                                },
                                {
                                    element:"CardTemplate",
                                    props:{
                                      id: 2,
                                      icon:"fa-code-branch",
                                      color:"red",
                                      title:"Lorem Ipsum dolor sit",
                                      status:"archived",
                                      date:"Sep 15th 2023 08:15:43",
                                      content:"<p>lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>",
                                      tags:"Lorem ipsum #1,Lorem ipsum #2",
                                      actions:[
                                          {
                                            name:"remove",
                                            enabled:false
                                          }
                                      ]
                                    }
                                },
                                {
                                  element:"CardTemplate",
                                  props:{
                                      id: 3,
                                      icon:"server",
                                      color:"blue",
                                      title:"Lorem Ipsum dolor sit",
                                      status:"",
                                      date:"",
                                      content:"<p>lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>",
                                      tags:"",
                                      actions:[
                                        {
                                            name:"remove",
                                            enabled:true,
                                            path:"/lorem-ipsum",
                                            verb:"DELETE"
                                        }
                                      ]
                                  }
                                },
                              ]
                          }
                        }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }

    // form sample page
    if (window.location.pathname.indexOf("/form") > -1) {
      return {
        "kind": "Row",
        "apiVersion": "layout.ui.krateo.io/v1alpha1",
        "metadata": {
          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbb",
        },
        "status": {
          "content": {
            "kind": "ColumnList",
            "apiVersion": "layout.ui.krateo.io/v1alpha1",
            "metadata": {
              "uid": "e14d5e2d-1170-4360-9b86-827d527dabbc",
            },
            "items": [
              {
                "kind": "Column",
                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                "metadata": {
                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabb13z2",
                },
                "spec": {
                  "app": {
                    "props": {
                      "width": "12"
                    }
                  },
                },
                "status": {
                  "content": {
                    "items": [
                      {
                        "kind": "Button",
                        "apiVersion": "widgets.ui.krateo.io/v1alpha1jh",
                        "metadata": {
                          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbwx1",
                        },
                        "status": {
                          "content": [
                            {
                              label: "Filters",
                              icon: "filter",
                              badge: true,
                              panel: {
                                title: "This is the title of the panel",
                                description: "This is the panel description",
                                size: "large",
                                type: "form",
                                buttons: [
                                  { label: "Clear", type: "text", action: "reset" },
                                  { label: "Submit", type: "primary", action: "submit" },
                                ],
                                content: {
                                  element: "FormGenerator",
                                  props: { // pass the data to render fields
                                    title: "This is the title of the form",
                                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                                    endpoint: "/testsubmit", // endpoint to call submitting values in POST
                                    prefix: undefined, // "TemplateList" label to connect data list
                                    fieldsEndpoint: "/apis/widgets.ui.krateo.io/formtemplates/fireworksapp"
                                  }
                                }
                              }
                            }
                          ]
                        },
                      },
                      {
                        "kind": "Button",
                        "apiVersion": "widgets.ui.krateo.io/v1alpha1jh",
                        "metadata": {
                          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbwx1f",
                        },
                        "status": {
                          "content": [
                            {
                              label: "Go to home",
                              icon: "dashboard",
                              badge: true,
                              route: "/"
                            }
                          ]
                        },
                      },
                    ]
                  }
                }
              },
            ]
          }
        }
      }
    }

    // flow chart sample page
    if (window.location.pathname.indexOf("/flow") > -1) {
      return {
        "kind": "Row",
        "apiVersion": "layout.ui.krateo.io/v1alpha1",
        "metadata": {
          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbbf",
        },
        "status": {
          "content": {
            "kind": "ColumnList",
            "apiVersion": "layout.ui.krateo.io/v1alpha1",
            "metadata": {
              "uid": "e14d5e2d-1170-4360-9b86-827d527dabbcf",
            },
            "items": [
              {
                "kind": "Column",
                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                "metadata": {
                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabb13z2f",
                },
                "spec": {
                  "app": {
                    "props": {
                      "width": "12"
                    }
                  },
                },
                "status": {
                  "content": {
                    "items": [
                      {
                        "kind": "ChartFlow",
                        "apiVersion": "widgets.ui.krateo.io/v1alpha1jh",
                        "metadata": {
                          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbwx1f",
                        },
                        "status": {
                          "content": [{label: "flow chart"}]
                        },
                      },
                    ]
                  }
                }
              },
            ]
          }
        }
      }
    }

    // projects list
    if (window.location.pathname.match(/^\/projects$/g)) {
      return {
        component: "Tabs",
        content: [
          {
            component: "TabPane",
            props: {
              label: "Charts"
            },
            content: [
              {
                component: "Row",
                content: [
                  {
                    component: "Col",
                    props: 5,
                    content: [
                      {
                        component: "Row",
                        content: [
                          {
                            component: "Col",
                            props:  2,
                            content: [{
                              component: "Widget",
                              element: "ChartPie",
                              props: {
                                title: "Projects",
                                tooltip: "this is a beautiful chart",
                                label: "",
                                value: 428,
                                total: 695,
                                status: "default"
                              }
                            }],
                          },
                          {
                            component: "Col",
                            props:  4,
                            content: [{
                              component: "Widget",
                              element: "ChartLine",
                              props: {
                                title: "Projects Trend",
                                tooltip: "this is a beautiful line chart",
                              }
                            }],
                          }
                        ],
                      },
                      {
                        component: "Row",
                        content: [
                          {
                            component: "Col",
                            props: 2,
                            content: [{
                              component: "Widget",
                              element: "ChartBars",
                              props: {
                                title: "Deployments",
                                tooltip: "Lorem ipsum dolor sit amet",
                                data: [
                                  {
                                    label: "Lorem ipsum 1",
                                    value: "82",
                                    percentage: 23,
                                    color: "normal"
                                  },
                                  {
                                    label: "Lorem ipsum 2",
                                    value: "124",
                                    percentage: 68,
                                    color: "normal"
                                  },
                                  {
                                    label: "Lorem ipsum 3",
                                    value: "75",
                                    percentage: 16,
                                    color: "normal"
                                  },
                                  {
                                    label: "Lorem ipsum 4",
                                    value: "93",
                                    percentage: 43,
                                    color: "normal"
                                  },
                                  {
                                    label: "Lorem ipsum 5",
                                    value: "93",
                                    percentage: 43,
                                    color: "normal"
                                  },
                                ]
                              }
                            }],
                          },
                          {
                            component: "Col",
                            props:  4,
                            content: [{
                              component: "Widget",
                              element: "ChartLine",
                              props: {
                                title: "Deployments Trend",
                                tooltip: "this is a beautiful line chart",
                              }
                            }],
                          }
                        ],
                      },
                    ]
                  }
                ]
              }
            ]
          },
          {
            component: "TabPane",
            props: {
              label: "Data"
            },
            content: [
              {
                component:"Row",
                content:[
                  {
                    component:"Col",
                    props: 5,
                    content:[
                        {
                          component:"Toolbar",
                          content:[]
                        },
                        {
                          component:"Widget",
                          element:"DataList",
                          props:{
                              prefix:"ProjectsList", // label to connect filters
                              data:[
                                {
                                  element:"CardTemplate",
                                  props:{
                                    id: 1461651842254,
                                    icon:"server",
                                    color:"blue",
                                    title:"Project #1",
                                    status:"",
                                    date:"",
                                    content:"<p>lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>",
                                    tags:"",
                                    actions:[
                                        {
                                          name:"remove",
                                          enabled:true,
                                          path:"/lorem-ipsum",
                                          verb:"DELETE"
                                        }
                                    ]
                                  }
                                },
                              ]
                          }
                        }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }

    // project details -> deployments list
    if (window.location.pathname.match(/^\/projects\/[0-9]+$/g)) {
      return {
        component:"Row",
        content:[
          {
            component:"Col",
            props: 5,
            content:[
                {
                  component:"Toolbar",
                  content:[
                    {
                      component: "Widget",
                      element: "ButtonPanel",
                      props: {
                        button: {
                          label: "Filters",
                          icon: "filter",
                          badge: true,
                        },
                        panel: {
                          title: "Filters",
                          description: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet",
                          size: "default",
                          content: {
                            element: "FormGenerator",
                            props: { // pass the data to render fields
                              title: "Form Name",
                              description: "lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.",
                              endpoint: null, // endpoint to call submitting values in POST
                              prefix: "TemplateList", // label to connect data list
                              fields: [
                                {
                                  name: "title",
                                  type: "text",
                                  label: "Title",
                                  rules: [],
                                  placeholder: "type a title",
                                },
                                {
                                  name: "content",
                                  type: "text",
                                  label: "Content",
                                  rules: [],
                                  placeholder: "type a text",
                                },
                                {
                                  name: "status",
                                  type: "radioGroup",
                                  label: "Status",
                                  rules: [],
                                  placeholder: "",
                                  extra: {
                                    options: [
                                      {
                                        label: "active",
                                        value: "",
                                      },
                                      {
                                        label: "archived",
                                        value: "archived",
                                      },
                                    ]
                                  }
                                },
                                {
                                  name: "date",
                                  type: "datetime",
                                  label: "archived date",
                                  rules: [],
                                  placeholder: "",
                                  initialValue: "",
                                  extra: {
                                    format: "DD MMM YYYY",
                                  }
                                },
                              ]
                            }
                          }
                        }
                      }
                    },
                    {
                      component: "Widget",
                      element: "ButtonPanel",
                      props: {
                        button: {
                          label: "New Deployment",
                          icon: "circle-plus",
                          type: "primary"
                        },
                        panel: {
                          title: "New Deployment",
                          description: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet",
                          size: "default",
                          content: {
                            element: "FormGenerator",
                            props: {
                              title: "Form Name",
                              description: "lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.",
                              endpoint: "/createDeployment", // endpoint to call submitting values in POST
                              prefix: "", // label to connect data list
                              fields: [
                              ]
                            }
                          }
                        }
                      }
                    }
                  ]
                },
                {
                  component:"Widget",
                  element:"DataList",
                  props:{
                      prefix:"DeploymentList", // label to connect filters
                      data:[
                        {
                          element:"CardTemplate",
                          props:{
                            id: 65461328,
                            icon:"server",
                            color:"blue",
                            title:"Deployment #1",
                            status:"",
                            date:"",
                            content:"<p>lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>",
                            tags:"",
                            actions:[
                                {
                                  name:"remove",
                                  enabled:true,
                                  path:"/lorem-ipsum",
                                  verb:"DELETE"
                                }
                            ]
                          }
                        },
                        {
                            element:"CardTemplate",
                            props:{
                              id: 2,
                              icon:"fa-code-branch",
                              color:"red",
                              title:"Deployment #2",
                              status:"archived",
                              date:"Sep 15th 2023 08:15:43",
                              content:"<p>lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>",
                              tags:"Lorem ipsum #1,Lorem ipsum #2",
                              actions:[
                                  {
                                    name:"remove",
                                    enabled:false
                                  }
                              ]
                            }
                        },
                        {
                          element:"CardTemplate",
                          props:{
                              id: 3,
                              icon:"server",
                              color:"blue",
                              title:"Deployment #3",
                              status:"",
                              date:"",
                              content:"<p>lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>",
                              tags:"",
                              actions:[
                                {
                                    name:"remove",
                                    enabled:true,
                                    path:"/lorem-ipsum",
                                    verb:"DELETE"
                                }
                              ]
                          }
                        },
                      ]
                  }
                }
            ]
          }
        ]
      }
    }

    // deployment details (page with tabs)
    if (window.location.pathname.match(/^\/projects\/[0-9]+\/[0-9]+$/g)) {
      return {
        component: "Tabs",
        content: [
          {
            component: "TabPane",
            props: {
              label: "Overview"
            },
            content: []
          },
          {
            component: "TabPane",
            props: {
              label: "Relations"
            },
            content: []
          },
          {
            component: "TabPane",
            props: {
              label: "Resources"
            },
            content: []
          },
          {
            component: "TabPane",
            props: {
              label: "Documentation"
            },
            content: []
          },
          {
            component: "TabPane",
            props: {
              label: "Kubernetes"
            },
            content: []
          },
          {
            component: "TabPane",
            props: {
              label: "Pipeline"
            },
            content: []
          },
          {
            component: "TabPane",
            props: {
              label: "Events"
            },
            content: []
          },
          {
            component: "TabPane",
            props: {
              label: "Values"
            },
            content: []
          },
          {
            component: "TabPane",
            props: {
              label: "Terminal"
            },
            content: []
          },
          {
            component: "TabPane",
            props: {
              label: "Keptn"
            },
            content: []
          },
        ]
      }
    }

    // BE2FE json
    if (window.location.pathname.indexOf("/test") > -1) {
      return {
        "kind": "Row",
        "apiVersion": "layout.ui.krateo.io/v1alpha1",
        "metadata": {
          "name": "two",
          "namespace": "demo-system",
          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbb",
          "resourceVersion": "238612",
          "generation": 1,
          "creationTimestamp": "2024-01-24T16:30:14Z",
          "annotations": {
            "krateo.io/allowed-verbs": "get,list",
            "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"layout.ui.krateo.io/v1alpha1\",\"kind\":\"Row\",\"metadata\":{\"annotations\":{},\"name\":\"two\",\"namespace\":\"demo-system\"},\"spec\":{\"columnListRef\":[{\"name\":\"plain\",\"namespace\":\"demo-system\"},{\"name\":\"one\",\"namespace\":\"demo-system\"}]}}\n"
          },
          "managedFields": [
            {
              "manager": "kubectl-client-side-apply",
              "operation": "Update",
              "apiVersion": "layout.ui.krateo.io/v1alpha1",
              "time": "2024-01-24T16:30:14Z",
              "fieldsType": "FieldsV1",
              "fieldsV1": {
                "f:metadata": {
                  "f:annotations": {
                    ".": {},
                    "f:kubectl.kubernetes.io/last-applied-configuration": {}
                  }
                },
                "f:spec": {
                  ".": {},
                  "f:columnListRef": {}
                }
              }
            }
          ]
        },
        "spec": {
          "columnListRef": [
            {
              "name": "plain",
              "namespace": "demo-system"
            },
            {
              "name": "one",
              "namespace": "demo-system"
            }
          ]
        },
        "status": {
          "content": {
            "kind": "ColumnList",
            "apiVersion": "layout.ui.krateo.io/v1alpha1",
            "metadata": {},
            "items": [
              {
                "kind": "Column",
                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                "metadata": {
                  "name": "plain",
                  "namespace": "demo-system",
                  "uid": "10223467-3e48-4b30-8215-ffc2a8e1f2bd",
                  "resourceVersion": "238603",
                  "generation": 1,
                  "creationTimestamp": "2024-01-24T16:29:33Z",
                  "annotations": {
                    "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"layout.ui.krateo.io/v1alpha1\",\"kind\":\"Column\",\"metadata\":{\"annotations\":{},\"name\":\"plain\",\"namespace\":\"demo-system\"},\"spec\":{\"app\":{\"props\":{\"width\":\"12\"}},\"cardTemplateListRef\":[{\"name\":\"plain\",\"namespace\":\"demo-system\"}]}}\n"
                  },
                  "managedFields": [
                    {
                      "manager": "kubectl-client-side-apply",
                      "operation": "Update",
                      "apiVersion": "layout.ui.krateo.io/v1alpha1",
                      "time": "2024-01-24T16:29:33Z",
                      "fieldsType": "FieldsV1",
                      "fieldsV1": {
                        "f:metadata": {
                          "f:annotations": {
                            ".": {},
                            "f:kubectl.kubernetes.io/last-applied-configuration": {}
                          }
                        },
                        "f:spec": {
                          ".": {},
                          "f:app": {
                            ".": {},
                            "f:props": {
                              ".": {},
                              "f:width": {}
                            }
                          },
                          "f:cardTemplateListRef": {}
                        }
                      }
                    }
                  ]
                },
                "spec": {
                  "app": {
                    "props": {
                      "width": "16"
                    }
                  },
                  "cardTemplateListRef": [
                    {
                      "name": "plain",
                      "namespace": "demo-system"
                    }
                  ]
                },
                "status": {
                  "content": {
                    "kind": "CardTemplateList",
                    "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                    "metadata": {},
                    "items": [
                      {
                        "kind": "CardTemplate",
                        "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                        "metadata": {
                          "name": "plain",
                          "namespace": "demo-system",
                          "uid": "f8dd79c5-0c25-437c-b67e-c470ed42f27d",
                          "resourceVersion": "238526",
                          "generation": 1,
                          "creationTimestamp": "2024-01-24T16:18:48Z",
                          "annotations": {
                            "krateo.io/allowed-verbs": "get,list",
                            "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"widgets.ui.krateo.io/v1alpha1\",\"kind\":\"CardTemplate\",\"metadata\":{\"annotations\":{},\"name\":\"plain\",\"namespace\":\"demo-system\"},\"spec\":{\"app\":{\"color\":\"red\",\"content\":\"Nulla quam lectus, venenatis at nunc nec, suscipit convallis sapien. \\nSuspendisse id venenatis orci, a semper ante. \\nMauris convallis sagittis tincidunt. \\nAenean egestas auctor interdum.\",\"tags\":\"lorem,ipsum\",\"title\":\"Lorem Ipsum\"}}}\n"
                          },
                          "managedFields": [
                            {
                              "manager": "kubectl-client-side-apply",
                              "operation": "Update",
                              "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                              "time": "2024-01-24T16:18:48Z",
                              "fieldsType": "FieldsV1",
                              "fieldsV1": {
                                "f:metadata": {
                                  "f:annotations": {
                                    ".": {},
                                    "f:kubectl.kubernetes.io/last-applied-configuration": {}
                                  }
                                },
                                "f:spec": {
                                  ".": {},
                                  "f:app": {
                                    ".": {},
                                    "f:color": {},
                                    "f:content": {},
                                    "f:tags": {},
                                    "f:title": {}
                                  }
                                }
                              }
                            }
                          ]
                        },
                        "spec": {
                          "app": {
                            "title": "Lorem Ipsum",
                            "content": "Nulla quam lectus, venenatis at nunc nec, suscipit convallis sapien. \nSuspendisse id venenatis orci, a semper ante. \nMauris convallis sagittis tincidunt. \nAenean egestas auctor interdum.",
                            "color": "red",
                            "tags": "lorem,ipsum"
                          }
                        },
                        "status": {
                          "content": [
                            {
                              "title": "Lorem Ipsum",
                              "content": "Nulla quam lectus, venenatis at nunc nec, suscipit convallis sapien. \nSuspendisse id venenatis orci, a semper ante. \nMauris convallis sagittis tincidunt. \nAenean egestas auctor interdum.",
                              "color": "red",
                              "tags": "lorem,ipsum"
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              },
              {
                "kind": "Column",
                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                "metadata": {
                  "name": "one",
                  "namespace": "demo-system",
                  "uid": "5ec6106f-4c19-4383-8b98-b99f1eba1a3f",
                  "resourceVersion": "238604",
                  "generation": 1,
                  "creationTimestamp": "2024-01-24T16:29:33Z",
                  "annotations": {
                    "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"layout.ui.krateo.io/v1alpha1\",\"kind\":\"Column\",\"metadata\":{\"annotations\":{},\"name\":\"one\",\"namespace\":\"demo-system\"},\"spec\":{\"app\":{\"props\":{\"width\":\"12\"}},\"cardTemplateListRef\":[{\"name\":\"one\",\"namespace\":\"demo-system\"}]}}\n"
                  },
                  "managedFields": [
                    {
                      "manager": "kubectl-client-side-apply",
                      "operation": "Update",
                      "apiVersion": "layout.ui.krateo.io/v1alpha1",
                      "time": "2024-01-24T16:29:33Z",
                      "fieldsType": "FieldsV1",
                      "fieldsV1": {
                        "f:metadata": {
                          "f:annotations": {
                            ".": {},
                            "f:kubectl.kubernetes.io/last-applied-configuration": {}
                          }
                        },
                        "f:spec": {
                          ".": {},
                          "f:app": {
                            ".": {},
                            "f:props": {
                              ".": {},
                              "f:width": {}
                            }
                          },
                          "f:cardTemplateListRef": {}
                        }
                      }
                    }
                  ]
                },
                "spec": {
                  "app": {
                    "props": {
                      "width": "8"
                    }
                  },
                  "cardTemplateListRef": [
                    {
                      "name": "one",
                      "namespace": "demo-system"
                    }
                  ]
                },
                "status": {
                  "content": {
                    "kind": "CardTemplateList",
                    "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                    "metadata": {},
                    "items": [
                      {
                        "kind": "CardTemplate",
                        "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                        "metadata": {
                          "name": "one",
                          "namespace": "demo-system",
                          "uid": "a9560ec8-53ff-487c-9d29-d902533ed435",
                          "resourceVersion": "238527",
                          "generation": 1,
                          "creationTimestamp": "2024-01-24T16:18:48Z",
                          "annotations": {
                            "krateo.io/allowed-verbs": "get,list",
                            "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"widgets.ui.krateo.io/v1alpha1\",\"kind\":\"CardTemplate\",\"metadata\":{\"annotations\":{},\"name\":\"one\",\"namespace\":\"demo-system\"},\"spec\":{\"api\":[{\"endpointRef\":{\"name\":\"typicode-endpoint\",\"namespace\":\"demo-system\"},\"headers\":[\"Accept: application/json\"],\"name\":\"api1\",\"path\":\"/todos/1\",\"verb\":\"GET\"},{\"dependOn\":\"api1\",\"endpointRef\":{\"name\":\"typicode-endpoint\",\"namespace\":\"demo-system\"},\"headers\":[\"Accept: application/json\"],\"name\":\"api2\",\"path\":\"${ \\\"/todos/\\\" + (.api1.id|tostring) +  \\\"/comments\\\" }\",\"verb\":\"GET\"}],\"app\":{\"actions\":[{\"endpointRef\":{\"name\":\"typicode-endpoint\",\"namespace\":\"demo-system\"},\"name\":\"view\",\"path\":\"${ \\\"/todos/1/comments/\\\" + (.api2.items[0].id|tostring) }\"}],\"content\":\"${ .api2.items[0].body }\",\"title\":\"${ .api2.items[0] | (.name  + \\\" -\\u003e \\\" + .email) }\"}}}\n"
                          },
                          "managedFields": [
                            {
                              "manager": "kubectl-client-side-apply",
                              "operation": "Update",
                              "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                              "time": "2024-01-24T16:18:48Z",
                              "fieldsType": "FieldsV1",
                              "fieldsV1": {
                                "f:metadata": {
                                  "f:annotations": {
                                    ".": {},
                                    "f:kubectl.kubernetes.io/last-applied-configuration": {}
                                  }
                                },
                                "f:spec": {
                                  ".": {},
                                  "f:api": {},
                                  "f:app": {
                                    ".": {},
                                    "f:actions": {},
                                    "f:content": {},
                                    "f:title": {}
                                  }
                                }
                              }
                            }
                          ]
                        },
                        "spec": {
                          "app": {
                            "title": "${ .api2.items[0] | (.name  + \" -\u003e \" + .email) }",
                            "content": "${ .api2.items[0].body }",
                            "actions": [
                              {
                                "name": "view",
                                "path": "${ \"/todos/1/comments/\" + (.api2.items[0].id|tostring) }",
                                "verb": "GET",
                                "endpointRef": {
                                  "name": "typicode-endpoint",
                                  "namespace": "demo-system"
                                }
                              }
                            ]
                          },
                          "api": [
                            {
                              "name": "api1",
                              "path": "/todos/1",
                              "verb": "GET",
                              "headers": [
                                "Accept: application/json"
                              ],
                              "endpointRef": {
                                "name": "typicode-endpoint",
                                "namespace": "demo-system"
                              }
                            },
                            {
                              "name": "api2",
                              "path": "${ \"/todos/\" + (.api1.id|tostring) +  \"/comments\" }",
                              "verb": "GET",
                              "headers": [
                                "Accept: application/json"
                              ],
                              "endpointRef": {
                                "name": "typicode-endpoint",
                                "namespace": "demo-system"
                              },
                              "dependOn": "api1"
                            }
                          ]
                        },
                        "status": {
                          "content": [
                            {
                              "title": "id labore ex et quam laborum -\u003e Eliseo@gardner.biz",
                              "content": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
                              "actions": [
                                {
                                  "name": "view",
                                  "path": "/todos/1/comments/1",
                                  "verb": "GET",
                                  "endpointRef": {
                                    "name": "typicode-endpoint",
                                    "namespace": "demo-system"
                                  }
                                }
                              ],
                              "allowedActions": [
                                "view"
                              ]
                            }
                          ]
                        }
                      },
                      {
                        "kind": "CardTemplate",
                        "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                        "metadata": {
                          "name": "one",
                          "namespace": "demo-system",
                          "uid": "a9560ec8-53ff-487c-9d29-d902533ed435",
                          "resourceVersion": "238527",
                          "generation": 1,
                          "creationTimestamp": "2024-01-24T16:18:48Z",
                          "annotations": {
                            "krateo.io/allowed-verbs": "get,list",
                            "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"widgets.ui.krateo.io/v1alpha1\",\"kind\":\"CardTemplate\",\"metadata\":{\"annotations\":{},\"name\":\"one\",\"namespace\":\"demo-system\"},\"spec\":{\"api\":[{\"endpointRef\":{\"name\":\"typicode-endpoint\",\"namespace\":\"demo-system\"},\"headers\":[\"Accept: application/json\"],\"name\":\"api1\",\"path\":\"/todos/1\",\"verb\":\"GET\"},{\"dependOn\":\"api1\",\"endpointRef\":{\"name\":\"typicode-endpoint\",\"namespace\":\"demo-system\"},\"headers\":[\"Accept: application/json\"],\"name\":\"api2\",\"path\":\"${ \\\"/todos/\\\" + (.api1.id|tostring) +  \\\"/comments\\\" }\",\"verb\":\"GET\"}],\"app\":{\"actions\":[{\"endpointRef\":{\"name\":\"typicode-endpoint\",\"namespace\":\"demo-system\"},\"name\":\"view\",\"path\":\"${ \\\"/todos/1/comments/\\\" + (.api2.items[0].id|tostring) }\"}],\"content\":\"${ .api2.items[0].body }\",\"title\":\"${ .api2.items[0] | (.name  + \\\" -\\u003e \\\" + .email) }\"}}}\n"
                          },
                          "managedFields": [
                            {
                              "manager": "kubectl-client-side-apply",
                              "operation": "Update",
                              "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                              "time": "2024-01-24T16:18:48Z",
                              "fieldsType": "FieldsV1",
                              "fieldsV1": {
                                "f:metadata": {
                                  "f:annotations": {
                                    ".": {},
                                    "f:kubectl.kubernetes.io/last-applied-configuration": {}
                                  }
                                },
                                "f:spec": {
                                  ".": {},
                                  "f:api": {},
                                  "f:app": {
                                    ".": {},
                                    "f:actions": {},
                                    "f:content": {},
                                    "f:title": {}
                                  }
                                }
                              }
                            }
                          ]
                        },
                        "spec": {
                          "app": {
                            "title": "${ .api2.items[0] | (.name  + \" -\u003e \" + .email) }",
                            "content": "${ .api2.items[0].body }",
                            "actions": [
                              {
                                "name": "view",
                                "path": "${ \"/todos/1/comments/\" + (.api2.items[0].id|tostring) }",
                                "verb": "GET",
                                "endpointRef": {
                                  "name": "typicode-endpoint",
                                  "namespace": "demo-system"
                                }
                              }
                            ]
                          },
                          "api": [
                            {
                              "name": "api1",
                              "path": "/todos/1",
                              "verb": "GET",
                              "headers": [
                                "Accept: application/json"
                              ],
                              "endpointRef": {
                                "name": "typicode-endpoint",
                                "namespace": "demo-system"
                              }
                            },
                            {
                              "name": "api2",
                              "path": "${ \"/todos/\" + (.api1.id|tostring) +  \"/comments\" }",
                              "verb": "GET",
                              "headers": [
                                "Accept: application/json"
                              ],
                              "endpointRef": {
                                "name": "typicode-endpoint",
                                "namespace": "demo-system"
                              },
                              "dependOn": "api1"
                            }
                          ]
                        },
                        "status": {
                          "content": [
                            {
                              "title": "id labore ex et quam laborum -\u003e Eliseo@gardner.biz",
                              "content": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
                              "actions": [
                                {
                                  "name": "view",
                                  "path": "/todos/1/comments/1",
                                  "verb": "GET",
                                  "endpointRef": {
                                    "name": "typicode-endpoint",
                                    "namespace": "demo-system"
                                  }
                                }
                              ],
                              "allowedActions": [
                                "view"
                              ]
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              }
            ]
          }
        }
      }
    }
  }

  const getColProps = (size) => {
    if (isNaN(size)) {
      return {xs: 24, md: 24}
    } else {
      return {xs: 24, md: parseInt(size)}
    }
  }

  const getContent = useCallback((data, i): ReactElement => {
    const renderComponent = (data, index) => {
      switch (data.kind) {
        case "Row":
          return <Row key={data.metadata.uid} className={styles.row}>{ getContent(data.status.content.items, index+1) }</Row>
        case "Column":
          return <Col key={data.metadata.uid} { ...getColProps(data.spec.app.props.width) } className={styles.col}>{ getContent(data.status.content.items, index+1) }</Col>
        case "Tabs":
          return <Tabs key={data.metadata.uid} {...data.spec.app.props} className={styles.tabs}>{ getContent(data.status.content.items, index+1) }</Tabs>
        case "TabPane":
          return <TabPane key={data.metadata.uid} tab={data.spec.app.props.label} className={styles.tabpane}>{ getContent(data.status.content.items, index+1) }</TabPane>
        case "Toolbar":
          return <Toolbar key={data.metadata.uid}>{ getContent(data.status.content.items, index+1) }</Toolbar>
        default:
          if (data.apiVersion?.indexOf("widgets") === 0) {
            const Component = widgets[data.kind];
            return data.status.content.map((el, i) => <Component key={`widget_${data.metadata.uid}_$${i}`} {...el} />)
          } else {
            // null -> exit recoursive loop
            return <></>
          }
      }
    }

    // recoursive function to scan page definition json
    // data is the array of elements, root is an object
    if (!data.length) {
      // root element
      return renderComponent(data, i);
    } else {
      return data.map((el, index) => renderComponent(el, index));
    }
  }, []);

  // get data by API
  const getContentPage = () => {
    if ((window.location.pathname === "/") || 
        (window.location.pathname === "/form") || 
        (window.location.pathname === "/flow")
      ) {
      // mock data for some pages
      const response = fetchPage(clientId, endpoint);
      console.log("use mock", window.location.pathname)
      return getContent(response, 1);
    } else if (data && isSuccess) {
      console.log("use data")
      return getContent(data, 1);
    } else {
      return <></>
    }
  }

  return (
    <section className={styles.page}>
      {
        isLoading && <Skeleton />
      }
      { (isSuccess || isError) && getContentPage() }
    </section>
  );
}

export default Page;
