import ChartPie from "./ChartPie/ChartPie";
import ChartLine from "./ChartLine/ChartLine";
import ChartBars from "./ChartBars/ChartBars";
import ChartMultipleBars from "./ChartMultipleBars/ChartMultipleBars";
import ChartFlow from "./ChartFlow/ChartFlow";
import FormGenerator from "./FormGenerator/FormGenerator";
import Button from "./Button/Button";
import DataList from "./DataList/DataList";
import Panel from "./Panel/Panel";
import RichElement from "./RichElement/RichElement";
import RichRow from "./RichRow/RichRow";
import Paragraph from "./Paragraph/Paragraph";
import DynamicContent from "./DynamicContent/DynamicContent";
import EditableContent from "./EditableContent/EditableContent";
import EditableList from "./EditableList/EditableList";
import CardTemplate from "./CardTemplate/CardTemplate";
import TerminalPanel from "./TerminalPanel/TerminalPanel";
import TableData from "./TableData/TableData";
import YamlViewer from "./YamlViewer/YamlViewer";

const widgets = {
  "chartpie": ChartPie,
  "chartLine": ChartLine,
  "chartBars": ChartBars,
  "chartMultipleBars": ChartMultipleBars,
  "chartflow": ChartFlow,
  "card": CardTemplate,
  "formGenerator": FormGenerator,
  "button": Button,
  "datalist": DataList,
  "panel": Panel,
  "RichElement": RichElement,
  "richrow": RichRow,
  "DynamicContent": DynamicContent,
  "paragraph": Paragraph,
  "EditableContent": EditableContent,
  "EditableList": EditableList,
  "terminal": TerminalPanel,
  "tabledata": TableData,
  "yamlviewer": YamlViewer,
  "none": () => null
}

export type WidgetNamesType = string; //keyof typeof widgets;

export type WidgetType = {
  status: {
    uid: string,
    name: string,
    type: string,
    items: {
      actions: {
        path: string,
        verb: string
      }[],
      app: object
    }
  }
}

export default widgets;