import { Result, theme } from 'antd';
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
  let arrSeries = series;
  let optionPie = {};
  let isError:unknown = undefined;

  try {
    if (typeof arrSeries === "string") arrSeries = JSON.parse(arrSeries);
    if (!Array.isArray(arrSeries)) arrSeries = [arrSeries];

    const { token } = useToken();
    const ringWidth = 15 - (2 * (arrSeries.length - 1))

    optionPie = {
      title: {
        text: title,
        textStyle: {
          fontSize: 44 - (2 * arrSeries.length),
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
      series: arrSeries.map((serie, index) => (
        {
          type: 'pie',
          radius: [`${(100 - ringWidth) - (ringWidth * index)}%`, `${100 - (ringWidth * index)}%`],
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
  } catch(error) {
    isError = error
  }
 
  return (
  <div className={styles.wrapper}>
    { isError ? (
      <Result
        status="warning"
        subTitle="Unable to get chart data"
      />
    ): 
      <ReactECharts option={optionPie} className={styles.chart} />
    }
  </div>
  )
}

export default ChartPie;