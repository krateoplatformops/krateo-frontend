import { useState } from "react";
import DrawerPanel from "../components/DrawerPanel/DrawerPanel";
import { useNavigate } from "react-router-dom";

const useEvents = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { panel, route } = props;
  const navigate = useNavigate();
  let elementEvent;

  const manageEvent = () => {
    if (panel) {
      // manage drawer panel
      setIsOpen(true);
    } else if (route) {
      // use route
      navigate(route)
    }
  }

  if (panel) {
    elementEvent = <DrawerPanel panel={panel} isOpen={isOpen} onClose={() => setIsOpen(false)} />
  }

  if (route) {
    elementEvent = <></>
  }

  return [manageEvent, elementEvent]
}

export default useEvents;