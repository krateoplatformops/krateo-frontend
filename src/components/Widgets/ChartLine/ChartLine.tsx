import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import styles from "./styles.module.scss";
import { getColorCode } from "../../../utils/colors";
import { Empty } from "antd";

type LineColor = "blue" | "darkBlue" | "orange" | "gray" | "red" | "green";

type ChartLineDataPoint = {
  xValue: string | number;
  yValue: string | number;
};

type ChartLineInput = {
  color: LineColor;
  data: string;
  legendName: string;
};

type ChartLineProps = {
  lines: string;
  xAxisName?: string;
  yAxisName?: string;
};

const ChartLine: React.FC<ChartLineProps> = ({
  lines,
  xAxisName,
  yAxisName,
}) => {
  const parsedLines = useMemo(() => {
    if (!lines) return [];

    try {
      const parsedData = JSON.parse(lines) as ChartLineInput[];

      return parsedData.map((line) => {
        try {
          const parsedData = JSON.parse(line.data) as ChartLineDataPoint[];
          return { ...line, parsedData };
        } catch (error) {
          console.error("Error parsing ChartLine data:", error, line);
          return { ...line, parsedData: [] };
        }
      });
    } catch (error) {
      console.error("Error parsing ChartLine lines:", error);
      return [];    
    }
  }, [lines]);

  const isEmpty = !lines || parsedLines?.every((line) => line.parsedData.length === 0);

  if (isEmpty) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  const xValues = parsedLines?.[0].parsedData.map((el) => el.xValue);

  const optionLine = {
    grid: {
      left: "15%",
      bottom: "30%",
    },
    legend: {
      data: parsedLines?.map((line) => line.legendName),
      bottom: 0,
    },
    xAxis: {
      name: xAxisName,
      data: xValues,
      axisLabel: {
        rotate: 45,
      },
    },
    yAxis: {
      name: yAxisName,
    },
    series: parsedLines.map((line) => ({
      name: line.legendName,
      data: line.parsedData.map((el) => el.yValue),
      color: getColorCode(line.color),
      type: "line",
      smooth: true,
    })),
  };

  return (
    <div className={styles.chart}>
      <ReactECharts option={optionLine} style={{ height: "400px" }} />
    </div>
  );
};

export default ChartLine;