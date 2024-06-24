import { useEffect, useState } from "react";
import { getBaseUrl } from "../../../utils/api";
import RichRow from "../RichRow/RichRow";

type EventType = {
  uid: string,
  icon: string,
  color: string,
  primaryText: string,
  secondaryText: string,
  subPrimaryText: string,
  subSecondaryText: string,
}

const EventsList = ({deploymentId}: {deploymentId: string}) => {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    // opening a connection to the server to begin receiving events from it
    const eventSource = new EventSource(`${getBaseUrl()}/events/${deploymentId}`);
    
    // attaching a handler to receive message events
    eventSource.onmessage = (event) => {
      const newEvents = JSON.parse(event.data);
      setEvents({ ...newEvents, ...events });
    };
    
    // terminating the connection on component unmount
    return () => eventSource.close();
  }, [deploymentId, events]);

  return (
    events.map(el => <RichRow key={el.uid} {...el} />)
  )
}

export default EventsList;