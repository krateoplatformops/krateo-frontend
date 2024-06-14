import { Col, Row, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { ReactElement } from "react";
import Toolbar from "../components/Toolbar/Toolbar";
import widgets from "../components/Widgets";
import styles from "./styleParse.module.scss";


const useParseData = () => {

  const getColProps = (size) => {
    if (isNaN(size)) {
      return {xs: 24, md: 24}
    } else {
      return {xs: 24, md: parseInt(size)}
    }
  }

  const getContent = (data, i): ReactElement => {
    const renderComponent = (data, index) => {
      switch (data.type) {
        case "row":
          return <Row key={`row_${Math.random()}`} className={styles.row}>{ data.items.map(item => getContent(item, index+1)) }</Row>
        case "column":
          return <Col key={`column_${Math.random()}`} { ...getColProps(data.props.width) } className={styles.col}>{ data.items.map(item => getContent(item, index+1)) }</Col>
        case "Tabs": //TODO
          return <Tabs key={data.metadata.uid} className={styles.tabs}>{ getContent(data.status.content.items, index+1) }</Tabs>
        case "TabPane": //TODO
          return <TabPane key={data.metadata.uid} tab={data.spec.app.props.label} className={styles.tabpane}>{ getContent(data.status.content.items, index+1) }</TabPane>
        case "Toolbar": //TODO
          return <Toolbar key={data.metadata.uid}>{ getContent(data.status.content.items, index+1) }</Toolbar>
        default:
          if (data.type) {
            const Component = widgets[data.type];
             return data.items.map((el, i) => <Component id={`widget_${index}_${i}`} key={`widget_${index}_${i}`} actions={el.actions} {...el.app} />)
          } else {
            // null -> exit recoursive loop
            return <></>
          }
      }
    }

    return renderComponent(data.status, i);
  }

  return [getContent];
}

export default useParseData;