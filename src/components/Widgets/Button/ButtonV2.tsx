import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button as ButtonAnt } from "antd";
import styles from "./styles.module.scss";

export type ButtonV2Type = {
  widgetData: {
    label: string;
    icon: string;
    type: "default" | "text" | "link" | "primary" | "dashed";
  };
};

const ButtonV2 = ({ widgetData: { type, icon, label } }: ButtonV2Type) => {
  const btnComp = (
    <ButtonAnt
      type={type ? type : undefined}
      icon={icon ? <FontAwesomeIcon icon={icon as IconProp} /> : undefined}
      onClick={(e) => {
        e.stopPropagation();
        alert("not implemented");
      }}
    >
      {label}
    </ButtonAnt>
  );

  return <div className={styles.button}>{btnComp}</div>;
};

export default ButtonV2;
