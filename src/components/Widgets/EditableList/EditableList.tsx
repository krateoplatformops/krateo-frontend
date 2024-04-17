import { DeleteOutlined, ExclamationCircleFilled, HolderOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance, Input, List, Modal, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { generate_uuidv4 } from "../../../utils/uuid";
import { usePostContentMutation } from "../../../features/common/commonApiSlice";
import { selectEditableContent, setEditableContent, setEditableContentState } from "../../../features/editableContent/editableContentSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useSelector } from "react-redux";
import { setDynamicContent } from "../../../features/dynamicContent/dynamicContentSlice";


type EditableListElement = { id: string, label: string }

type EditableListType = {
	description?: string,
  data?: EditableListElement[],
	form: FormInstance<any>,
	prefix: string,
	endpoint: string,
	onClose: () => void
}

const EditableList = ({ description, form, endpoint, prefix, data = [], onClose }: EditableListType) => {
  const [currentString, setCurrentString] = useState<string>();
	const [postContent, { isLoading, isSuccess, isError }] = usePostContentMutation();
	const dispatch = useAppDispatch();
  const { confirm } = Modal;

  const contents = useSelector(selectEditableContent);
  
  // if exists on redux with prefix, use it instead props
  const [list, setList] = useState<EditableListElement[]>(data);

  useEffect(() => {
    const content = contents.find(el => el.prefix === prefix);
    if (content?.content)
    setList(content?.content ? content.content as unknown as EditableListElement[] : data);

  }, [contents, data, prefix])

  const onSubmit = async (values) => {
    if (endpoint) {
			// submit values
			if (!isLoading && !isError && !isSuccess) {
				const response = await postContent({
					endpoint: endpoint,
					body: values,
				}).unwrap();
        // update list
        dispatch(setDynamicContent({prefix: prefix, status: "success", content: response}))
			}
		}

    // save editable data on redux
    dispatch(setEditableContent({ prefix, status: "success", content: values.list }))

    // close panel
		onClose()
  }

  const onAdd = () => {
    if (currentString && currentString !== "") {
      const newList = [...list, {id: generate_uuidv4(), label: currentString}];
      setList(newList);
    }
  }

  const onDrag = (event) => {
    // swap elements
    const indexFrom: number = event.source.index;
    const indexTo: number = event.destination.index;
    const newList = [...list];
    newList[indexFrom] = newList.splice(indexTo, 1, newList[indexFrom])[0];
    setList(newList);
  }

  const updateList = (id: string, label: string) => {
    const newList = list.map(el => el.id === id ? {id, label} : el);
    setList(newList);
  }
  
  const showConfirm = (id: string) => {
    confirm({
      title: 'Are you sure to remove the element?',
      icon: <ExclamationCircleFilled />,
      content: 'All contents related will be removed with the element',
      onOk() {
        // remove element
        const newList = list.filter(el => el.id !== id);
        setList(newList);
      },
      onCancel() {},
    });
  }

  useEffect(() => {
    if (isLoading) {
      dispatch(setEditableContentState({prefix: prefix, status: "loading"}));
    }
    if (isError) {
      dispatch(setEditableContentState({prefix: prefix, status: "error"}));
    }
  }, [dispatch, isError, isLoading, prefix]);

  useEffect(() => {
    form.setFieldValue("list", list);
  }, [form, list])

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Paragraph>{description}</Typography.Paragraph>

      <Space.Compact style={{ width: '100%' }}>
        <Input onChange={(value) => setCurrentString(value.target.value)} />
        <Button type="primary" onClick={onAdd}><PlusCircleOutlined /></Button>
      </Space.Compact>

      <DragDropContext onDragEnd={onDrag}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
            <List
              dataSource={list}
              renderItem={(item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <List.Item
                        key={item.id}
                        actions={[
                          <Button
                            type="text"
                            shape="circle"
                            icon={<DeleteOutlined />}
                            onClick={() => showConfirm(item.id)}
                          />
                        ]}
                      >
                        <Space>
                          <HolderOutlined />
                          <Input defaultValue={item.label} onChange={(event) => updateList(item.id, event.target.value)} />
                        </Space>
                      </List.Item>
                    </div>
                  )}
                </Draggable>
              )}
            />
    
            {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Form
        form={form}
        onFinish={onSubmit}
      >
        <Form.Item name="list"></Form.Item>
      </Form>

    </Space>
  )
}

export default EditableList;