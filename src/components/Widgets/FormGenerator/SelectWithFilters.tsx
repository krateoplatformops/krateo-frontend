import { useEffect, useState } from "react";
import { useLazyGetContentQuery } from "../../../features/common/commonApiSlice";
import useCatchError from "../../../hooks/useCatchError";
import { Select } from "antd";

const SelectWithFilters = ({node}) => {
	const [getContent] = useLazyGetContentQuery();
  const { catchError } = useCatchError();

	const [loading, setLoading] = useState(false);

  let options;

  useEffect(() => {
    const getOptions = async () => {
      try {
        setLoading(true)
        const result = await getContent({endpoint: node.endpoint}).unwrap()
        options = result.map(opt => ({value: opt, label: opt}))
        setLoading(false)
      } catch(error) {
        catchError({ message: "Unable to retrieve field data"})
      }
    }

    if (node.source) {
      options = node.source.map(opt => ({value: opt, label: opt}))
    }
    if (node.endpoint) {
      getOptions()
    }
  })
  
  return (
    <Select
      placeholder={node.description ? node.description : undefined}
      loading={loading}
      options={options}
      allowClear
      showSearch
      optionFilterProp="label"
    />
  )
}

export default SelectWithFilters