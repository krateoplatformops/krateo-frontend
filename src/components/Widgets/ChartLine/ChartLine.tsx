import ReactECharts from 'echarts-for-react';
import styles from "./styles.module.scss";
import { getColorCode } from '../../../utils/colors';
// import { theme } from "antd";

// const { useToken } = theme;

type ChartLineType = {
	color: "blue" | "darkBlue" | "orange" | "gray" | "red" | "green",
	data: {
		xValue: string | number,
		yValue: string | number,
	}[]
}

const ChartLine = ({color, data = []}: ChartLineType) => {
  // const { token } = useToken();

  const optionLine = {
    xAxis: {
      data: data.map(el => el.xValue) //['A', 'B', 'C', 'D', 'E']
    },
    yAxis: {},
    series: [
      {
        data: data.map(el => el.yValue), //[10, 22, 28, 23, 19],
        color: getColorCode(color),
        type: 'line',
        smooth: true
      }
    ]
  };

  return (
    <div className={styles.chart}>
      <ReactECharts option={optionLine} />
    </div>
  )
}

export default ChartLine;