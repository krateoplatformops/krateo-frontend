import { theme } from 'antd';
import ReactECharts from 'echarts-for-react';
import { getColorCode } from '../../../utils/colors';
import styles from "./styles.module.scss";

type ChartPieType = {
  title?: string;
  description?: string;
  series: {
    total: number,
    data: {
      color: "blue" | "darkBlue" | "orange" | "gray" | "red" | "green",
      value: number,
      label: string
    }[]
  }[]
}

const { useToken } = theme;

const ChartPie = ({title, description, series}: ChartPieType) => {
  const { token } = useToken();
  const ringWidth = 15 - (2 * (series.length - 1))

  const optionPie = {
    title: {
      text: title,
      textStyle: {
        fontSize: 44 - (2 * series.length),
        fontWeight: 400
      },
      subtext: description,
      subtextStyle: {
        fontSize: 18,
      },
      textAlign: 'center',
      textVerticalAlign: 'auto',
      left: '50%',
      top: '38%',
    },
    tooltip: {},
    series: series.map((serie, index) => (
      {
        type: 'pie',
        radius: [`${(90 - ringWidth) - (ringWidth * index)}%`, `${90 - (ringWidth * index)}%`],
        itemStyle: {
          borderRadius: 5,
          borderColor: "#FFF",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center'
        },
        labelLine: {
          show: false
        },
        data: [...serie.data.map(el => (
          {
            value: el.value,
            name: el.label,
            itemStyle: {
              color: getColorCode(el.color)
            }
          }
        )), {
          value: serie.total - serie.data.reduce((total, el) => total + el.value, 0),
          emphasis: {
            disabled: true
          },
          tooltip: {
            show: false
          },
          itemStyle: {
            color: token.colorBorder
          }
        }]
      }
    ))
  };
 
  return (
  <div className={styles.wrapper}>
    <ReactECharts option={optionPie} className={styles.chart} />
  </div>
  )
}

export default ChartPie;