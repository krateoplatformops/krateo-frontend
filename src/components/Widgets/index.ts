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
import CardTemplateList from "./CardTemplateList/CardTemplateList";

const widgets = {
  "ChartPie": ChartPie,
  "ChartLine": ChartLine,
  "ChartBars": ChartBars,
  "ChartMultipleBars": ChartMultipleBars,
  "ChartFlow": ChartFlow,
  "CardTemplateList": CardTemplateList,
  "FormGenerator": FormGenerator,
  "Button": Button,
  "DataList": DataList,
  "Panel": Panel,
  "RichElement": RichElement,
  "RichRow": RichRow,
  "DynamicContent": DynamicContent,
  "Paragraph": Paragraph,
  "EditableContent": EditableContent,
  "EditableList": EditableList,
}

export default widgets;