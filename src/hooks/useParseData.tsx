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
      switch (data.kind) {
        case "Row":
          return <Row key={data.metadata.uid} className={styles.row}>{ getContent(data.status.content.items, index+1) }</Row>
        case "Column":
          return <Col key={data.metadata.uid} { ...getColProps(data.spec.app.props.width) } className={styles.col}>{ getContent(data.status.content.items, index+1) }</Col>
        case "Tabs":
          return <Tabs key={data.metadata.uid} className={styles.tabs}>{ getContent(data.status.content.items, index+1) }</Tabs>
        case "TabPane":
          return <TabPane key={data.metadata.uid} tab={data.spec.app.props.label} className={styles.tabpane}>{ getContent(data.status.content.items, index+1) }</TabPane>
        case "Toolbar":
          return <Toolbar key={data.metadata.uid}>{ getContent(data.status.content.items, index+1) }</Toolbar>
        default:
          if (data.apiVersion?.indexOf("widgets") === 0) {
            if (data.status?.content) { // eg: CardTemplate (currently)
              const Component = widgets[data.kind];
              return data.status.content.map((el, i) => <Component id={`${data.metadata.uid}_${i}`} key={`widget_${data.metadata.uid}_${i}`} actions={data.status.actions} {...el} />)
            } else if (data.items) { // eg: CardTemplateList
              return data.items.map((el) => {
                const Component = widgets[el.kind];
                return <Component id={el.metadata.uid} key={el.metadata.uid} actions={el.status.content.actions} {...el} />
              })
            } else {
              const Component = widgets[data.kind];
              return <Component id={data.metadata.uid} key={`widget_${data.metadata.uid}`} actions={data.status?.actions} {...data.spec.app.props} />
            }




          } else {
            // null -> exit recoursive loop
            return <></>
          }
      }
    }

    // recoursive function to scan page definition json
    // data is the array of elements, root is an object
    if (!data?.length) {
      // root element
      return renderComponent(data, i);
    } else {
      return data.map((el, index) => renderComponent(el, index));
    }
  }

  return [getContent];
}

export default useParseData;