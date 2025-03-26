import ReactECharts from 'echarts-for-react';
import styles from "./styles.module.scss";
import { getColorCode } from '../../../utils/colors';
import { Empty } from 'antd';

type ChartLineType = {
	color: "blue" | "darkBlue" | "orange" | "gray" | "red" | "green",
	data: string
  legendName?: string
  xAxisName?: string
  yAxisName?: string
}

type ChartLineData = {
  xValue: string | number,
  yValue: string | number,
}[]

const ChartLine = ({color, data = "[]", legendName, xAxisName, yAxisName}: ChartLineType) => {
  let parsedData: ChartLineData = [];

  try {
    parsedData = JSON.parse(data);
  } catch (error) {
    console.error("Error parsing ChartLine data:", error);
  }

  parsedData = [{
    xValue: 1,
    yValue: 2,
  }]

  if (!parsedData) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  }

  const optionLine = {
    grid: {
      left: '15%',
      bottom: '25%',
    },
    legend: {
      data: [legendName],
      bottom: 0,
    },
    xAxis: {
      name: xAxisName,
      data: parsedData?.map(el => el.xValue), //['A', 'B', 'C', 'D', 'E'],
      axisLabel: {
        rotate: 45,
      }
    },
    yAxis: {
      name: yAxisName,
    },
    series: [
      {
        name: legendName,
        data: parsedData?.map(el => el.yValue), //[10, 22, 28, 23, 19],
        color: getColorCode(color),
        type: 'line',
        smooth: true,
      }
    ]
  };

  return (
    <div className={styles.chart}>
      <ReactECharts option={optionLine} style={{height: '400px'}} />
    </div>
  )
}

export default ChartLine;