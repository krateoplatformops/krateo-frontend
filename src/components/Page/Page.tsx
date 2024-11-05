import { PageType } from "./type";
import styles from "./styles.module.scss";
import Skeleton from "../Skeleton/Skeleton";
import { useLazyGetContentQuery } from "../../features/common/commonApiSlice";
import useParseData from "../../hooks/useParseData";
import useCatchError from "../../utils/useCatchError";
import { useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";

const Page = ({endpoint, body}: PageType) => {
  const [parseContent] = useParseData()
  const { catchError } = useCatchError();
  const dispatch = useAppDispatch();
  
  const [getContent, {data, isLoading, isSuccess, isError, error}] = useLazyGetContentQuery();
  const [searchParams] = useSearchParams();
  const endpointQs = searchParams.get("endpoint");
  
  useEffect(() => {
    if (endpoint || endpointQs) {
      const loadData = async () => {
        await getContent({endpoint: endpointQs || endpoint, body: body });
      }
      loadData();
    }
  }, [dispatch, endpoint, endpointQs, getContent]);

  // get data by API
  const getContentPage = () => {
    if (data && isSuccess) {
      return parseContent(data, 1);
    } else {
      return <></>
    }
  }

  return (
    <section className={styles.page}>
      { isLoading && <Skeleton /> }
      { (data !== undefined && data.code === undefined && isSuccess === true) && getContentPage() }
      { isError && catchError(error, "result") }
    </section>
  );
}

export default Page;
