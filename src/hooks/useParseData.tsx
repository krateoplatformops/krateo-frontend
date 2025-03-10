import { Col, Flex, Row, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { ReactElement } from "react";
import Toolbar from "../components/Toolbar/Toolbar";
import widgets from "../components/Widgets";
import styles from "./styleParse.module.scss";
import Panel from "../components/Widgets/Panel/Panel";
import EventsList from "../components/Widgets/EventsList/EventsList";
import DataList from "../components/Widgets/DataList/DataList";
import { useSearchParams } from "react-router-dom";


const useParseData = () => {
  const [searchParams] = useSearchParams();
  const tabKey = searchParams.get("tabKey");

  const getColProps = (size) => {
    if (isNaN(size)) {
      return {xs: 24, md: 24}
    } else {
      return {xs: 24, md: parseInt(size)}
    }
  }

  const parseContent = (data, i = 1): ReactElement => {
    const renderComponent = (data, index) => {
      switch (data?.type) {
        case "row":
          return <Row key={`row_${data.uid}`} className={styles.row}>{ data.items?.map(item => parseContent(item, index+1)) }</Row>
        case "column":
          return <Col key={`column_${data.uid}`} { ...getColProps(data.props.width) } className={styles.col}>{ data.items?.map(item => parseContent(item, index+1)) }</Col>
        case "tablist":
          return <Tabs key={data.uid} className={styles.tabs} defaultActiveKey={tabKey === "events" ? data.items?.find(item => item.status?.props?.label?.toLowerCase() === "events").status.uid : undefined} >{ data.items?.map(item => parseContent(item, index+1)) }</Tabs>
        case "tabpane":
          return <TabPane key={data.uid} tab={data.props.label} className={styles.tabpane}>{ data.items?.map(item => parseContent(item, index+1)) }</TabPane>
        case "panel":
          return <Panel key={data.uid} {...data.props} content={data.items?.map(item => parseContent(item, index+1))} />
        case "Toolbar": //TODO
          return <Toolbar key={data.uid}>{ parseContent(data.status.content.items, index+1) }</Toolbar>
        case "eventlist":
          return <EventsList key={data.uid} {...data.props} events={ data.items?.filter(el => el.app?.event !== undefined).map(el => JSON.parse(el.app?.event)) } />
        case "grid":
          return <Flex wrap key={data.uid}>{ data.items?.filter(el => el !== undefined && el !== null).map((item, index) => <div key={`${data.uid}_${index}`} style={{ width: data.props.width ? `${100 / 24 * parseInt(data.props.width)}%` : "100%", padding: "0 10px 20px" }}>{ parseContent(item, index+1) }</div>  )}</Flex>  
        case "datalist":
          return <DataList key={data.uid} {...data.props} data={data.items} />
        default:
          if (data?.type) {
            const Component = widgets[data.type];
            return data.items?.map((el, i) => <Component id={data.items > 1 ? `${data.uid}_${i}` : data.uid} key={`widget_${data.uid}_${i}`} actions={el.actions} {...{...el.app, ...data.props}} />)
          } else {
            // null -> exit recoursive loop
            return <></>
          }
      }
    }
    return renderComponent(data?.status, i);
  }

  return [parseContent];
}

export default useParseData;