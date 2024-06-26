// import { useEffect, useState } from "react";
// import { getBaseUrl } from "../../utils/api";
// import RichRow from "../Widgets/RichRow/RichRow";
// import Button from "../Widgets/Button/Button";

// type EventType = {
//   uid: string,
//   type: string,
//   icon: string,
//   color: string,
//   primaryText: string,
//   secondaryText: string,
//   subPrimaryText: string,
//   subSecondaryText: string,
// }

const Notification = () => {
  // const [events, setEvents] = useState<EventType[]>([]);

  // useEffect(() => {
  //   // opening a connection to the server to begin receiving events from it
  //   const eventSource = new EventSource(`${getBaseUrl()}/notifications`);
    
  //   // attaching a handler to receive message events
  //   eventSource.onmessage = (event) => {
  //     const newEvents = JSON.parse(event.data);
  //     setEvents({ ...newEvents, ...events });
  //   };
    
  //   // terminating the connection on component unmount
  //   return () => eventSource.close();
  // }, [events]);

  return (
    <></>
    // events.map(el => <RichRow key={el.uid} {...el} />)
  )
}

export default Notification;