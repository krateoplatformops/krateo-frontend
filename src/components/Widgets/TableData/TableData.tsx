import { Table } from "antd"

type TableDataType = {
  pageSize?: number
  columns: {
    key: string
    title: string,
  }[],
  data: {
    rowKey: string
    dataRow: {
      columnKey: string,
      value: string
    }[]
  }[]
}

const TableData = ({pageSize = 10, columns, data}: TableDataType) => {

  const parsedData: unknown[] = []
  data.forEach((el) => {
    const rowObj = { key: el.rowKey }
    el.dataRow.forEach((rowEl) => {
      rowObj[rowEl.columnKey] = rowEl.value
    })
    parsedData.push(rowObj)
  })
  
  const parsedColumns = columns.map((el) => (
    {
      title: el.title,
      key: el.key,
      dataIndex: el.key
    }
  ))

  return (
    <Table
      columns={parsedColumns}
      dataSource={parsedData}
      pagination={{ defaultPageSize: pageSize }}
    />
  )
}

export default TableData