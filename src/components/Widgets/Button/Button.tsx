import { Badge, Button as ButtonAnt } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { getColorCode } from "../../../utils/colors";
import { useSelector } from "react-redux";
import { DataListFilterType, selectFilters } from "../../../features/dataList/dataListSlice";
import styles from "./styles.module.scss";
import useEvents, { EventType } from "../../../hooks/useEvents";
import { RootState } from "../../../redux/store";

export type ButtonType = {
  icon?: string,
  label?: string,
  type?: "default" | "text" | "link" | "primary" | "dashed",
  action?: "default" | "submit" | "reset",
  filter?: "true" | "false",
}

const Button = ({icon, label, type, verb, drawer, drawerTitle, drawerSize, route, filter, prefix, content, actions}: ButtonType & EventType) => {
  const endpointURL = actions?.find(action => action.verb.toLowerCase() === verb)?.path
  const {manageEvent, elementEvent} = useEvents({drawer, drawerTitle: drawerTitle ? drawerTitle : label, drawerSize, route, form: filter, prefix, endpoint: endpointURL, content, actions})

  const btnComp = (
    <ButtonAnt
      type={type ? type : undefined}
      icon={icon ? <FontAwesomeIcon icon={icon as IconProp} /> : undefined}
      onClick={manageEvent}
    >
      {label}
    </ButtonAnt>
  )
  let filters: DataListFilterType[] | undefined = [];
  if (filter) {
    filters = useSelector((state: RootState) => selectFilters(state, prefix || ""));
  }

  return (
    <div className={styles.button}>
      {elementEvent}
      { filter ?
        <Badge count={filters?.length} color={getColorCode("darkBlue")}>
          {btnComp}
        </Badge>
        :
          btnComp
      }
    </div>
  )
}

export default Button;