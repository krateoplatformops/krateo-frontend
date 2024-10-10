import { Progress } from "antd";
import styles from "./styles.module.scss";

type ChartBarsType = {
  data: {
    label: string;
    value: string;
    percentage: number;
    color: "success" | "normal" | "exception" | "active";
  }[]
}

const ChartBars = ({data}: ChartBarsType) => {
  return (
    <div className={styles.chart}>
      {
        data.map((el, i) => (
          <div key={`ChartBars_${i}`} className={styles.chartBarsRow}>
            <div className={styles.chartBarsData}>
              <div className={styles.chartBarsLabel}>{el.label}</div>
              <div className={styles.chartBarsValue}>{el.value}</div>
            </div>
            <Progress
              className={styles.chartBarsProgress}
              percent={el.percentage}
              size="small"
              status={el.color}
              showInfo={false}
            />
          </div>
        ))
      }
    </div>
  )
}

export default ChartBars;