import { Badge, Button as ButtonAnt } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { getColorCode } from "../../../utils/colors";
import { useSelector } from "react-redux";
import { selectFilters } from "../../../features/dataList/dataListSlice";
import styles from "./styles.module.scss";
import useEvents from "../../../hooks/useEvents";

type ButtonType = {
  endPoint?: string,
  icon?: string,
  label?: string,
  badge?: string,
  type?: "default" | "text" | "link" | "primary" | "dashed",
  action?: "default" | "submit" | "reset",
}

const Button = (props: ButtonType) => {
  const {type, icon, label, badge} = props;
  const [manageEvent, elementEvent] = useEvents(props)

  const btnComp = (
    <ButtonAnt
      type={type ? type : undefined}
      icon={icon ? <FontAwesomeIcon icon={icon as IconProp} /> : undefined}
      onClick={manageEvent}
    >
      {label}
    </ButtonAnt>
  )
  const filters = useSelector(selectFilters);

  return (
    <div className={styles.button}>
      {elementEvent}
      { badge ?
        <Badge count={filters.length} color={getColorCode("darkBlue")}>
          {btnComp}
        </Badge>
        :
          btnComp
      }
    </div>
  )
}

export default Button;