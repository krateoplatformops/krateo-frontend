import { Col, Row, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { ReactElement } from "react";
import Toolbar from "../components/Toolbar/Toolbar";
import widgets from "../components/Widgets";
import styles from "./styleParse.module.scss";
import Panel from "../components/Widgets/Panel/Panel";


const useParseData = () => {

  const getColProps = (size) => {
    if (isNaN(size)) {
      return {xs: 24, md: 24}
    } else {
      return {xs: 24, md: parseInt(size)}
    }
  }

  const parseContent = (data, i): ReactElement => {
    const renderComponent = (data, index) => {
      switch (data?.type) {
        case "row":
          return <Row key={`row_${data.uid}`} className={styles.row}>{ data.items?.map(item => parseContent(item, index+1)) }</Row>
        case "column":
          return <Col key={`column_${data.uid}`} { ...getColProps(data.props.width) } className={styles.col}>{ data.items?.map(item => parseContent(item, index+1)) }</Col>
        case "tablist":
          return <Tabs key={data.uid} className={styles.tabs}>{ data.items?.map(item => parseContent(item, index+1)) }</Tabs>
        case "tabpane":
          return <TabPane key={data.uid} tab={data.props.label} className={styles.tabpane}>{ data.items?.map(item => parseContent(item, index+1)) }</TabPane>
        case "panel":
          return <Panel key={data.uid} title={undefined} tooltip={undefined} buttons={undefined} content={data.items?.map(item => parseContent(item, index+1))} />
        case "Toolbar": //TODO
          return <Toolbar key={data.uid}>{ parseContent(data.status.content.items, index+1) }</Toolbar>
        default:
          if (data?.type) {
            const Component = widgets[data.type];
            return data.items?.map((el, i) => <Component id={`${data.uid}_${i}`} key={`widget_${data.uid}_${i}`} actions={el.actions} {...{...el.app, ...data.props}} />)
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