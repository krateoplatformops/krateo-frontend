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
import ButtonV2, { ButtonV2Type } from "../components/Widgets/Button/ButtonV2";

type OldSnowPlowData = {
  type?: string;
  kind: never;
  items?: any[];
  uid: string;
  props?: any;
  status?: any;
};

/* This type will be generated from the Schemas of avaliable widgets and collections */
type WidgeteOrCollectionKind = "Button";
type NewSnowPlowData = {
  apiVersion: string;
  kind: WidgeteOrCollectionKind;
  metadata: {
    name: string;
    namespace: string;
    uid: string;
  };

  /* using `spec` during poc https://linear.app/krateo/issue/KRA-231/front-end-renderizzare-il-button-che-rispecchia-lo-schema
  This will become `status`
  //   */
  spec: {
    widgetData: Object;
  };
};

type SnowPlowData = OldSnowPlowData | NewSnowPlowData;

const useParseData = () => {
  const [searchParams] = useSearchParams();
  const tabKey = searchParams.get("tabKey");

  const getColProps = (size) => {
    if (isNaN(size)) {
      return { xs: 24, md: 24 };
    } else {
      return { xs: 24, md: parseInt(size) };
    }
  };

  const parseContent = (data: SnowPlowData, index = 1): ReactElement => {
    const renderComponent = () => {
      if (data.kind) {
        switch (data.kind) {
          case "Button":
            return <ButtonV2 key={data.metadata.uid} {...(data.spec as ButtonV2Type)} />;
          default:
            // @ts-expect-error if it was possible to catch at type level this wouldn't be needed
            throw new Error(`Widget or collection with Kind: ${data.kind} not found`);
        }
      }

      const oldData = data as OldSnowPlowData;

      switch (oldData?.type) {
        case "row":
          return (
            <Row key={`row_${oldData.uid}`} className={styles.row}>
              {oldData.items?.map((item) => parseContent(item, index + 1))}
            </Row>
          );
        case "column":
          return (
            <Col key={`column_${oldData.uid}`} {...getColProps(oldData.props.width)} className={styles.col}>
              {oldData.items?.map((item) => parseContent(item, index + 1))}
            </Col>
          );
        case "tablist":
          return (
            <Tabs
              key={oldData.uid}
              className={styles.tabs}
              defaultActiveKey={
                tabKey === "events"
                  ? oldData.items?.find((item) => item.status?.props?.label?.toLowerCase() === "events").status.uid
                  : undefined
              }
            >
              {oldData.items?.map((item) => parseContent(item, index + 1))}
            </Tabs>
          );
        case "tabpane":
          return (
            <TabPane key={oldData.uid} tab={oldData.props.label} className={styles.tabpane}>
              {oldData.items?.map((item) => parseContent(item, index + 1))}
            </TabPane>
          );
        case "panel":
          return (
            <Panel
              key={oldData.uid}
              {...oldData.props}
              content={oldData.items?.map((item) => parseContent(item, index + 1))}
            />
          );
        case "Toolbar": //TODO
          return <Toolbar key={oldData.uid}>{parseContent(oldData.status.content.items, index + 1)}</Toolbar>;
        case "eventlist":
          return (
            <EventsList
              key={oldData.uid}
              {...oldData.props}
              events={oldData.items?.filter((el) => el.app?.event !== undefined).map((el) => JSON.parse(el.app?.event))}
            />
          );
        case "grid":
          return (
            <Flex wrap key={oldData.uid}>
              {oldData.items
                ?.filter((el) => el !== undefined && el !== null)
                .map((item, index) => (
                  <div
                    key={`${oldData.uid}_${index}`}
                    style={{
                      width: oldData.props.width ? `${(100 / 24) * parseInt(oldData.props.width)}%` : "100%",
                      padding: "0 10px 20px",
                    }}
                  >
                    {parseContent(item, index + 1)}
                  </div>
                ))}
            </Flex>
          );
        case "datalist":
          return <DataList key={oldData.uid} {...oldData.props} data={oldData.items} />;
        default:
          if (oldData?.type) {
            const Component = widgets[oldData.type];

            console.warn(
              "[useParseData] received widegt with type ${data?.type} but cannot find corresponsind widget component, received",
              oldData
            );
            return oldData.items?.map((el, i) => (
              <Component
                id={`${oldData.uid}_${i}`}
                key={`widget_${oldData.uid}_${i}`}
                actions={el.actions}
                {...{ ...el.app, ...oldData.props }}
              />
            ));
          } else {
            // null -> exit recoursive loop

            console.warn("[useParseData] Widget or collection component not found, received", oldData);
            return <></>;
          }
      }
    };
    return renderComponent();
  };

  return [parseContent];
};

export default useParseData;
