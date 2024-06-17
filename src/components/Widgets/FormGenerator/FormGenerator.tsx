import { useEffect, useState } from "react";
import { Anchor, App, Col, Form, FormInstance, Input, Radio, Row, Select, Slider, Space, Switch, Typography } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useGetContentQuery, usePostContentMutation } from "../../../features/common/commonApiSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { DataListFilterType, setFilters } from "../../../features/dataList/dataListSlice";
import ListEditor from "../ListEditor/ListEditor";
import styles from "./styles.module.scss";
import Skeleton from "../../Skeleton/Skeleton";
import useCatchError from "../../../utils/useCatchError";

type FormGeneratorType = {
	title?: string,
	description?: string,
	fieldsEndpoint?: string,
	form: FormInstance<any>,
	prefix?: string,
	onClose: () => void
}

const FormGenerator = ({title, description, fieldsEndpoint, form, prefix, onClose }: FormGeneratorType) => {

	const [postContent, { isLoading: postLoading, isSuccess: isPostSuccess, isError: isPostError, error: postError }] = usePostContentMutation();
	const { message } = App.useApp();
  const { catchError } = useCatchError();

	const dispatch = useAppDispatch();

	// get fields
	const {data, isLoading, isSuccess, isError, error} = useGetContentQuery({endpoint: fieldsEndpoint?.replace("/form/", "/forms/")});
	const [formData, setFormData] = useState<any>();
	const [formEndpoint, setFormEndpoint] = useState<string>();
	const fieldsData: {type: string, name: string}[] = [];

	useEffect(() => {
		if (data && isSuccess) {
			setFormData(data.status.content.schema.properties); // set root node (/spec /metadata)
			setFormEndpoint(data.status.actions.find(el => el.verb === "create")?.path); // set submit endpoint
		}
	}, [data, isSuccess])

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

	const renderMetadataFields = () => {
		const fieldsList = parseData({ properties: {metadata: formData.metadata}, required: [], type: 'object' }, "");
		return fieldsList;
	}

	const renderFields = () => {
		const fieldsList = parseData(formData.spec, "");
		return fieldsList;
	}

	const generateInitialValues = () => {
		const parseData = (node, name) => {
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
		}
		parseData(formData.spec, "");
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
						>
							<ListEditor onChange={(values) => {form.setFieldValue(name, values)}} />
						</Form.Item>
					</div>
				)

			case "integer":
				form.setFieldValue(name.split("."), (node.minimum || 0));
				return (
					<div id={name} className={styles.formField}>
						<Form.Item
							key={name}
							label={renderLabel(name, label)}
							name={name.split(".")}
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
		return [...parseData(formData.spec, "")];
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
			arrEndPoint.splice(arrEndPoint.length - 1, 0, "namespaces");
			arrEndPoint.splice(arrEndPoint.length - 1, 0, namespace);
			arrEndPoint.push(name);
			const postEndpoint = arrEndPoint.join("/");
			
			// remove metadata from values
			delete values['metadata']

			// update payload
			const payload = {
				"kind":"FireworksApp",
				"apiVersion":"composition.krateo.io/v0-1-0",
				"metadata":{
					"name": name,
					"namespace": namespace
				},
				"spec": values
			}

			// submit values
			if (!postLoading && !isPostError && !isPostSuccess) {
				const response = await postContent({
					endpoint: postEndpoint,
					body: payload,
				}).unwrap();
				if (response.code && response.code !== 200) {
					catchError();
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
		}

		// close panel
		onClose()
	}

	useEffect(() => {
		if (isPostError) {
			catchError(postError);
		}
	}, [catchError, isPostError, postError]);

	useEffect(() => {
		if (isPostSuccess) {
			message.success('Operation successful');
		}
	}, [message, isPostSuccess]);

	useEffect(() => {
    if (isLoading || postLoading) {
      message.loading('Receiving data...');
    }
  }, [isLoading, postLoading, message]);

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
											{ renderFields() }
											{ generateInitialValues() }
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
			catchError(error, "result")
		:
		<></>
	)
}

export default FormGenerator;