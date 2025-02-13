import { Button, Drawer, Form, Space, Typography } from "antd"
import widgets, { WidgetNamesType } from "../Widgets/index";
// import { useSelector } from "react-redux";
// import { selectFilters } from "../../features/dataList/dataListSlice";
// import dayjs from "dayjs";
import styles from "./styles.module.scss";
import { useState } from "react";

export type DrawerPanelContent = {
  title: string,
  form?: "true" | "false",
  description?: string,
  size?: "default" | "large",
  type?: "form",
  buttons?: ButtonType[],
  content: {
    element: WidgetNamesType, // widget to render into the panel
    props?: object // props of widget
  }
}

type DrawerPanelType = {
  drawer: DrawerPanelContent,
  isOpen: boolean,
  onClose: () => void,
}

type ButtonType = {
  endPoint?: string,
  icon?: string,
  label?: string,
  badge?: string,
  type?: "default" | "text" | "link" | "primary" | "dashed",
  action?: "default" | "submit" | "reset",
}

const DrawerPanel = ({drawer, isOpen, onClose}: DrawerPanelType) => {
  const Component = widgets[drawer.content.element];
  // const filters = useSelector(selectFilters);
  const [form] = Form.useForm();
  const drawerProps = {...drawer.content.props};
  const [disableButtons, setDisableButtons] = useState<boolean>(false);

  if (drawer.type === "form") {
    // add form object to drawer
    drawerProps["form"] = form;
    drawerProps["disableButtons"] = setDisableButtons
  }

  // const generateInitialValues = () => {
  //   const iv = {};
  //   filters.forEach(f => {
  //     iv[f.fieldName] = f.fieldType === "datetime" ? dayjs(f.fieldValue as string) : f.fieldValue
  //   })
  //   return iv;
  // }

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
    <Drawer
      rootClassName={styles.drawer}
      title={drawer.title}
      size={drawer.size}
      onClose={onClose}
      open={isOpen}
      closable={true}
      destroyOnClose={true}
      extra={ // if contain FormGenerator only
        drawer.type === "form" &&
        <Space>
          {
            drawer.buttons?.map((but, i) => <Button key={`btn_${i}`} type={but.type} onClick={() => onClickButton(but.action)} disabled={disableButtons}>{but.label}</Button>)
          }
        </Space>
      }
    >
      <Space direction="vertical" className={styles.drawerContent}>
        <Typography.Paragraph>{drawer.description}</Typography.Paragraph>
        <Component
          {...drawerProps}
          // initialValues={drawer.type === "form" ? generateInitialValues() : undefined}
          onClose={onClose}
        />
      </Space>
    </Drawer>
  )
}

export default DrawerPanel;