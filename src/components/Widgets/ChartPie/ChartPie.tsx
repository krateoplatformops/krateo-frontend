// import { theme } from 'antd';
// import { RingProgress } from '@ant-design/plots';
import styles from "./styles.module.scss";

type ChartPieType = {
  label?: string;
  value: number;
  total: number;
  status: "default" | "error" | "warning"
}

// const { useToken } = theme;

const ChartPie = ({label, value, total/*, status */}: ChartPieType) => {
  // const { token } = useToken();

  // const getColor = () => {
  //   const bgcolor = token.colorBorder;

  //   switch (status) {
  //     case 'error':
  //       return [token.colorError, bgcolor]
  //     case 'warning':
  //       return [token.colorWarning, bgcolor]
  //     default:
  //       return [token.colorLink, bgcolor]
  //   }
  // };

  // const config = {
  //   animation:false,
  //   autoFit: true,
  //   percent: 1 / total * value,
  //   innerRadius: .85,
  //   radius: 1,
  //   color: getColor(),
  //   statistic: undefined,
  // }
  
  return (
  <div className={styles.chart}>
    {/* <RingProgress {...config} /> */}
    <div className={styles.details}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
      <div className={styles.total}>/{total}</div>
    </div>
  </div>
  )
}

export default ChartPie;