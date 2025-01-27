import { PageType } from "./type";
import styles from "./styles.module.scss";
import { useLazyGetContentQuery } from "../../features/common/commonApiSlice";
import useParseData from "../../hooks/useParseData";
import useCatchError from "../../utils/useCatchError";
import { useEffect, useMemo, useState} from "react";
import { useSearchParams } from "react-router-dom";
import { Skeleton } from "antd";

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
