import { PageType } from "./type";
import styles from "./styles.module.scss";
import { useLazyGetContentQuery } from "../../features/common/commonApiSlice";
import useParseData from "../../hooks/useParseData";
import useCatchError from "../../utils/useCatchError";
import { useEffect, useMemo} from "react";
import { useSearchParams } from "react-router-dom";
import { Space, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Page = ({endpoint}: PageType) => {
  const [parseContent] = useParseData()
  const { catchError } = useCatchError();
  
  const [getContent, {data, isLoading, isSuccess, isError, error}] = useLazyGetContentQuery();
  const [searchParams] = useSearchParams();
  const endpointQs = searchParams.get("endpoint");
  
  useEffect(() => {
    if (endpoint || endpointQs) {
      const loadData = async () => {
        await getContent({endpoint: endpointQs || endpoint });
      }
      loadData();
    }
  }, [endpoint, endpointQs, getContent]);

  const content = useMemo(() => {
    if (isLoading) {
      return (
        <Space className={styles.loading} direction="vertical" size="large">
          <Spin indicator={<LoadingOutlined />} size="large" />
        </Space>
      )
    }

    if (isError) {
      return catchError(error, 'result')
    }

    if (data !== undefined && data.code === undefined && isSuccess) {
      return parseContent(data, 1)
    }

    return null
  }, [isLoading, isError, isSuccess, data])

  return (
    <section className={styles.page}>
      {content}
    </section>
  );
}

export default Page;
