import { List } from "antd";
import widgets from "../index";
import { useAppDispatch } from "../../../redux/hooks";
import { useEffect } from "react";
import { DataListType, selectDataList, setDataList } from "../../../features/dataList/dataListSlice";
import { useSelector } from "react-redux";

const DataList = ({prefix, data, asGrid = true}: {prefix: string, data: DataListType[], asGrid?: boolean}) => {
  const dispatch = useAppDispatch();
  const datalist = useSelector(selectDataList);
  console.log(prefix);

  // save data on Redux
  useEffect(() => {
    dispatch(setDataList(data))
  }, [data])

  return (
    <List
      grid={asGrid ? {
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 3,
        xxl: 4,
      } : {gutter: 16}}
      dataSource={datalist}
      renderItem={(item) => {
        const Component = widgets[item.kind];
        return (
          <List.Item>
            <Component {...item.spec.app.props} />
          </List.Item>
        )
      }}
    />
  )
}

export default DataList;