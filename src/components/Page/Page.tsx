import { PageType } from "./type";
import styles from "./styles.module.scss";
import Skeleton from "../Skeleton/Skeleton";
import { useLazyGetContentQuery } from "../../features/common/commonApiSlice";
import useParseData from "../../hooks/useParseData";
import useCatchError from "../../utils/useCatchError";
import { useEffect, useMemo, useState} from "react";
import { useSearchParams } from "react-router-dom";

const Page = ({endpoint}: PageType) => {
  const [parseContent] = useParseData()
  const { catchError } = useCatchError();
  
  const [getContent, {data, isLoading, isSuccess, isError, error}] = useLazyGetContentQuery();
  const [searchParams] = useSearchParams();
  const endpointQs = searchParams.get("endpoint");
  
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    if (endpoint || endpointQs) {
      const loadData = async () => {
        try {
          setIsPageLoading(true)
          await getContent({ endpoint: endpointQs || endpoint })
        } finally {
          setIsPageLoading(false)
        }
      }
      loadData();
    }
  }, [endpoint, endpointQs, getContent]);

  const content = useMemo(() => {
    if (isLoading || isPageLoading) {
      return <Skeleton />
    }

    if (isError) {
      return catchError(error, 'result')
    }

    if (data !== undefined && data.code === undefined && isSuccess) {
      return parseContent(data, 1)

      // TEMP: mock Datalist elements
      // console.log("DATA", data)
      // const mock = {
      //   "status": {
      //     "type": "row",
      //     "uid": "1234",
      //     "items": [
      //       {
      //         "status":{
      //           "type": "column",
      //           "uid": "123456789",
      //           "props": { "width": "24" },
      //           "items": [
      //             {
      //               "status": {
      //                 "items": [
      //                   {
      //                     "app": {
      //                       "panel": {
      //                         "title": "Compositions Filters",
      //                         "type": "form",
      //                         "size": "default",
      //                         "buttons": [{"label": "reset", "type": "default", "action": "reset"}, {"label": "submit", "type": "primary", "action": "submit"} ],
      //                         "content": {
      //                           "element": "formGenerator",
      //                           "props": {
      //                             "prefix": "composition-list",
      //                             "fieldsEndpoint": "/call?resource=customforms&apiVersion=templates.krateo.io/v1alpha1&name=template-fireworksapp-customform&namespace=fireworksapp-system",
      //                           }
      //                         }
      //                       },
      //                     }
      //                   }
      //                 ],
      //                 "name": "composition-filter-button",
      //                 "props": {
      //                   "icon": "fa-filter",
      //                   "label": "Filter",
      //                   "type": "default"
      //                 },
      //                 "type": "button",
      //                 "uid": "123ccf6-36f8-4eb9-bcbc-989a577b815x"
      //               }
      //             },
      //             {
      //               "status": {
      //                 "items": [
      //                   {
      //                     "status": {
      //                       "items": [
      //                         {
      //                             "actions": [
      //                                 {
      //                                     "path": "/call?resource=collections&apiVersion=templates.krateo.io/v1alpha1&name=composition-comp-tablist&namespace=mlflow-system",
      //                                     "verb": "GET"
      //                                 },
      //                                 {
      //                                     "path": "/call?resource=mlflowscaffoldings&apiVersion=composition.krateo.io/v0-0-8&name=comp&namespace=mlflow-system",
      //                                     "verb": "DELETE"
      //                                 }
      //                             ],
      //                             "app": {
      //                                 "color": "blue",
      //                                 "content": "This is a card for comp Model scaffolding",
      //                                 "icon": "fa-chart-simple",
      //                                 "tags": "mlflow-system",
      //                                 "title": "comp"
      //                             }
      //                         }
      //                       ],
      //                       "name": "composition-comp-card",
      //                       "props": {
      //                           "panel": "false"
      //                       },
      //                       "type": "card",
      //                       "uid": "5738ccf6-36f8-4eb9-bcbc-989a577b424f"
      //                     }
      //                   },
      //                   {
      //                       "status": {
      //                           "items": [
      //                               {
      //                                   "actions": [
      //                                       {
      //                                           "path": "/call?resource=collections&apiVersion=templates.krateo.io/v1alpha1&name=composition-comp2-tablist&namespace=mlflow-system",
      //                                           "verb": "GET"
      //                                       },
      //                                       {
      //                                           "path": "/call?resource=mlflowscaffoldings&apiVersion=composition.krateo.io/v0-0-8&name=comp2&namespace=mlflow-system",
      //                                           "verb": "DELETE"
      //                                       }
      //                                   ],
      //                                   "app": {
      //                                       "color": "blue",
      //                                       "content": "This is a card for comp2 Model scaffolding",
      //                                       "icon": "fa-chart-simple",
      //                                       "tags": "mlops-system,0.0.1",
      //                                       "title": "comp2"
      //                                   }
      //                               }
      //                           ],
      //                           "name": "composition-comp2-card",
      //                           "props": {
      //                               "panel": "false"
      //                           },
      //                           "type": "card",
      //                           "uid": "7ec9a108-0663-4767-9c5e-025d7555d3bf"
      //                       }
      //                   }
      //                 ],
      //                 "name": "compositions-datalist",
      //                 "props": {
      //                     "prefix": "composition-list"
      //                 },
      //                 "type": "datalist",
      //                 "uid": "3179f03f-21fd-44d0-af48-e07de9272fe2"
      //               }
      //             }
      //           ]
      //         }
      //       }
      //     ]
      //   }
      // }
      // console.log("MOCK", mock)
      // return parseContent(mock, 1)
    }

    return null
  }, [isLoading, isPageLoading, isError, isSuccess, data])

  return (
    <section className={styles.page}>
      {content}
    </section>
  );
}

export default Page;
