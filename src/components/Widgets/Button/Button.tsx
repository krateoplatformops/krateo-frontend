import { Badge, Button as ButtonAnt } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { getColorCode } from "../../../utils/colors";
import { useSelector } from "react-redux";
import { DataListFilterType, selectFilters } from "../../../features/dataList/dataListSlice";
import styles from "./styles.module.scss";
import useEvents from "../../../hooks/useEvents";
import { RootState } from "../../../redux/store";

type ButtonType = {
  endPoint?: string,
  icon?: string,
  label?: string,
  badge?: string,
  type?: "default" | "text" | "link" | "primary" | "dashed",
  action?: "default" | "submit" | "reset",
  prefix?: string,
  actions?: {
    path: string,
    verb: "get" | "delete",
  }[],
  verb?: "get" | "delete",
}

const Button = (props: ButtonType) => {
  const {type, icon, label, badge, prefix, actions, verb} = props;
  const endpoint = actions?.find(el => el.verb === verb)?.path;
  const buttonProps = {...props};
  delete buttonProps.actions;
  const {manageEvent, elementEvent} = useEvents({...buttonProps, endpoint})

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
  filters = useSelector((state: RootState) => selectFilters(state, prefix || ""));

  return (
    <div className={styles.button}>
      {elementEvent}
      { badge && prefix ?
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