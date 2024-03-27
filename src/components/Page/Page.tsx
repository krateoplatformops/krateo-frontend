import { PageType } from "./type";
import styles from "./styles.module.scss";
import Skeleton from "../Skeleton/Skeleton";
import { useGetContentQuery } from "../../features/common/commonApiSlice";
import useParseData from "../../hooks/useParseData";

const Page = ({clientId, endpoint}: PageType) => {
  const ls = localStorage.getItem("user");
  const username = ls && JSON.parse(ls)?.user.username;
  const group = ls && JSON.parse(ls)?.groups[0];
  const {data, isLoading, isSuccess, isError} = useGetContentQuery({endpoint, username, group});
  const [getContent] = useParseData()

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
                        "kind": "Panel",
                        "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                        "metadata": {
                          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovp1",
                        },
                        "status": {
                          "content": [
                            {
                              "title": "Templates",
                              "content": {
                                "kind": "ChartPie",
                                "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                "metadata": {
                                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbq",
                                },
                                "status": {
                                  "content": [
                                    {
                                      label: "used",
                                      value: 428,
                                      total: 695,
                                      status: "default"
                                    }
                                  ]
                                },
                              },
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
                        "kind": "Panel",
                        "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                        "metadata": {
                          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovp1",
                        },
                        "status": {
                          "content": [
                            {
                              "title": "Templates trend",
                              "content": {
                                "kind": "ChartLine",
                                "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                "metadata": {
                                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbwdt1",
                                },
                                "status": {
                                  "content": [{}]
                                },
                              },
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

    // projects list
    if (window.location.pathname.match(/^\/projects$/g)) {
      return {
        "kind": "Tabs",
        "apiVersion": "layout.ui.krateo.io/v1alpha1",
        "metadata": {
          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbbt1",
        },
        "status": {
          "content": {
            "kind": "TabList",
            "apiVersion": "layout.ui.krateo.io/v1alpha1",
            "metadata": {
              "uid": "e14d5e2d-1170-4360-9b86-827d527dabbct2",
            },
            "items": [
              {
                "kind": "TabPane",
                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                "metadata": {
                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbdt3",
                },
                "spec": {
                  "app": {
                    "props": {
                      "label": "Chart"
                    }
                  },
                },
                "status": {
                  "content": {
                    "items": [
                      {
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
                                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbg",
                                },
                                "spec": {
                                  "app": {
                                    "props": {
                                      "width": "8"
                                    }
                                  },
                                },
                                "status": {
                                  "content": {
                                    "items": [
                                      {
                                        "kind": "Panel",
                                        "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                        "metadata": {
                                          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovp1",
                                        },
                                        "status": {
                                          "content": [
                                            {
                                              "title": "Projects",
                                              "content": {
                                                "kind": "ChartPie",
                                                "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                "metadata": {
                                                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbq",
                                                },
                                                "status": {
                                                  "content": [
                                                    {
                                                      label: "used",
                                                      value: 428,
                                                      total: 695,
                                                      status: "default"
                                                    }
                                                  ]
                                                },
                                              },
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
                                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabb1",
                                },
                                "spec": {
                                  "app": {
                                    "props": {
                                      "width": "16"
                                    }
                                  },
                                },
                                "status": {
                                  "content": {
                                    "items": [
                                      {
                                        "kind": "Panel",
                                        "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                        "metadata": {
                                          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovp1",
                                        },
                                        "status": {
                                          "content": [
                                            {
                                              "title": "Projects trend",
                                              "content": {
                                                "kind": "ChartLine",
                                                "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                "metadata": {
                                                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbw",
                                                },
                                                "status": {
                                                  "content": [{}]
                                                },
                                              },
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
                                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabb13",
                                },
                                "spec": {
                                  "app": {
                                    "props": {
                                      "width": "8"
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
                                              title: "Deployments",
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
                                      "width": "16"
                                    }
                                  },
                                },
                                "status": {
                                  "content": {
                                    "items": [
                                      {
                                        "kind": "Panel",
                                        "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                        "metadata": {
                                          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovp1",
                                        },
                                        "status": {
                                          "content": [
                                            {
                                              "title": "Deployment trend",
                                              "content": {
                                                "kind": "ChartLine",
                                                "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                "metadata": {
                                                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbwdt1",
                                                },
                                                "status": {
                                                  "content": [{}]
                                                },
                                              },
                                            }
                                          ]
                                        }
                                      }
                                    ]
                                  }
                                }
                              },
                            ]
                          }
                        }
                      }
                    ]
                  }
                }
              },
              {
                "kind": "TabPane",
                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                "metadata": {
                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbdt9",
                },
                "spec": {
                  "app": {
                    "props": {
                      "label": "Data"
                    }
                  },
                },
                "status": {
                  "content": {
                    "items": [
                      {
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
                                      "width": "24"
                                    }
                                  },
                                },
                                "status": {
                                  "content": {
                                    "items": [
                                      {
                                        "kind": "Toolbar",
                                        "apiVersion": "layout.ui.krateo.io/v1alpha1",
                                        "metadata": {
                                          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbettb1",
                                        },
                                        "status": {
                                          "content": {
                                            "items": [
                                              {
                                                "kind": "Button",
                                                "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                "metadata": {
                                                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1",
                                                },
                                                "status": {
                                                  "content": [
                                                    {
                                                      label: "Filters",
                                                      icon: "filter",
                                                      badge: true,
                                                      panel: {
                                                        title: "Filters",
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
                                                            endpoint: undefined,
                                                            prefix: "ProjectList",
                                                            fieldsEndpoint: "/apis/widgets.ui.krateo.io/formtemplates/fireworksapp"
                                                          }
                                                        }
                                                      }
                                                    }
                                                  ]
                                                }
                                              },
                                              {
                                                "kind": "Button",
                                                "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                "metadata": {
                                                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb2",
                                                },
                                                "status": {
                                                  "content": [
                                                    {
                                                      label: "New Project",
                                                      icon: "plus",
                                                      badge: false,
                                                      type: "primary",
                                                      panel: {
                                                        title: "New Project",
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
                                              },
                                              {
                                                "kind": "Button",
                                                "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                "metadata": {
                                                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb2",
                                                },
                                                "status": {
                                                  "content": [
                                                    {
                                                      label: "What's a project?",
                                                      type: "link",
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
                              },
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
                                              "title": "Project #1",
                                              "content": "Nulla quam lectus, venenatis at nunc nec, suscipit convallis sapien. \nSuspendisse id venenatis orci, a semper ante. \nMauris convallis sagittis tincidunt. \nAenean egestas auctor interdum.",
                                              "icon": "server",
                                              "color": "red",
                                              "tags": "lorem,ipsum",
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
                                              "title": "Project #2",
                                              "content": "Nulla quam lectus, venenatis at nunc nec, suscipit convallis sapien. \nSuspendisse id venenatis orci, a semper ante. \nMauris convallis sagittis tincidunt. \nAenean egestas auctor interdum.",
                                              "color": "blue",
                                              "icon": "code-branch",
                                              "tags": "lorem,ipsum",
                                              "route": "/projects/12345",
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
                                              "title": "Project #3",
                                              "content": "Nulla quam lectus, venenatis at nunc nec, suscipit convallis sapien. \nSuspendisse id venenatis orci, a semper ante. \nMauris convallis sagittis tincidunt. \nAenean egestas auctor interdum.",
                                              "icon": "server",
                                              "color": "blue",
                                              "tags": "lorem,ipsum",
                                              "route": "/projects/12345",
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
                                              "title": "Project #4",
                                              "content": "Nulla quam lectus, venenatis at nunc nec, suscipit convallis sapien. \nSuspendisse id venenatis orci, a semper ante. \nMauris convallis sagittis tincidunt. \nAenean egestas auctor interdum.",
                                              "color": "blue",
                                              "icon": "code-branch",
                                              "tags": "lorem,ipsum",
                                              "route": "/projects/12345",
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
                            ]
                          }
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

    // project details -> deployments list
    if (window.location.pathname.match(/^\/projects\/[0-9]+$/g)) {
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
                      "width": "24"
                    }
                  },
                },
                "status": {
                  "content": {
                    "items": [
                      {
                        "kind": "Toolbar",
                        "apiVersion": "layout.ui.krateo.io/v1alpha1",
                        "metadata": {
                          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbettb1",
                        },
                        "status": {
                          "content": {
                            "items": [
                              {
                                "kind": "Button",
                                "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                "metadata": {
                                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1",
                                },
                                "status": {
                                  "content": [
                                    {
                                      label: "Filters",
                                      icon: "filter",
                                      badge: true,
                                      panel: {
                                        title: "Filters",
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
                                            endpoint: undefined,
                                            prefix: "ProjectList",
                                            fieldsEndpoint: "/apis/widgets.ui.krateo.io/formtemplates/fireworksapp"
                                          }
                                        }
                                      }
                                    }
                                  ]
                                }
                              },
                              {
                                "kind": "Button",
                                "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                "metadata": {
                                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb2",
                                },
                                "status": {
                                  "content": [
                                    {
                                      label: "New Deployment",
                                      icon: "plus",
                                      badge: false,
                                      type: "primary",
                                      panel: {
                                        title: "New Deployment",
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
                              },
                              {
                                "kind": "Button",
                                "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                "metadata": {
                                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb2",
                                },
                                "status": {
                                  "content": [
                                    {
                                      label: "What's a deployment?",
                                      type: "link",
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
              },
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
                              "title": "Deployment #1",
                              "content": "Nulla quam lectus, venenatis at nunc nec, suscipit convallis sapien. \nSuspendisse id venenatis orci, a semper ante. \nMauris convallis sagittis tincidunt. \nAenean egestas auctor interdum.",
                              "icon": "server",
                              "color": "red",
                              "tags": "lorem,ipsum",
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
                              "title": "Deployment #2",
                              "content": "Nulla quam lectus, venenatis at nunc nec, suscipit convallis sapien. \nSuspendisse id venenatis orci, a semper ante. \nMauris convallis sagittis tincidunt. \nAenean egestas auctor interdum.",
                              "color": "blue",
                              "icon": "code-branch",
                              "tags": "lorem,ipsum",
                              "route": "/projects/12345/67890",
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
                              "title": "Deployment #3",
                              "content": "Nulla quam lectus, venenatis at nunc nec, suscipit convallis sapien. \nSuspendisse id venenatis orci, a semper ante. \nMauris convallis sagittis tincidunt. \nAenean egestas auctor interdum.",
                              "icon": "server",
                              "color": "blue",
                              "tags": "lorem,ipsum",
                              "route": "/projects/12345/67890",
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
                              "title": "Deployment #4",
                              "content": "Nulla quam lectus, venenatis at nunc nec, suscipit convallis sapien. \nSuspendisse id venenatis orci, a semper ante. \nMauris convallis sagittis tincidunt. \nAenean egestas auctor interdum.",
                              "color": "blue",
                              "icon": "code-branch",
                              "tags": "lorem,ipsum",
                              "route": "/projects/12345/67890",
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
            ]
          }
        }
      }
    }

    // deployment details (page with tabs)
    if (window.location.pathname.match(/^\/projects\/[0-9]+\/[0-9]+$/g)) {
      return {
        "kind": "Tabs",
        "apiVersion": "layout.ui.krateo.io/v1alpha1",
        "metadata": {
          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbbt1",
        },
        "status": {
          "content": {
            "kind": "TabList",
            "apiVersion": "layout.ui.krateo.io/v1alpha1",
            "metadata": {
              "uid": "e14d5e2d-1170-4360-9b86-827d527dabbct2",
            },
            "items": [
              {
                "kind": "TabPane",
                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                "metadata": {
                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbdt31",
                },
                "spec": {
                  "app": {
                    "props": {
                      "label": "Overview"
                    }
                  },
                },
                "status": {
                  "content": {
                    "items": [
                      {
                        "kind": "Row",
                        "apiVersion": "layout.ui.krateo.io/v1alpha1",
                        "metadata": {
                          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbbov1",
                        },
                        "status": {
                          "content": {
                            "kind": "ColumnList",
                            "apiVersion": "layout.ui.krateo.io/v1alpha1",
                            "metadata": {
                              "uid": "e14d5e2d-1170-4360-9b86-827d527dabbcov2",
                            },
                            "items": [
                              {
                                "kind": "Column",
                                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                                "metadata": {
                                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbdov3",
                                },
                                "spec": {
                                  "app": {
                                    "props": {
                                      "width": "6"
                                    }
                                  },
                                },
                                "status": {
                                  "content": {
                                    "items": [
                                      {
                                        "kind": "Panel",
                                        "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                        "metadata": {
                                          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovp1",
                                        },
                                        "status": {
                                          "content": [
                                            {
                                              "title": "Overview",
                                              "content": {
                                                "kind": "Paragraph",
                                                "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                "metadata": {
                                                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpg1",
                                                },
                                                "spec": {
                                                  "app": {
                                                    "props": {
                                                      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus semper eget ipsum quis bibendum. Vivamus ut diam eget augue bibendum consequat in pulvinar ligula. Donec cursus aliquet lacinia. Proin elit erat, imperdiet at varius sed, ultrices lacinia tellus. Cras libero risus, egestas ac nibh id, fringilla commodo urna."
                                                    }
                                                  },
                                                },
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
                                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbdov3556",
                                },
                                "spec": {
                                  "app": {
                                    "props": {
                                      "width": "18"
                                    }
                                  },
                                },
                                "status": {
                                  "content": {
                                    "items": [
                                      {
                                        "kind": "Panel",
                                        "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                        "metadata": {
                                          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovp155",
                                        },
                                        "status": {
                                          "content": [
                                            {
                                              "title": "Links",
                                              "content": [
                                                {
                                                  "kind": "RichElement",
                                                  "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                  "metadata": {
                                                    "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpg1552",
                                                  },
                                                  "spec": {
                                                    "app": {
                                                      "props": {
                                                        "icon": "server",
                                                        "color": "blue",
                                                        "description": "#1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus semper eget ipsum quis bibendum. Vivamus ut diam eget augue bibendum consequat in pulvinar ligula. Donec cursus aliquet lacinia. Proin elit erat, imperdiet at varius sed, ultrices lacinia tellus. Cras libero risus, egestas ac nibh id, fringilla commodo urna."
                                                      }
                                                    },
                                                  },
                                                },
                                                {
                                                  "kind": "RichElement",
                                                  "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                  "metadata": {
                                                    "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpg15529",
                                                  },
                                                  "spec": {
                                                    "app": {
                                                      "props": {
                                                        "icon": "server",
                                                        "color": "blue",
                                                        "description": "#2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus semper eget ipsum quis bibendum. Vivamus ut diam eget augue bibendum consequat in pulvinar ligula. Donec cursus aliquet lacinia. Proin elit erat, imperdiet at varius sed, ultrices lacinia tellus. Cras libero risus, egestas ac nibh id, fringilla commodo urna."
                                                      }
                                                    },
                                                  },
                                                },
                                                {
                                                  "kind": "RichElement",
                                                  "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                  "metadata": {
                                                    "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpg155234",
                                                  },
                                                  "spec": {
                                                    "app": {
                                                      "props": {
                                                        "icon": "code-branch",
                                                        "color": "blue",
                                                        "description": "#3 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus semper eget ipsum quis bibendum. Vivamus ut diam eget augue bibendum consequat in pulvinar ligula. Donec cursus aliquet lacinia. Proin elit erat, imperdiet at varius sed, ultrices lacinia tellus. Cras libero risus, egestas ac nibh id, fringilla commodo urna."
                                                      }
                                                    },
                                                  },
                                                },
                                                {
                                                  "kind": "RichElement",
                                                  "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                  "metadata": {
                                                    "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpg15529246",
                                                  },
                                                  "spec": {
                                                    "app": {
                                                      "props": {
                                                        "icon": "code-branch",
                                                        "color": "red",
                                                        "description": "#4 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus semper eget ipsum quis bibendum. Vivamus ut diam eget augue bibendum consequat in pulvinar ligula. Donec cursus aliquet lacinia. Proin elit erat, imperdiet at varius sed, ultrices lacinia tellus. Cras libero risus, egestas ac nibh id, fringilla commodo urna."
                                                      }
                                                    },
                                                  },
                                                }
                                              ]
                                            }
                                          ]
                                        }
                                      }
                                    ]
                                  }
                                }
                              },
                            ]
                          }
                        }
                      }
                    ]
                  }
                }
              },
              {
                "kind": "TabPane",
                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                "metadata": {
                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbdt32",
                },
                "spec": {
                  "app": {
                    "props": {
                      "label": "Relations"
                    }
                  },
                },
                "status": {
                  "content": {
                    "items": [
                    ]
                  }
                }
              },
              {
                "kind": "TabPane",
                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                "metadata": {
                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbdt33",
                },
                "spec": {
                  "app": {
                    "props": {
                      "label": "Resources"
                    }
                  },
                },
                "status": {
                  "content": {
                    "items": [
                    ]
                  }
                }
              },
              {
                "kind": "TabPane",
                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                "metadata": {
                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbdt34",
                },
                "spec": {
                  "app": {
                    "props": {
                      "label": "Documentation"
                    }
                  },
                },
                "status": {
                  "content": {
                    "items": [
                    ]
                  }
                }
              },
              {
                "kind": "TabPane",
                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                "metadata": {
                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbdt35",
                },
                "spec": {
                  "app": {
                    "props": {
                      "label": "Kubernetes"
                    }
                  },
                },
                "status": {
                  "content": {
                    "items": [
                    ]
                  }
                }
              },
              {
                "kind": "TabPane",
                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                "metadata": {
                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbdt36",
                },
                "spec": {
                  "app": {
                    "props": {
                      "label": "Pipelines"
                    }
                  },
                },
                "status": {
                  "content": {
                    "items": [
                      {
                        "kind": "Row",
                        "apiVersion": "layout.ui.krateo.io/v1alpha1",
                        "metadata": {
                          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbbov1003",
                        },
                        "status": {
                          "content": {
                            "kind": "ColumnList",
                            "apiVersion": "layout.ui.krateo.io/v1alpha1",
                            "metadata": {
                              "uid": "e14d5e2d-1170-4360-9b86-827d527dabbcov2004",
                            },
                            "items": [
                              {
                                "kind": "Column",
                                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                                "metadata": {
                                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbdov3005",
                                },
                                "spec": {
                                  "app": {
                                    "props": {
                                      "width": "6"
                                    }
                                  },
                                },
                                "status": {
                                  "content": {
                                    "items": [
                                      {
                                        "kind": "Panel",
                                        "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                        "metadata": {
                                          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovp1006",
                                        },
                                        "status": {
                                          "content": [
                                            {
                                              "title": "Pipelines",
                                              "content": [
                                                {
                                                  "kind": "Button",
                                                  "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                  "metadata": {
                                                    "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovp1006b1",
                                                  },
                                                  "spec": {
                                                    "app": {
                                                      "props": {
                                                        "label": "Pipeline #1",
                                                        "type": "link",
                                                        "icon": "gears",
                                                        "prefix": "pipelines",
                                                        "content": [
                                                          {
                                                            "kind": "Panel",
                                                            "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                            "metadata": {
                                                              "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovp1006b1c1",
                                                            },
                                                            "status": {
                                                              "content": [
                                                                {
                                                                  "title": "Pipeline #1",
                                                                  "content": [
                                                                    {
                                                                      "kind": "Row",
                                                                      "apiVersion": "layout.ui.krateo.io/v1alpha1",
                                                                      "metadata": {
                                                                        "uid": "e14d5e2d-1170-4360-9b86-827d527dabbbov1003r1",
                                                                      },
                                                                      "status": {
                                                                        "content": {
                                                                          "kind": "ColumnList",
                                                                          "apiVersion": "layout.ui.krateo.io/v1alpha1",
                                                                          "metadata": {
                                                                            "uid": "e14d5e2d-1170-4360-9b86-827d527dabbcov2004c1",
                                                                          },
                                                                          "items": [
                                                                            {
                                                                              "kind": "Column",
                                                                              "apiVersion": "layout.ui.krateo.io/v1alpha1",
                                                                              "metadata": {
                                                                                "uid": "e14d5e2d-1170-4360-9b86-827d527dabbdov3005c2",
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
                                                                                            label: "used",
                                                                                            value: 428,
                                                                                            total: 695,
                                                                                            status: "default"
                                                                                          }
                                                                                        ]
                                                                                      },
                                                                                    },
                                                                                    {
                                                                                      "kind": "ChartLine",
                                                                                      "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                                                      "metadata": {
                                                                                        "uid": "e14d5e2d-1170-4360-9b86-827d527dabbw",
                                                                                      },
                                                                                      "status": {
                                                                                        "content": [{
                                                                                          "hideAxis": true,
                                                                                        }]
                                                                                      },
                                                                                    }
                                                                                  ]
                                                                                }
                                                                              }
                                                                            },
                                                                            {
                                                                              "kind": "Column",
                                                                              "apiVersion": "layout.ui.krateo.io/v1alpha1",
                                                                              "metadata": {
                                                                                "uid": "e14d5e2d-1170-4360-9b86-827d527dabbdov3005c22",
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
                                                                                      "kind": "RichElement",
                                                                                      "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                                                      "metadata": {
                                                                                        "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpg1552",
                                                                                      },
                                                                                      "spec": {
                                                                                        "app": {
                                                                                          "props": {
                                                                                            "icon": "server",
                                                                                            "color": "blue",
                                                                                            "description": "#1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus semper eget ipsum quis bibendum. Vivamus ut diam eget augue bibendum consequat in pulvinar ligula. Donec cursus aliquet lacinia. Proin elit erat, imperdiet at varius sed, ultrices lacinia tellus. Cras libero risus, egestas ac nibh id, fringilla commodo urna."
                                                                                          }
                                                                                        },
                                                                                      },
                                                                                    },
                                                                                    {
                                                                                      "kind": "RichElement",
                                                                                      "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                                                      "metadata": {
                                                                                        "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpg15529",
                                                                                      },
                                                                                      "spec": {
                                                                                        "app": {
                                                                                          "props": {
                                                                                            "icon": "server",
                                                                                            "color": "blue",
                                                                                            "description": "#2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus semper eget ipsum quis bibendum. Vivamus ut diam eget augue bibendum consequat in pulvinar ligula. Donec cursus aliquet lacinia. Proin elit erat, imperdiet at varius sed, ultrices lacinia tellus. Cras libero risus, egestas ac nibh id, fringilla commodo urna."
                                                                                          }
                                                                                        },
                                                                                      },
                                                                                    },
                                                                                    {
                                                                                      "kind": "RichElement",
                                                                                      "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                                                      "metadata": {
                                                                                        "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpg155234",
                                                                                      },
                                                                                      "spec": {
                                                                                        "app": {
                                                                                          "props": {
                                                                                            "icon": "code-branch",
                                                                                            "color": "blue",
                                                                                            "description": "#3 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus semper eget ipsum quis bibendum. Vivamus ut diam eget augue bibendum consequat in pulvinar ligula. Donec cursus aliquet lacinia. Proin elit erat, imperdiet at varius sed, ultrices lacinia tellus. Cras libero risus, egestas ac nibh id, fringilla commodo urna."
                                                                                          }
                                                                                        },
                                                                                      },
                                                                                    },
                                                                                    {
                                                                                      "kind": "RichElement",
                                                                                      "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                                                      "metadata": {
                                                                                        "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpg15529246",
                                                                                      },
                                                                                      "spec": {
                                                                                        "app": {
                                                                                          "props": {
                                                                                            "icon": "code-branch",
                                                                                            "color": "red",
                                                                                            "description": "#4 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus semper eget ipsum quis bibendum. Vivamus ut diam eget augue bibendum consequat in pulvinar ligula. Donec cursus aliquet lacinia. Proin elit erat, imperdiet at varius sed, ultrices lacinia tellus. Cras libero risus, egestas ac nibh id, fringilla commodo urna."
                                                                                          }
                                                                                        },
                                                                                      },
                                                                                    }
                                                                                  ]
                                                                                }
                                                                              }
                                                                            }
                                                                          ]
                                                                        }
                                                                      }
                                                                    }
                                                                  ]
                                                                }
                                                              ]
                                                            }
                                                          }
                                                        ]
                                                      }
                                                    }
                                                  }
                                                },
                                                {
                                                  "kind": "Button",
                                                  "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                  "metadata": {
                                                    "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovp1006b2",
                                                  },
                                                  "spec": {
                                                    "app": {
                                                      "props": {
                                                        "label": "Pipeline #2",
                                                        "type": "link",
                                                        "icon": "gears",
                                                        "prefix": "pipelines",
                                                        "content": [
                                                          {
                                                            "kind": "Panel",
                                                            "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                            "metadata": {
                                                              "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovp1006b1c2",
                                                            },
                                                            "status": {
                                                              "content": [
                                                                {
                                                                  "title": "Pipeline #2",
                                                                  "content": [{
                                                                    "kind": "Paragraph",
                                                                    "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                                    "metadata": {
                                                                      "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpg1008",
                                                                    },
                                                                    "spec": {
                                                                      "app": {
                                                                        "props": {
                                                                          "text": "Nullam ut malesuada orci, sit amet pellentesque nisl. Donec quis ipsum in nibh tincidunt luctus nec vel purus. Aenean eget mattis odio, eu ornare quam. Fusce quam nulla, auctor in blandit vitae, consectetur eu tortor. Vestibulum tincidunt suscipit ex, ut lacinia mi porta in. Phasellus bibendum ipsum sit amet tincidunt feugiat. Morbi varius dictum nisl. Proin venenatis luctus libero eget tristique. Ut nec tortor turpis. Sed sagittis eu eros at fringilla. Cras rutrum molestie justo, sed consectetur augue vestibulum eu."
                                                                        }
                                                                      },
                                                                    },
                                                                  }]
                                                                }
                                                              ]
                                                            }
                                                          }
                                                        ]
                                                      }
                                                    }
                                                  }
                                                },
                                                {
                                                  "kind": "Button",
                                                  "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                  "metadata": {
                                                    "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovp1006b3",
                                                  },
                                                  "spec": {
                                                    "app": {
                                                      "props": {
                                                        "label": "Pipeline #3",
                                                        "type": "link",
                                                        "icon": "gears",
                                                        "prefix": "pipelines",
                                                        "content": [
                                                          {
                                                            "kind": "Panel",
                                                            "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                            "metadata": {
                                                              "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovp1006b1c3",
                                                            },
                                                            "status": {
                                                              "content": [
                                                                {
                                                                  "title": "Pipeline #3",
                                                                  "content": [{
                                                                    "kind": "Paragraph",
                                                                    "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                                    "metadata": {
                                                                      "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpg10083",
                                                                    },
                                                                    "spec": {
                                                                      "app": {
                                                                        "props": {
                                                                          "text": "Mauris sit amet gravida mi. Curabitur vulputate lectus eget nisl cursus scelerisque. Proin faucibus magna nec odio pharetra lacinia. Suspendisse a velit nec eros venenatis vulputate. Morbi sodales eros sed tempus feugiat. Nullam tincidunt libero et felis semper eleifend. Maecenas efficitur mauris urna. Donec posuere tempus diam in euismod. Sed rhoncus erat lorem. Nunc vestibulum ante at enim accumsan vulputate. Nullam sit amet turpis sed nibh maximus iaculis viverra ultricies sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ornare ex diam, nec pellentesque ex vulputate et."
                                                                        }
                                                                      },
                                                                    },
                                                                  }]
                                                                }
                                                              ]
                                                            }
                                                          }
                                                        ]
                                                      }
                                                    }
                                                  }
                                                }
                                              ]
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
                                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbdov3",
                                },
                                "spec": {
                                  "app": {
                                    "props": {
                                      "width": "18"
                                    }
                                  },
                                },
                                "status": {
                                  "content": {
                                    "items": [
                                      {
                                        "kind": "DynamicContent",
                                        "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                        "metadata": {
                                          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpdc1",
                                        },
                                        "status": {
                                          "content": [
                                            {
                                              "prefix": "pipelines",
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
                    ]
                  }
                }
              },
              {
                "kind": "TabPane",
                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                "metadata": {
                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbdt37",
                },
                "spec": {
                  "app": {
                    "props": {
                      "label": "Events"
                    }
                  },
                },
                "status": {
                  "content": {
                    "items": [
                    ]
                  }
                }
              },
              {
                "kind": "TabPane",
                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                "metadata": {
                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbdt38",
                },
                "spec": {
                  "app": {
                    "props": {
                      "label": "Values"
                    }
                  },
                },
                "status": {
                  "content": {
                    "items": [
                    ]
                  }
                }
              },
              {
                "kind": "TabPane",
                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                "metadata": {
                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbdt39",
                },
                "spec": {
                  "app": {
                    "props": {
                      "label": "Terminal"
                    }
                  },
                },
                "status": {
                  "content": {
                    "items": [
                    ]
                  }
                }
              },
              {
                "kind": "TabPane",
                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                "metadata": {
                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbdt40",
                },
                "spec": {
                  "app": {
                    "props": {
                      "label": "Keptn"
                    }
                  },
                },
                "status": {
                  "content": {
                    "items": [
                    ]
                  }
                }
              },
            ]
          }
        }
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
  }

  // get data by API
  const getContentPage = () => {
    if ((window.location.pathname === "/") || 
        (window.location.pathname === "/form") ||
        (window.location.pathname === "/projects") ||
        (window.location.pathname.match(/^\/projects\/[0-9]+$/g)) ||
        (window.location.pathname.match(/^\/projects\/[0-9]+\/[0-9]+$/g))
    ) {
      // mock data for some pages
      const response = fetchPage(clientId, endpoint);
      console.log("use mock", window.location.pathname)
      return getContent(response, 1);
    } else if (data && isSuccess) {
      console.log("use real data")
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
