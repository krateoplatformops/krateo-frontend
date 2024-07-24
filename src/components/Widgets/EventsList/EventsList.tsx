import { useEffect, useState } from "react";
import RichRow from "../RichRow/RichRow";
import { formatISODate } from "../../../utils/dateTime";
import { Typography, Divider } from "antd";
import { getBaseUrl } from "../../../utils/api";

type RowEventType = {
  uid: string,
  icon: string,
  color: string,
  primaryText: React.ReactElement,
  secondaryText: string,
  subPrimaryText: string,
  subSecondaryText: string,
}

const eventToRichRow = (el) => {
  const row: RowEventType = {
    uid: el.metadata.uid,
    subSecondaryText: el.reason,
    icon: el.icon,
    color: el.type === "Normal" ? "blue" : "orange",
    subPrimaryText: el.message,
    primaryText: (
      <>
      <Typography.Text type="secondary">name:</Typography.Text> <Typography.Text>{el.involvedObject.name}</Typography.Text>
      <Divider type="vertical" />
      <Typography.Text type="secondary">namespace:</Typography.Text> <Typography.Text>{el.involvedObject.namespace}</Typography.Text>
      <Divider type="vertical" />
      <Typography.Text type="secondary">kind:</Typography.Text> <Typography.Text>{el.involvedObject.kind}</Typography.Text>
      <Divider type="vertical" />
      <Typography.Text type="secondary">apiVersion:</Typography.Text> <Typography.Text>{el.involvedObject.apiVersion}</Typography.Text>
      </>
    ),
      secondaryText: formatISODate(el.metadata.creationTimestamp, true),
  }

  return row;
}

const EventsList = ({sseEndpoint, sseTopic, events = []}: {
  sseEndpoint?: string,
  sseTopic?: string,
  events: any[],
}) => {
  const [eventList, setEventList] = useState<RowEventType[]>(events?.map(el => eventToRichRow(el)) || []);

  useEffect(() => {
    // opening a connection to the server to begin receiving events from it
    if (sseEndpoint && sseTopic) {
      const eventsEndpoint = `${getBaseUrl("EVENTS_PUSH")}${sseEndpoint.endsWith('/') ? sseEndpoint.slice(0, -1) : sseEndpoint}`;
      const eventSource = new EventSource(eventsEndpoint, {
          withCredentials: false,
      });

      eventSource.addEventListener(sseTopic, (event) => {
        const data = JSON.parse(event.data);
        setEventList([eventToRichRow(data), ...eventList]);
      });

      // terminating the connection on component unmount
      return () => eventSource.close();
    }
  }, [eventList, sseEndpoint, sseTopic]);

  return (
    <>
      { eventList.map(el => <RichRow key={el.uid} {...el} />) }
    </>
  )
}

export default EventsList;