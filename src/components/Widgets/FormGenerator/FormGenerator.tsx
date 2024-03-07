import { useEffect, useState } from "react";
import { Anchor, Col, Form, Input, Radio, Result, Row, Select, Slider, Space, Switch, Typography, message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useGetContentQuery, usePostContentMutation } from "../../../features/common/commonApiSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { DataListFilterType, setFilters } from "../../../features/dataList/dataListSlice";
import ListEditor from "../ListEditor/ListEditor";
import styles from "./styles.module.scss";
import Skeleton from "../../Skeleton/Skeleton";

const FormGenerator = ({title, description, endpoint, fieldsEndpoint, form, prefix, onClose }) => {

	const [postContent, { isLoading: postLoading, isError: postError }] = usePostContentMutation();
	const messageKey = 'formGeneratorMessageKey';
	const [messageApi, contextHolder] = message.useMessage();
	const dispatch = useAppDispatch();

	// get fields
	const ls = localStorage.getItem("user");
	const username = ls && JSON.parse(ls)?.user.username;
	const group = ls && JSON.parse(ls)?.groups[0]
	const {data, isLoading, isSuccess, isError} = useGetContentQuery({endpoint: `${fieldsEndpoint}?sub=${username}&orgs=${group}&namespace=demo-system`});
	const [formData, setFormData] = useState();
	const fieldsData: {type: string, name: string}[] = [];

	useEffect(() => {
			if (data) {
					setFormData(data.status.content.schema.properties.spec); //set root node
			}
	}, [data])

	const renderFields = () => {
		
		const parseData = (node, name) => {
			return Object.keys(node.properties).map(k => {
                const currentName = name ? `${name}.${k}` : k;
				if (node.properties[k].type === "object") {
					return parseData(node.properties[k], currentName)
				} else {
					// return field
          const required = Array.isArray(node?.required) && node.required.indexOf(k) > -1;
					fieldsData.push({type: node.properties[k].type, name: currentName});
					return renderField(k, currentName, node.properties[k], required);
				}
			})
		}
		const fieldsList = parseData(formData, "");
		return fieldsList;
	}

	const generateInitialValues = () => {
		let defaultValues = {};

		const parseData = (node) => {
			Object.keys(node).forEach(k => {
				if (node[k].type === "object") {
					// recoursive call
					parseData(node[k].properties);
				} else {
					// add default value
					if (node[k].default) {
						defaultValues = Object.assign(defaultValues, {[k]: node[k].default});
					}
				}
			})
		}

		parseData(formData);
		return defaultValues;
	}

	const renderLabel = (path: string, label: string) => {
		const breadcrumb = path.split(".");
		breadcrumb.splice(-1);

		return (
			<Space size="small" direction="vertical" className={styles.labelField}>
				<Typography.Text strong>{label}</Typography.Text>
				<Space title={breadcrumb.join(" > ")}>
				{
					breadcrumb.map((el, index) => {
						if (index < breadcrumb.length -1) {
							if (index === 2 && breadcrumb.length > 3) {
								return <Typography.Text className={styles.breadcrumbDots}>... <span> &rsaquo; </span></Typography.Text>
							} else if (index > 2 && index < breadcrumb.length -1 && breadcrumb.length > 3) {
								return ""
							} else {
								return <Typography.Text ellipsis>{el} <span> &rsaquo; </span></Typography.Text>
							}
						} else {
							return <Typography.Text ellipsis>{el}</Typography.Text>
						}
					})
				}
				</Space>
			</Space>
		)
	}

	const renderField = (label: string, name: string, node: any, required: boolean) => {
		const rules: any[] = [];
		if (required) {
			rules.push({required: true, message: "Insert a value"})
		}
		if (node.pattern) {
			rules.push({pattern: node.pattern, message: "Insert right value"})
		}
		
		switch (node.type) {
			case "string":
				return (
					<div id={name} className={styles.formField}>
							<Form.Item
									key={name}
									label={renderLabel(name, label)}
									name={name}
									rules={rules}
							>
									{node.enum ? (
											node.enum > 4 ? (
													<Select
															placeholder={node.description ? node.description : undefined}
															options={node.enum.map(opt => ({value: opt, label: opt}))}
															allowClear
													/>
											)
													:
													<Radio.Group>{node.enum.map((el) => <Radio key={`radio_${el}`} value={el}>{el}</Radio>)}</Radio.Group>
											) : 
											<Input
													placeholder={node.description ? node.description : undefined}
											/>
									}
							</Form.Item>
					</div>
				)

			case "boolean": 
				return (
					<div id={name} className={styles.formField}>
							<Space direction="vertical" style={{width: '100%'}}>
									<div>{renderLabel(name, label)}</div>
									<Form.Item
											key={name}
											name={name} 
											valuePropName="checked"
											rules={rules}
									>
											<Switch />
									</Form.Item>
							</Space>
					</div>
				)

			case "array":
				return (
					<div id={name} className={styles.formField}>
							<Form.Item
									key={name}
									label={renderLabel(name, label)}
									name={name}
									rules={rules}
							>
									<ListEditor onChange={(values) => {form.setFieldValue(name, values)}} />
							</Form.Item>
					</div>
				)

			case "integer":
				return (
					<div id={name} className={styles.formField}>
							<Form.Item
									key={name}
									label={renderLabel(name, label)}
									name={name}
									rules={rules}
							>
									<Slider step={1} min={node.minimum ? node.minimum : 0} max={node.maximum ? node.maximum : 100} />
							</Form.Item>
					</div>
				)
		}
	}

	const getAnchorList = () => {
			const parseData = (node, name) => {
		return Object.keys(node.properties).map(k => {
							const currentName = name ? `${name}.${k}` : k;
			if (node.properties[k].type === "object") {
				// create children
				return {
					key: currentName,
					title: <span className={styles.anchorObjectLabel}>{k}</span>,
					children: parseData(node.properties[k], currentName),
				}
			} else {
				// return obj
				return {
						key: currentName,
						href: `#${currentName}`,
						title: k
				}
			}
		})
	}

	return [...parseData(formData, "")];
	}

	const onSubmit = (values: object) => {
		// convert all dayjs date to ISOstring
		Object.keys(values).forEach(k => {
			if (dayjs.isDayjs(values[k])) {
				values[k] = (values[k] as unknown as Dayjs).toISOString()
			}
		});

		// send all data values to specific endpoint as POST
		if (endpoint) {
			// call endpoint
			postContent({
				endpoint: endpoint,
				body: values,
			})
		}

		// save all data values on Redux to use them with another linked component (same prefix) 
		if (prefix) {
			// apply filters
			let filters: DataListFilterType[] = [];
			fieldsData.forEach((field, index) => {
				if (Object.values(values)[index] !== undefined) {
					filters = [...filters, {fieldType: field.type, fieldName: field.name, fieldValue: Object.values(values)[index]}]
				}
			})
			dispatch(setFilters(filters))
      // close panel
			onClose()
		}
	}

	useEffect(() => {
		if (postError) {
			messageApi.open({key: messageKey, type: 'error', content: 'The operation couldn\'t be completed'});
		}
	}, [messageApi, postError]);

	useEffect(() => {
    if (isLoading || postLoading) {
      messageApi.open({key: messageKey, type: 'loading', content: 'Sending data...'});
    }
  }, [isLoading, postLoading, messageApi]);

	return (
		isLoading ?
				<Skeleton />
		:
		formData && isSuccess ?
		<div className={styles.formGenerator}>
			<Typography.Text strong>{title}</Typography.Text>
			<Typography.Paragraph>{description}</Typography.Paragraph>
			<div className={styles.anchorWrapper}>
				<Row className={styles.anchorRow}>
						{contextHolder}
						<Col className={styles.formWrapper} span={12}>
								<div className={styles.form} id="anchor-content">
										<Form
											form={form}
											layout="vertical"
											onFinish={onSubmit}
											name="formGenerator"
											autoComplete="off"
											initialValues={generateInitialValues()}
										>
											{ renderFields() }
										</Form>
								</div>
						</Col>

						<Col span={12} className={styles.anchorLabelWrapper}>
								<Anchor
									affix={false}
									getContainer={() => document.getElementById("anchor-content") as HTMLDivElement}
									items={getAnchorList()}
								/>
						</Col>
				</Row>
			</div>
		</div>
		:
		isError ?
		<Result
				status="warning"
				title="Data error"
				subTitle="There seems to be a problem getting data"
		/>
		:
		<></>
	)
}

export default FormGenerator;