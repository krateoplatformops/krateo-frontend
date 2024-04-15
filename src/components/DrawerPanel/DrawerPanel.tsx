import { Button, Drawer, Form, Space, Typography } from "antd"
import widgets from "../Widgets/index";
// import { useSelector } from "react-redux";
// import { selectFilters } from "../../features/dataList/dataListSlice";
// import dayjs from "dayjs";
import styles from "./styles.module.scss";

type DrawerPanelType = {
  panel: {
    title: string,
    description?: string,
    size?: "default" | "large",
    type?: "form",
    buttons?: ButtonType[],
    content: {
      element: string, // widget to render into the panel
      props?: object // props of widget
    }
  },
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

const DrawerPanel = ({panel, isOpen, onClose}: DrawerPanelType) => {
  const Component = widgets[panel.content.element];
  // const filters = useSelector(selectFilters);
  const [form] = Form.useForm();
  const panelProps = {...panel.content.props};

  if (panel.type === "form") {
    // add form object to panel
    panelProps["form"] = form;
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
      rootClassName={styles.panel}
      title={panel.title}
      size={panel.size}
      onClose={onClose}
      open={isOpen}
      closable={true}
      destroyOnClose={true}
      extra={ // if contain FormGenerator only
        panel.type === "form" &&
        <Space>
          {
            panel.buttons?.map((but, i) => <Button key={`btn_${i}`} type={but.type} onClick={() => onClickButton(but.action)}>{but.label}</Button>)
          }
        </Space>
      }
    >
      <Space direction="vertical" className={styles.panelContent}>
        <Typography.Paragraph>{panel.description}</Typography.Paragraph>
        <Component
          {...panelProps}
          // initialValues={panel.type === "form" ? generateInitialValues() : undefined}
          onClose={onClose} />
      </Space>
    </Drawer>
  )
}

export default DrawerPanel;