import { PageType } from "./type";
import styles from "./styles.module.scss";
import Skeleton from "../Skeleton/Skeleton";
import { useLazyGetContentQuery } from "../../features/common/commonApiSlice";
import useParseData from "../../hooks/useParseData";
import useCatchError from "../../utils/useCatchError";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../features/auth/authSlice";
import ChartPie from "../Widgets/ChartPie/ChartPie";

const Page = ({clientId, endpoint}: PageType) => {
  const isMock = useRef(false);
  const [parseContent] = useParseData()
  const { catchError } = useCatchError();
  const dispatch = useAppDispatch();
  
  const [getContent, {data, isLoading, isSuccess, isError, error}] = useLazyGetContentQuery();
  const [searchParams] = useSearchParams();
  const endpointQs = searchParams.get("endpoint");
  
  useEffect(() => {
    if (endpoint || endpointQs) {
      const loadData = async () => {
        const response = await getContent({endpoint: endpointQs || endpoint });
        if (response.isError && JSON.parse((error as {message: string}).message)?.data?.code === 401) {
          // not authorized
          dispatch(logout());
        }
      }
      loadData();
    }
  }, [dispatch, endpoint, endpointQs, getContent]);

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
                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                "metadata": {
                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbdweee",
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
                        "apiVersion": "layout.ui.krateo.io/v1alpha1",
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
                        "apiVersion": "layout.ui.krateo.io/v1alpha1",
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
                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                "metadata": {
                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabb16546",
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

    // compositions details (page with tabs)
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
                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbdt32ui",
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
                      {
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
                                                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                                "metadata": {
                                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabb13z2f",
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
                      {
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
                                                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                                "metadata": {
                                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabb13z2f",
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
                              "uid": "e14d5e2d-1170-4360-9b86-827d527dabbcov2004cl",
                            },
                            "items": [
                              {
                                                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                                "metadata": {
                                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbdov3005c1",
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
                                          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovp1006p1adf",
                                        },
                                        "status": {
                                          "content": [
                                            {
                                              "title": "Documentation",
                                              "tooltip": "This is the panel tooltip",
                                              "buttons": [
                                                {
                                                  "kind": "Button",
                                                  "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                  "metadata": {
                                                    "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovp1006b2b3vv",
                                                  },
                                                  "status": {
                                                    "content": [
                                                      {
                                                        "label": "edit",
                                                        "type": "link",
                                                        "panel": {
                                                          "title": "Edit list",
                                                          "type": "form",
                                                          "buttons": [
                                                            { label: "cancel", type: "text", action: "reset"},
                                                            { label: "save", type: "primary", action: "submit"}
                                                          ],
                                                          "content": {
                                                            "element": "EditableList",
                                                            "props": {
                                                              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                                              endpoint: undefined,
                                                              prefix: "documentList",
                                                              data: [
                                                                { id: "e14d5e2d-1170-4360-9b86-827d527dabbfb1", label: "Document #1" },
                                                                { id: "e14d5e2d-1170-4360-9b86-827d527dabbfb2", label: "Document #2" },
                                                                { id: "e14d5e2d-1170-4360-9b86-827d527dabbfb3", label: "Document #3" },
                                                              ]
                                                            }
                                                          }
                                                        }
                                                      }
                                                    ]
                                                  }
                                                }
                                              ],
                                              "content": [
                                                {
                                                  "kind": "DynamicContent",
                                                  "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                  "metadata": {
                                                    "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpdc1h4dc1",
                                                  },
                                                  "status": {
                                                    "content": [
                                                      {
                                                        "prefix": "documentList",
                                                        "content": [
                                                          {
                                                            "kind": "Button",
                                                            "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                            "metadata": {
                                                              "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovp1006b2sf",
                                                            },
                                                            "spec": {
                                                              "app": {
                                                                "props": {
                                                                  "label": "Document #1",
                                                                  "type": "link",
                                                                  "icon": "book",
                                                                  "prefix": "documents",
                                                                  "content": [
                                                                    {
                                                                      "kind": "Panel",
                                                                      "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                                      "metadata": {
                                                                        "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovp1006b1c2et",
                                                                      },
                                                                      "status": {
                                                                        "content": [
                                                                          {
                                                                            "title": "Document #1",
                                                                            "content": [{
                                                                              "kind": "EditableContent",
                                                                              "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                                              "metadata": {
                                                                                "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpg1008uu",
                                                                              },
                                                                              "spec": {
                                                                                "app": {
                                                                                  "props": {
                                                                                    "text": "## Nullam ut malesuada ## \r\r `orci, sit amet` \r\r pellentesque nisl. Donec quis ipsum in nibh tincidunt luctus nec vel purus. Aenean eget mattis odio, eu ornare quam. Fusce quam nulla, auctor in blandit vitae, consectetur eu tortor. Vestibulum tincidunt suscipit ex, ut lacinia mi porta in. Phasellus bibendum ipsum sit amet tincidunt feugiat. Morbi varius dictum nisl. Proin venenatis luctus libero eget tristique. Ut nec tortor turpis. Sed sagittis eu eros at fringilla. Cras rutrum molestie justo, sed consectetur augue vestibulum eu."
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
                                                              "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovp1006b3y",
                                                            },
                                                            "spec": {
                                                              "app": {
                                                                "props": {
                                                                  "label": "Document #2",
                                                                  "type": "link",
                                                                  "icon": "book",
                                                                  "prefix": "documents",
                                                                  "content": [
                                                                    {
                                                                      "kind": "Panel",
                                                                      "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                                      "metadata": {
                                                                        "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovp1006b1c3yyy",
                                                                      },
                                                                      "status": {
                                                                        "content": [
                                                                          {
                                                                            "title": "Document #2",
                                                                            "content": [{
                                                                              "kind": "Paragraph",
                                                                              "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                                              "metadata": {
                                                                                "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpg10083555",
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
                                                          },
                                                          {
                                                            "kind": "Button",
                                                            "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                            "metadata": {
                                                              "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovp1006b3ee",
                                                            },
                                                            "spec": {
                                                              "app": {
                                                                "props": {
                                                                  "label": "Document #3",
                                                                  "type": "link",
                                                                  "icon": "book",
                                                                  "prefix": "documents",
                                                                  "content": [
                                                                    {
                                                                      "kind": "Panel",
                                                                      "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                                      "metadata": {
                                                                        "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovp1006b1c32e",
                                                                      },
                                                                      "status": {
                                                                        "content": [
                                                                          {
                                                                            "title": "Document #3",
                                                                            "content": [{
                                                                              "kind": "Paragraph",
                                                                              "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                                              "metadata": {
                                                                                "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpg100834jjj",
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
                                          ]
                                        }
                                      }
                                    ]
                                  }
                                }
                              },
                              {
                                                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                                "metadata": {
                                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbdov3e4",
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
                                          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpdc1h4",
                                        },
                                        "status": {
                                          "content": [
                                            {
                                              "prefix": "documents",
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
                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbdt3644",
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
                      {
                        "kind": "Row",
                        "apiVersion": "layout.ui.krateo.io/v1alpha1",
                        "metadata": {
                          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbbov100344",
                        },
                        "status": {
                          "content": {
                            "kind": "ColumnList",
                            "apiVersion": "layout.ui.krateo.io/v1alpha1",
                            "metadata": {
                              "uid": "e14d5e2d-1170-4360-9b86-827d527dabbcov200444",
                            },
                            "items": [
                              {
                                                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                                "metadata": {
                                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbdov300544",
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
                                          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovp100644",
                                        },
                                        "status": {
                                          "content": [
                                            {
                                              "title": "Kubernetes",
                                              "content": [
                                                {
                                                  "kind": "Button",
                                                  "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                  "metadata": {
                                                    "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovp1006b144",
                                                  },
                                                  "spec": {
                                                    "app": {
                                                      "props": {
                                                        "label": "Kubernetes #1",
                                                        "type": "link",
                                                        "icon": "dharmachakra",
                                                        "prefix": "kubernetes",
                                                        "content": [
                                                          {
                                                            "kind": "Panel",
                                                            "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                            "metadata": {
                                                              "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovp1006b1c144",
                                                            },
                                                            "status": {
                                                              "content": [
                                                                {
                                                                  "title": "Kubernetes #1",
                                                                  "content": [
                                                                    {
                                                                      "kind": "Row",
                                                                      "apiVersion": "layout.ui.krateo.io/v1alpha1",
                                                                      "metadata": {
                                                                        "uid": "e14d5e2d-1170-4360-9b86-827d527dabbbov1003r144",
                                                                      },
                                                                      "status": {
                                                                        "content": {
                                                                          "kind": "ColumnList",
                                                                          "apiVersion": "layout.ui.krateo.io/v1alpha1",
                                                                          "metadata": {
                                                                            "uid": "e14d5e2d-1170-4360-9b86-827d527dabbcov2004c144",
                                                                          },
                                                                          "items": [
                                                                            {
                                                                                                                                            "apiVersion": "layout.ui.krateo.io/v1alpha1",
                                                                              "metadata": {
                                                                                "uid": "e14d5e2d-1170-4360-9b86-827d527dabbdov3005c244",
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
                                                                                      "kind": "ChartPie",
                                                                                      "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                                                      "metadata": {
                                                                                        "uid": "e14d5e2d-1170-4360-9b86-827d527dabbq44",
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
                                                                                        "uid": "e14d5e2d-1170-4360-9b86-827d527dabbw44",
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
                                                                                                                                            "apiVersion": "layout.ui.krateo.io/v1alpha1",
                                                                              "metadata": {
                                                                                "uid": "e14d5e2d-1170-4360-9b86-827d527dabbdov3005c2244",
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
                                                                                      "kind": "RichRow",
                                                                                      "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                                                      "metadata": {
                                                                                        "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpg155244",
                                                                                      },
                                                                                      "spec": {
                                                                                        "app": {
                                                                                          "props": {
                                                                                            "color": "blue",
                                                                                            "primaryText": "Lorem ipsum dolor sit amet, consectetur adipiscing",
                                                                                            "subPrimaryText": "id: 92",
                                                                                            "secondaryText": "11 days ago",
                                                                                            "subSecondaryText": "Sep 15th 2024 08:15:43"
                                                                                          }
                                                                                        },
                                                                                      },
                                                                                    },
                                                                                    {
                                                                                      "kind": "RichRow",
                                                                                      "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                                                      "metadata": {
                                                                                        "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpg1552944",
                                                                                      },
                                                                                      "spec": {
                                                                                        "app": {
                                                                                          "props": {
                                                                                            "color": "blue",
                                                                                            "primaryText": "Lorem ipsum dolor sit amet, consectetur adipiscing",
                                                                                            "subPrimaryText": "id: 92",
                                                                                            "secondaryText": "11 days ago",
                                                                                            "subSecondaryText": "Sep 15th 2024 08:15:43"
                                                                                          }
                                                                                        },
                                                                                      },
                                                                                    },
                                                                                    {
                                                                                      "kind": "RichRow",
                                                                                      "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                                                      "metadata": {
                                                                                        "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpg15523444",
                                                                                      },
                                                                                      "spec": {
                                                                                        "app": {
                                                                                          "props": {
                                                                                            "color": "blue",
                                                                                            "primaryText": "Lorem ipsum dolor sit amet, consectetur adipiscing",
                                                                                            "subPrimaryText": "id: 92",
                                                                                            "secondaryText": "11 days ago",
                                                                                            "subSecondaryText": "Sep 15th 2024 08:15:43"
                                                                                          }
                                                                                        },
                                                                                      },
                                                                                    },
                                                                                    {
                                                                                      "kind": "RichRow",
                                                                                      "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                                                      "metadata": {
                                                                                        "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpg1552924644",
                                                                                      },
                                                                                      "spec": {
                                                                                        "app": {
                                                                                          "props": {
                                                                                            "color": "blue",
                                                                                            "primaryText": "Lorem ipsum dolor sit amet, consectetur adipiscing",
                                                                                            "subPrimaryText": "id: 92",
                                                                                            "secondaryText": "11 days ago",
                                                                                            "subSecondaryText": "Sep 15th 2024 08:15:43"
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
                                                    "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovp1006b244",
                                                  },
                                                  "spec": {
                                                    "app": {
                                                      "props": {
                                                        "label": "Kubernetes #2",
                                                        "type": "link",
                                                        "icon": "dharmachakra",
                                                        "prefix": "kubernetes",
                                                        "content": [
                                                          {
                                                            "kind": "Panel",
                                                            "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                            "metadata": {
                                                              "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovp1006b1c244",
                                                            },
                                                            "status": {
                                                              "content": [
                                                                {
                                                                  "title": "Kubernetes #2",
                                                                  "content": [{
                                                                    "kind": "Paragraph",
                                                                    "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                                    "metadata": {
                                                                      "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpg100844",
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
                                                    "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovp1006b344",
                                                  },
                                                  "spec": {
                                                    "app": {
                                                      "props": {
                                                        "label": "Kubernetes #3",
                                                        "type": "link",
                                                        "icon": "dharmachakra",
                                                        "prefix": "kubernetes",
                                                        "content": [
                                                          {
                                                            "kind": "Panel",
                                                            "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                            "metadata": {
                                                              "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovp1006b1c344",
                                                            },
                                                            "status": {
                                                              "content": [
                                                                {
                                                                  "title": "Kubernetes #3",
                                                                  "content": [{
                                                                    "kind": "Paragraph",
                                                                    "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                                    "metadata": {
                                                                      "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpg1008344",
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
                                                "apiVersion": "layout.ui.krateo.io/v1alpha1",
                                "metadata": {
                                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbdov344",
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
                                          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpdc144",
                                        },
                                        "status": {
                                          "content": [
                                            {
                                              "prefix": "kubernetes",
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
                                                                                                                                            "apiVersion": "layout.ui.krateo.io/v1alpha1",
                                                                              "metadata": {
                                                                                "uid": "e14d5e2d-1170-4360-9b86-827d527dabbdov3005c2",
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
                                                                                                                                            "apiVersion": "layout.ui.krateo.io/v1alpha1",
                                                                              "metadata": {
                                                                                "uid": "e14d5e2d-1170-4360-9b86-827d527dabbdov3005c22",
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
                                                                                      "kind": "RichRow",
                                                                                      "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                                                      "metadata": {
                                                                                        "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpg1552",
                                                                                      },
                                                                                      "spec": {
                                                                                        "app": {
                                                                                          "props": {
                                                                                            "color": "blue",
                                                                                            "primaryText": "Lorem ipsum dolor sit amet, consectetur adipiscing",
                                                                                            "subPrimaryText": "id: 92",
                                                                                            "secondaryText": "11 days ago",
                                                                                            "subSecondaryText": "Sep 15th 2024 08:15:43"
                                                                                          }
                                                                                        },
                                                                                      },
                                                                                    },
                                                                                    {
                                                                                      "kind": "RichRow",
                                                                                      "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                                                      "metadata": {
                                                                                        "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpg15529",
                                                                                      },
                                                                                      "spec": {
                                                                                        "app": {
                                                                                          "props": {
                                                                                            "color": "blue",
                                                                                            "primaryText": "Lorem ipsum dolor sit amet, consectetur adipiscing",
                                                                                            "subPrimaryText": "id: 92",
                                                                                            "secondaryText": "11 days ago",
                                                                                            "subSecondaryText": "Sep 15th 2024 08:15:43"
                                                                                          }
                                                                                        },
                                                                                      },
                                                                                    },
                                                                                    {
                                                                                      "kind": "RichRow",
                                                                                      "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                                                      "metadata": {
                                                                                        "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpg155234",
                                                                                      },
                                                                                      "spec": {
                                                                                        "app": {
                                                                                          "props": {
                                                                                            "color": "blue",
                                                                                            "primaryText": "Lorem ipsum dolor sit amet, consectetur adipiscing",
                                                                                            "subPrimaryText": "id: 92",
                                                                                            "secondaryText": "11 days ago",
                                                                                            "subSecondaryText": "Sep 15th 2024 08:15:43"
                                                                                          }
                                                                                        },
                                                                                      },
                                                                                    },
                                                                                    {
                                                                                      "kind": "RichRow",
                                                                                      "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                                                                      "metadata": {
                                                                                        "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpg15529246",
                                                                                      },
                                                                                      "spec": {
                                                                                        "app": {
                                                                                          "props": {
                                                                                            "color": "blue",
                                                                                            "primaryText": "Lorem ipsum dolor sit amet, consectetur adipiscing",
                                                                                            "subPrimaryText": "id: 92",
                                                                                            "secondaryText": "11 days ago",
                                                                                            "subSecondaryText": "Sep 15th 2024 08:15:43"
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
                      {
                        "kind": "Toolbar",
                        "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                        "metadata": {
                          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpg155244edltb",
                        },
                        "status": {
                          "content": {
                            "items": [
                              {
                                "kind": "Button",
                                "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                "metadata": {
                                  "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ff",
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
                            ]
                          }
                        }
                      },
                      {
                        "kind": "Panel",
                        "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                        "metadata": {
                          "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovp155",
                        },
                        "status": {
                          "content": [
                            {
                              "title": "",
                              "content": [
                                {
                                  "kind": "DataList",
                                  "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                  "metadata": {
                                    "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpg155244edl",
                                  },
                                  "spec": {
                                    "app": {
                                      "props": {
                                        "prefix": "deployment-events",
                                        "asGrid": false,
                                        "data": [
                                          {
                                            "kind": "RichRow",
                                            "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                            "metadata": {
                                              "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpg155244e",
                                            },
                                            "spec": {
                                              "app": {
                                                "props": {
                                                  "color": "green",
                                                  "icon": "check",
                                                  "primaryText": "Lorem ipsum dolor sit amet, consectetur adipiscing",
                                                  "subPrimaryText": "Lorem ipsum dolor sit amet",
                                                  "secondaryText": "11 days ago",
                                                  "subSecondaryText": "Sep 15th 2024 08:15:43"
                                                }
                                              },
                                            },
                                          },
                                          {
                                            "kind": "RichRow",
                                            "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                            "metadata": {
                                              "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpg155244e2",
                                            },
                                            "spec": {
                                              "app": {
                                                "props": {
                                                  "color": "red",
                                                  "icon": "xmark",
                                                  "primaryText": "Lorem ipsum dolor sit amet, consectetur adipiscing",
                                                  "subPrimaryText": "Lorem ipsum dolor sit amet",
                                                  "secondaryText": "11 days ago",
                                                  "subSecondaryText": "Sep 15th 2024 08:15:43"
                                                }
                                              },
                                            },
                                          },
                                          {
                                            "kind": "RichRow",
                                            "apiVersion": "widgets.ui.krateo.io/v1alpha1",
                                            "metadata": {
                                              "uid": "e14d5e2d-1170-4360-9b86-827d527dabbfb1ovpg155244e",
                                            },
                                            "spec": {
                                              "app": {
                                                "props": {
                                                  "color": "orange",
                                                  "icon": "rotate",
                                                  "primaryText": "Lorem ipsum dolor sit amet, consectetur adipiscing",
                                                  "subPrimaryText": "Lorem ipsum dolor sit amet",
                                                  "secondaryText": "11 days ago",
                                                  "subSecondaryText": "Sep 15th 2024 08:15:43"
                                                }
                                              },
                                            },
                                          },
                                        ]
                                      }
                                    }
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
            ]
          }
        }
      }
    }
  }

  // get data by API
  const getContentPage = () => {
    if (window.location.pathname === "/") {
      // mock data for some pages
      const response = fetchPage(clientId, endpoint);
      isMock.current = true;
      return parseContent(response, 1);
    } else if (data && isSuccess) {
      isMock.current = false;
      return parseContent(data, 1);
    } else {
      return <></>
    }
  }

  return (
    <section className={styles.page}>
      { isLoading && <Skeleton /> }
      { ((data !== undefined && data.code === undefined && isSuccess === true) || isMock) && getContentPage() }
      { (isError && !isMock.current) && catchError(error, "result") }
    </section>
  );
}

export default Page;
