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

/*
  const mockForm = {
    "status": {
        "items": [
          {
            "status": {
                "items": [
                  {
                    "status": {
                      "type": "FormGenerator",
                      "name": "form",
                      "uid": "12345-form",
                      "items": [
                        {
                          "app": {
                            "title": "Simple Form",
                            "description": "Lorem ipsum dolor sit amet",
                            "buttons": [
                              {
                                "label": "reset",
                                "type": "default",
                                "action": "reset"
                              },
                              {
                                "label": "submit",
                                "type": "primary",
                                "action": "submit"
                              } 
                            ],
                            "fieldsEndpoint": "/call?resource=customforms&apiVersion=templates.krateo.io/v1alpha1&name=composition-mlflow-test-run-new-tabpane-runs-row-column-1-panel-row-column-2-customform&namespace=mlflow-system",
                            "simple": "true"
                          }
                        }
                      ],
                    }
                  }
                ],
                "name": "composition-panel",
                "props": {},
                "type": "panel",
                "uid": "18b479cd-a840-4188-b326-61439047b32b"
            }
          }
        ],
        "name": "compositions-grid",
        "props": {
            "width": "24"
        },
        "type": "grid",
        "uid": "3179f03f-21fd-44d0-af48-e07de9272fe2"
    }
}
*/
  
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
