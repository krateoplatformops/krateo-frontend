import { Result, Table } from "antd"

type TableDataType = {
  pageSize?: number
  columns: string,
  data?: string
}

type ColumnType = {
  key: string,
  title: string,
}

type DataType = {
  rowKey: string,
  dataRow: {
    columnKey: string,
    value: string,
  }[]
}

const TableData = ({pageSize = 10, columns, data}: TableDataType) => {
  let arrColumns: ColumnType[] = [];
  let arrData: DataType[] = [];
  let isError:unknown = undefined;
  let parsedColumns: {
    title: string,
    key: string,
    dataIndex: string
  }[] = [];

  try {
    if (typeof columns === "string") arrColumns = JSON.parse(columns)
    if (Array.isArray(columns)) arrColumns = columns

    if (typeof data === "string") arrData = JSON.parse(data)
    if (Array.isArray(data)) arrData = data

    parsedColumns = arrColumns.map((el) => (
      {
        title: el.title,
        key: el.key,
        dataIndex: el.key
      }
    ))
  } catch(error) {
    isError = error
  }

  return (
    isError ? (
      <Result
        status="warning"
        subTitle="Unable to get table data"
      />
    ): 
    <Table
      columns={parsedColumns}
      dataSource={arrData}
      pagination={{ defaultPageSize: pageSize }}
      scroll={{ x: 'max-content' }}
    />
  )
}

export default TableData