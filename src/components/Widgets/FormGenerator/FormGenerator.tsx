import { useEffect, useState } from "react";
import { Anchor, App, Button, Col, Flex, Form, FormInstance, Input, InputNumber, Radio, Result, Row, Select, Slider, Space, Switch, Typography } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useGetContentQuery, usePostContentMutation, usePutContentMutation } from "../../../features/common/commonApiSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { DataListFilterType, setFilters } from "../../../features/dataList/dataListSlice";
import ListEditor from "../ListEditor/ListEditor";
import styles from "./styles.module.scss";
import Skeleton from "../../Skeleton/Skeleton";
import useCatchError from "../../../utils/useCatchError";
import SelectWithFilters from "./SelectWithFilters";
import _ from 'lodash';
import { ButtonType } from "../Button/Button";

type FormGeneratorType = {
	title?: string,
	description?: string,
	descriptionTooltip: boolean,
	fieldsEndpoint?: string,
	form: FormInstance<any>,
	simple?: boolean | string,
	prefix?: string,
	simpleButtons?: ButtonType[],
	onClose?: () => void,
	disableButtons?: (value: boolean) => void
}

const FormGenerator = ({title, description, descriptionTooltip = false, fieldsEndpoint, form, simple, prefix, onClose, disableButtons }: FormGeneratorType) => {
  const [simpleForm] = Form.useForm();

	// submit methods
	const [postContent, { isLoading: isPostLoading, isSuccess: isPostSuccess, isError: isPostError, error: postError }] = usePostContentMutation();
	const [putContent, { isLoading: isPutLoading, isSuccess: isPutSuccess, isError: isPutError, error: putError }] = usePutContentMutation();

	const { message } = App.useApp();
  const { catchError } = useCatchError();
	const dispatch = useAppDispatch();

	// get fields
	const {data, isLoading, isFetching, isSuccess, isError, error} = useGetContentQuery({endpoint: fieldsEndpoint?.replace("/form/", "/forms/")});
	const [formData, setFormData] = useState<any>("idle");
	const fieldsData: {type: string, name: string}[] = [];

	// old form
	const [formEndpoint, setFormEndpoint] = useState<string>();

	useEffect(() => {
		if (isSuccess) { // set root node
			if (data?.status?.content?.schema?.properties) {
				// old form
				setFormData(data.status.content.schema.properties)
				if (data?.status?.actions) {
					setFormEndpoint(data.status.actions.find(el => el.verb?.toLowerCase() === "post")?.path); // set submit endpoint
				}
			} else if (data?.status?.type?.toLowerCase() === "customform" && data?.status?.content?.schema) {
				setFormData(data.status.content.schema);
			} else {
				setFormData(undefined)
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

	// old form
	const renderMetadataFields = () => {
		if (formData && formData.metadata) {
			const fieldsList = parseData({ properties: {metadata: formData.metadata}, required: [], type: 'object' }, "");
			return fieldsList;
		}
	}

	const renderFields = () => {
		if (formData) {
			if (data?.status?.type === "customform") {
				return parseData({properties: formData}, "");
			} else if (formData.spec) {
				// old form
				return parseData(formData.spec, "");
			}
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
							if (form) {
								form.setFieldValue(currentName.split("."), node.properties[k].default);
							} else {
								simpleForm.setFieldValue(currentName.split("."), node.properties[k].default);
							}
						}
					}
				})
			} else {
				return []
			}
		}
		if (formData) {
			if (data?.status?.type === "customform") {
				parseData({properties: formData}, "");
			} else if (formData.spec) {
				// old form
				parseData(formData.spec, "");
			}
		}
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
				if (form) {
					form.setFieldValue(name.split("."), false);
				} else {
					simpleForm.setFieldValue(name.split("."), false);
				}
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
							<ListEditor onChange={(values) => { form ? form.setFieldValue(name.split("."), values) : simpleForm.setFieldValue(name.split("."), values) }} />
						</Form.Item>
					</div>
				)

			case "integer":
				if (form) {
					form.setFieldValue(name.split("."), (node.minimum || 0));
				} else {
					simpleForm.setFieldValue(name.split("."), (node.minimum || 0));
				}
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
							title: <span key={k} className={styles.anchorObjectLabel}>{k}</span>,
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
		if (formData) {
			if (data?.status?.type === "customform") {
				return [...parseData({properties: formData}, "")]
			} else if (formData.spec) {
				// old form
				return [...parseData(formData.spec, "")]
			}
		}
	}

	const convertStringToObject =(dottedString, value) => {
    const keys = dottedString.split('.');
    const result = {};
    let current = result;

    keys.forEach((key, index) => {
        if (index === keys.length - 1) {
            current[key] = value;
        } else {
            current[key] = {};
            current = current[key];
        }
    });

    return result;
	}

	const updateJson = (values, keyPath, valuePath) => {
		const getObjectByPath = (obj, path) => path
																						.split('.')
																						.reduce((acc, part) => acc && acc[part], obj);

		const substr = valuePath.replace("${", "").replace("}", "")
		const arr = substr.split("+").map(el => el.trim())
		let append = ""
		let jsonpath = ""
		arr.forEach(el => {
			if ((el.indexOf("\"") > -1) || (el.indexOf("'") > -1)) {
				append = el.replace(/"/g, '');
			} else {
				jsonpath = el
			}
		});
		const value = getObjectByPath(values, jsonpath) || ""; // value: "${ lorem.ipsum + \"-ns\" + \"-xy\" }"

		values = _.merge({}, values, convertStringToObject(keyPath, `${value}${append}`))

		return values;
	}

	const updateNameNamespace = (path, name, namespace) => {
		// add name and namespace on endpoint querystring from payload.metadata
		const qsParameters = path.split("?")[1].split("&").filter(el => el.indexOf("name=") === -1 && el.indexOf("namespace=") === -1).join("&")
		return `${path.split("?")[0]}?${qsParameters}&name=${name}&namespace=${namespace}` 
	}

	const onSubmit = async (values: object) => {
		try {
			// convert all dayjs date to ISOstring
			Object.keys(values).forEach(k => {
				if (dayjs.isDayjs(values[k])) {
					values[k] = (values[k] as unknown as Dayjs).toISOString()
				}
			});

			if (data?.status?.type === "customform") {
				// custom form submit
				if (data?.status?.actions?.length > 0) {
					const formProps = data.status.props
					const template = data.status.actions.find(el => ((el.template?.id?.toLowerCase() === formProps?.onSubmitId?.toLowerCase()) && (el.template?.verb.toLowerCase() === formProps?.onSubmitVerb.toLowerCase())))
	
					if (template?.template) {
						const formEndpoint = template.template.path;
						const formVerb = template.template.verb;
						const formOverride = template.template.payloadToOverride;
						const formKey = template.template.payloadFormKey || data.status.props.payloadFormKey || "spec";
						
						let payload = {...template.template.payload, ...values};
						
						// send all data values to specific endpoint as POST
						if (formEndpoint && formVerb) {
							// update payload by payloadToOverride
							if (formOverride?.length > 0) {
								formOverride.forEach(el => {
									payload = updateJson(payload, el.name, el.value)
								});
							}

							const valuesKeys = Object.keys(payload).filter(el => Object.keys(template.template.payload).indexOf(el) === -1);
							// move all values data under formKey
							payload[formKey] = {}
							valuesKeys.forEach(el => {
								payload[formKey][el] = typeof payload[el] === 'object' ? {...payload[el]} : payload[el]
								delete payload[el]
							})
	
							const endpointUrl = updateNameNamespace(formEndpoint, payload.metadata.name, payload.metadata.namespace)

							// submit payload
							switch (formVerb.toLowerCase()) {
								case "put":
									if (!isPutLoading && !isPutError && !isPutSuccess) {
										await putContent({
											endpoint: endpointUrl,
											body: payload,
										});
										// if into a panel -> close panel
										if (onClose) {
											onClose()
										} else {
											// clear form
											simpleForm.resetFields()
										}
									}
								break;
	
								case "post":
								default:
									if (!isPostLoading && !isPostError && !isPostSuccess) {
										await postContent({
											endpoint: endpointUrl,
											body: payload,
										});
										// if into a panel -> close panel
										if (onClose) {
											onClose()
										} else {
											// clear form
											simpleForm.resetFields()
										}
									}
								break;
							}
						}
					
					}
				}

			} else {
				// old form submit
				if (formEndpoint) {
					// update endpoint
					const name = values['metadata'].name;
					const namespace = values['metadata'].namespace;

					const endpointUrl = updateNameNamespace(formEndpoint, name, namespace)
		
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
					if (!isPostLoading && !isPostError && !isPostSuccess) {
						try {
							await postContent({
								endpoint: endpointUrl,
								body: payload,
							});
							// if into a panel -> close panel
							if (onClose) {
								onClose()
							} else {
								// clear form
								simpleForm.resetFields()
							}
						} catch(error) {
							catchError({ message: "Unable to send data"})
							// keep panel opened
						}
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
				// if into a panel -> close panel
				if (onClose) {
					onClose()
				} else {
					// clear form
					if (form) {
						form.resetFields()
					} else {
						simpleForm.resetFields()
					}
				}
			}
		} catch(error) {
			catchError(error)
		}
	}

	useEffect(() => {
		if (isPostError) {
			catchError(postError);
		}
		if (isPutError) {
			catchError(putError);
		}
	}, [catchError, isPostError, postError, isPutError, putError]);

	useEffect(() => {
		if (isPostSuccess || isPutSuccess) {
			message.success('Operation successful');
			// go to created element page if a specific props is true
			// navigate("");
		}
	}, [message, isPostSuccess, isPutSuccess]);

	useEffect(() => {
    if (isPostLoading || isPutLoading) {
			if (disableButtons) disableButtons(true)
      message.loading('Sending data...');
    } else {
			if (disableButtons) disableButtons(false)
		}
  }, [isPostLoading, isPutLoading, message]);

	const handleAnchorClick  = (
		e: React.MouseEvent<HTMLElement>,
	) => {
		e.preventDefault();
	};

	return (
		isLoading || isFetching  ?
			<Skeleton />
		:
		formData && isSuccess ? (
			simple === true || simple === "true" ? (
				<div className={styles.simpleForm}>
					<Typography.Text strong>{title}</Typography.Text>
					<Typography.Paragraph>{description}</Typography.Paragraph>
					<Form
						form={simpleForm}
						layout="vertical"
						onFinish={onSubmit}
						name="simpleForm"
						autoComplete="off"
					>
						{ (data?.status?.type !== "customform") &&
							<div className={styles.metadataFields}>
								{ renderMetadataFields() }
							</div>
						}
						<>
							{ renderFields() }
							{ generateInitialValues() }
						</>
					</Form>
					<Flex justify="flex-end" gap={5}>
						<Button type="text" htmlType="reset">Reset</Button>
						<Button type="primary" htmlType="submit">Submit</Button>
					</Flex>
				</div>
			)
			: (
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
										{ (data?.status?.type !== "customform") &&
											<div className={styles.metadataFields}>
												{ renderMetadataFields() }
											</div>
										}
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
									onClick={handleAnchorClick}
									getContainer={() => document.getElementById("anchor-content") as HTMLDivElement}
									items={getAnchorList()}
								/>
							</Col>
						</Row>
					</div>
				</div>
			)
		)
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