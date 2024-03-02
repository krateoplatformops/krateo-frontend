import { Badge, Button, Drawer, Form, Space, Typography } from "antd"
import { useState } from "react";
import widgets from "../index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { getColorCode } from "../../../utils/colors";
import { useSelector } from "react-redux";
import { selectFilters } from "../../../features/dataList/dataListSlice";
import dayjs from "dayjs";
import styles from "./styles.module.scss";

type ButtonPanelType = {
  button: ButtonType,
  panel: {
    title: string,
    description?: string,
    size?: "default" | "large",
    type?: "form",
    buttons?: ButtonType[],
    content: {
      element: string,
      props?: React.ReactElement // panel content
    }
  }
}

type ButtonType = {
  endPoint?: string,
  icon?: string,
  label?: string,
  badge?: string,
  type?: "default" | "text" | "link" | "primary" | "dashed",
  action?: "default" | "submit" | "reset",
}

const ButtonPanel = ({button, panel}: ButtonPanelType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const Component = widgets[panel.content.element];
  const btnComp = <Button type={button.type ? button.type : undefined} icon={button.icon ? <FontAwesomeIcon icon={button.icon as IconProp} /> : undefined} onClick={() => setIsOpen(true)}>{button.label}</Button>
  const filters = useSelector(selectFilters);
  const [form] = Form.useForm();
  const panelProps = {...panel.content.props};

  if (panel.type === "form") {
    // add form object to panel
    panelProps["form"] = form;
  }

  const generateInitialValues = () => {
    const iv = {};
    filters.forEach(f => {
      iv[f.fieldName] = f.fieldType === "datetime" ? dayjs(f.fieldValue as string) : f.fieldValue
    })
    return iv;
  }

  const onClickButton = (action: "default" | "submit" | "reset" | undefined) => {
    switch (action) {
      case "submit":
        form.submit();
        break;

      case "reset":
        form.resetFields();
        break;
    
      default:
        break;
    }
  }

  return (
    <div className={styles.buttonPanel}>
    { button.badge ?
      <Badge count={filters.length} color={getColorCode("darkBlue")}>
        {btnComp}
      </Badge>
      :
        btnComp
      }
      <Drawer
        rootClassName={styles.panel}
        title={panel.title}
        size={panel.size}
        onClose={() => setIsOpen(false)}
        open={isOpen}
        closable={true}
        destroyOnClose={true}
        extra={ // if contain FormGenerator only
          panel.type === "form" &&
          <Space>
            {
              panel.buttons?.map(but => <Button type={but.type} onClick={() => onClickButton(but.action)}>{but.label}</Button>)
            }
          </Space>
        }
      >
        <Space direction="vertical" className={styles.panelContent}>
          <Typography.Paragraph>{panel.description}</Typography.Paragraph>
          <Component
            {...panelProps}
            initialValues={button.badge ? generateInitialValues() : undefined}
            onClose={() => setIsOpen(false)} />
        </Space>
      </Drawer>
    </div>
  )
}

export default ButtonPanel;