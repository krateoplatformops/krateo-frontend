import { useEffect, useState } from "react";
import { Anchor, App, Col, Form, FormInstance, Input, InputNumber, Radio, Result, Row, Select, Slider, Space, Switch, Typography } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useGetContentQuery, usePostContentMutation } from "../../../features/common/commonApiSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { DataListFilterType, setFilters } from "../../../features/dataList/dataListSlice";
import ListEditor from "../ListEditor/ListEditor";
import styles from "./styles.module.scss";
import Skeleton from "../../Skeleton/Skeleton";
import useCatchError from "../../../utils/useCatchError";
import SelectWithFilters from "./SelectWithFilters";

type FormGeneratorType = {
	title?: string,
	description?: string,
	descriptionTooltip: boolean,
	fieldsEndpoint?: string,
	form: FormInstance<any>,
	prefix?: string,
	onClose: () => void,
	disableButtons: (value: boolean) => void
}

const FormGenerator = ({title, description, descriptionTooltip = false, fieldsEndpoint, form, prefix, onClose, disableButtons }: FormGeneratorType) => {

	const [postContent, { data: postData, isLoading: postLoading, isSuccess: isPostSuccess, isError: isPostError, error: postError }] = usePostContentMutation();
	const { message } = App.useApp();
  const { catchError } = useCatchError();

	const dispatch = useAppDispatch();

	// get fields
	const {data, isLoading, isFetching, isSuccess, isError, error} = useGetContentQuery({endpoint: fieldsEndpoint?.replace("/form/", "/forms/")});
	const [formData, setFormData] = useState<any>("idle");
	const [formEndpoint, setFormEndpoint] = useState<string>();
	const fieldsData: {type: string, name: string}[] = [];

	useEffect(() => {
		if (isSuccess) {
			if (data?.status?.content?.schema?.properties) {
				setFormData(data.status.content.schema.properties); // set root node (/spec /metadata)
			} else {
				setFormData(undefined)
			}
			if (data?.status?.actions) {
				setFormEndpoint(data.status.actions.find(el => el.verb === "create")?.path); // set submit endpoint
			}
		}
	}, [data, isSuccess])

	const parseData = (node, name) => {
		if (node.properties) {
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
		} else {
			return []
		}
	}

	const renderMetadataFields = () => {
		if (formData && formData.metadata) {
			const fieldsList = parseData({ properties: {metadata: formData.metadata}, required: [], type: 'object' }, "");
			return fieldsList;
		}
	}

	const renderFields = () => {
		if (formData && formData.spec) {
			const fieldsList = parseData(formData.spec, "");
			return fieldsList;
		}
	}

	const generateInitialValues = () => {
		const parseData = (node, name) => {
			if (node.properties) {
				return Object.keys(node.properties).map(k => {
					const currentName = name ? `${name}.${k}` : k;
					if (node.properties[k].type === "object") {
						return parseData(node.properties[k], currentName)
					} else {
						// set default value
						if (node.properties[k].default) {
							form.setFieldValue(currentName.split("."), node.properties[k].default);
						}
					}
				})
			} else {
				return []
			}
		}
		if (formData.spec) parseData(formData.spec, "");
	}

	const renderLabel = (path: string, label: string) => {
		const breadcrumb = path.split(".");
		breadcrumb.splice(-1);

		return (
			<Space size="small" direction="vertical" className={styles.labelField}>
				<Typography.Text strong>{label}</Typography.Text>
				<Space title={breadcrumb.join(" > ")} className={styles.breadcrumb}>
				{
					breadcrumb.map((el, index) => {
						if (index < breadcrumb.length -1) {
							if (index === 2 && breadcrumb.length > 3) {
								return <Typography.Text key={`label_breadcrumb_${index}`} className={styles.breadcrumbDots}>... <span> &rsaquo; </span></Typography.Text>
							} else if (index > 2 && index < breadcrumb.length -1 && breadcrumb.length > 3) {
								return ""
							} else {
								return <Typography.Text key={`label_breadcrumb_${index}`} ellipsis>{el} <span> &rsaquo; </span></Typography.Text>
							}
						} else {
							return <Typography.Text key={`label_breadcrumb_${index}`} ellipsis>{el}</Typography.Text>
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
							name={name.split(".")}
							rules={rules}
							tooltip={descriptionTooltip && node.description ? node.description : undefined}
							extra={!descriptionTooltip && node.description ? node.description : undefined}
						>
							{node.enum ? (
								node.enum.length > 4 ? (
									<Select
										options={node.enum.map(opt => ({value: opt, label: opt}))}
										allowClear
									/>
								)
									:
									<Radio.Group>{node.enum.map((el) => <Radio key={`radio_${el}`} value={el}>{el}</Radio>)}</Radio.Group>
								) : 
								<Input />
							}
						</Form.Item>
					</div>
				)

			case "boolean": 
				form.setFieldValue(name.split("."), false);
				return (
					<div id={name} className={styles.formField}>
						<Space direction="vertical" style={{width: '100%'}}>
							<Form.Item
								key={name}
								label={renderLabel(name, label)}
								name={name.split(".")}
								valuePropName="checked"
								rules={rules}
								tooltip={descriptionTooltip && node.description ? node.description : undefined}
								extra={!descriptionTooltip && node.description ? node.description : undefined}
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
							name={name.split(".")}
							rules={rules}
							tooltip={descriptionTooltip && node.description ? node.description : undefined}
							extra={!descriptionTooltip && node.description ? node.description : undefined}
						>
							<ListEditor onChange={(values) => {form.setFieldValue(name, values)}} />
						</Form.Item>
					</div>
				)

			case "integer":
				form.setFieldValue(name.split("."), (node.minimum || 0));
				const min = node.minimum
				const max = node.maximum
				return (
					<div id={name} className={styles.formField}>
						<Form.Item
							key={name}
							label={renderLabel(name, label)}
							name={name.split(".")}
							rules={rules}
							tooltip={descriptionTooltip && node.description ? node.description : undefined}
							extra={!descriptionTooltip && node.description ? node.description : undefined}
						>
							{
								min && max && (max - min < 100) ?
								<Slider step={1} min={min} max={max} />
								:
								<InputNumber min={min ? min : 0} max={max ? max : undefined} step={1} style={{width: '100%'}} />
							}
						</Form.Item>
					</div>
				)
			
			case "selectWithFilters":
				return (
					<div id={name} className={styles.formField}>
						<Form.Item
							key={name}
							label={renderLabel(name, label)}
							name={name.split(".")}
							rules={rules}
							tooltip={descriptionTooltip && node.description ? node.description : undefined}
							extra={!descriptionTooltip && node.description ? node.description : undefined}
						>
							<SelectWithFilters node={node} />
						</Form.Item>
					</div>
				)
		}
	}

	const getAnchorList = () => {
		const parseData = (node, name) => {
			if (node.properties) {
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
			} else {
				return []
			}
		}
		if (formData.spec) return [...parseData(formData.spec, "")];
	}

	const onSubmit = async (values: object) => {
		// convert all dayjs date to ISOstring
		Object.keys(values).forEach(k => {
			if (dayjs.isDayjs(values[k])) {
				values[k] = (values[k] as unknown as Dayjs).toISOString()
			}
		});

		// send all data values to specific endpoint as POST
		if (formEndpoint) {
			// update endpoint
			const name = values['metadata'].name;
			const namespace = values['metadata'].namespace;
			const arrEndPoint = formEndpoint.split("/");

			// add namespace
			arrEndPoint.splice(arrEndPoint.length - 1, 0, "namespaces");
			arrEndPoint.splice(arrEndPoint.length - 1, 0, namespace);

			// add name at the end
			arrEndPoint.push(name);

			const postEndpoint = arrEndPoint.join("/");

			// remove metadata from values
			delete values['metadata']

			// update payload
			const payload = {
				"kind": data.status.content.kind,
				"apiVersion": data.status.content.apiVersion,
				"metadata":{
					"name": name,
					"namespace": namespace
				},
				"spec": values
			}
			
			// submit values
			if (!postLoading && !isPostError && !isPostSuccess) {
				try {
					await postContent({
						endpoint: postEndpoint,
						body: payload,
					});
					// close panel
					onClose()
				} catch(error) {
					catchError({ message: "Unable to send data"})
					// keep panel opened
				}
			}
		}

		// save all data values on Redux to use them with another linked component (same prefix) 
		if (prefix) {
			// save data on redux
			let filters: DataListFilterType[] = [];
			fieldsData.forEach((field, index) => {
				if (Object.values(values)[index] !== undefined) {
					filters = [...filters, {fieldType: field.type, fieldName: field.name, fieldValue: Object.values(values)[index]}]
				}
			})
			dispatch(setFilters({filters, prefix}))
			// close panel
			onClose()
		}
	}

	useEffect(() => {
		if (isPostError) {
			catchError(postError);
		}
	}, [catchError, isPostError, postError]);

	useEffect(() => {
		if (isPostSuccess) {
			message.success('Operation successful');
			// go to created element page if a specific props is true
			// navigate("");
		}
	}, [message, isPostSuccess, postData]);

	useEffect(() => {
    if (postLoading) {
			disableButtons(true)
      message.loading('Sending data...');
    } else {
			disableButtons(false)
		}
  }, [postLoading, message]);

	return (
		isLoading || isFetching ?
				<Skeleton />
		:
		formData && formData.spec && isSuccess ?
		<div className={styles.formGenerator}>
			<Typography.Text strong>{title}</Typography.Text>
			<Typography.Paragraph>{description}</Typography.Paragraph>
			<div className={styles.anchorWrapper}>
				<Row className={styles.anchorRow}>
						<Col className={styles.formWrapper} span={12}>
								<div className={styles.form} id="anchor-content">
										<Form
											form={form}
											layout="vertical"
											onFinish={onSubmit}
											name="formGenerator"
											autoComplete="off"
										>
											<div className={styles.metadataFields}>
												{ renderMetadataFields() }
											</div>
											<>
												{ renderFields() }
												{ generateInitialValues() }
											</>
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
		(formData === undefined || (formData && Object.keys(formData).length === 0)) && isSuccess ? <Result status="warning" title="Ops! Something didn't work" subTitle="Unable to retrieve content data" />
		:
		isError ?
			catchError(error, "result")
		:
		<></>
	)
}

export default FormGenerator;