import { useEffect } from "react";
import { List } from "antd";
import { useAppDispatch } from "../../../redux/hooks";
import { DataListType, selectDataList, setDataList } from "../../../features/dataList/dataListSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import useParseData from "../../../hooks/useParseData";

const DataList = ({prefix, data, asGrid = "true"}: DataListType) => {
  const dispatch = useAppDispatch();
  const datalist = useSelector((state: RootState) => selectDataList(state, prefix));
  const [parseContent] = useParseData()

  // save data on Redux
  useEffect(() => {
    // save data on Redux and remove null values
    if (Array.isArray(data))
      dispatch(setDataList({data: data.filter(el => el !== null), prefix}))
  }, [data, dispatch, prefix])

  return (
    <List
      grid={asGrid === "true" && (datalist && datalist?.length > 1) ? {
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 3,
        xxl: 4,
      } : {gutter: 16, column: 1}}
      dataSource={datalist}
      renderItem={(item, index) => {
        return (
          <List.Item>
            {parseContent(item, index+1)}
          </List.Item>
        )
      }}
    />
  )
}

export default DataList;