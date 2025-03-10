# Krateo Frontend

## Installation

Clone repository on your machine

Install dependencies

```sh
npm install
```

## Start in local

Launch application

```sh
$ export "VITE_BACKEND_API_BASE_URL=http://4.209.37.15:8081" && export "VITE_AUTHN_API_BASE_URL=http://51.138.231.131:8080" && npm run dev
```

## Deploying

Build application

```sh
$ export "VITE_BACKEND_API_BASE_URL=http://20.105.44.127:8080" && export "VITE_AUTHN_API_BASE_URL=http://51.138.231.131:8080" &&  npm run vite build
```

Copy content of _/build_ folder in your web server

## Widget List

### Button

![Button](/widgets-samples/button.png)

#### Properties

```
{
  icon?: string,
  label?: string,
  badge?: boolean,
  type?: "default" | "text" | "link" | "primary" | "dashed",
  action?: "default" | "submit" | "reset",
  prefix?: string,
  actions?: {
    path: string,
    verb: "get" | "delete",
  }[],
  verb?: "get" | "delete",
}
```

#### Example

```
{
  icon: "fa-gear",
  label: "click here!",
  badge: false,
  type: "default",
  action: "default",
  prefix: "filtersCompositions",
  actions: [
	  {
	    path: "/lorem/ipsum/dolor",
	    verb: "get",
	  }
  ],
  verb: "get",
}
```

### CardTemplate

![CardTemplate](/widgets-samples/card.png)

#### Properties

```
{
	id: string,
 	icon: string,
 	color: "blue" | "darkBlue" | "orange" | "gray" | "red" | "green",
 	title: string,
 	status: string,
 	date: string,
 	content: string,
 	tags: string,
 	actions: {
 		verb: "get" | "delete" | "put" | "post",
 		path: string,
 	}[],
 	panel: string
}
```

#### Example

```
{
	id: "e35ac33c-bd86-4301-83ee-c14236691a74",
 	icon: "fa-gear",
 	color: "blue",
 	title: "This is the card title",
 	status: "pending",
 	date: "06/05/2024",
 	content: "lorem ipsum",
 	tags: "lorem, ipsum, dolor",
 	actions: [
	  {
	    path: "/lorem/ipsum/dolor",
	    verb: "get",
	  }
  ],
 	panel: "true",
}
```

### ChartBars

![ChartBars](/widgets-samples/chartbars.png)

#### Properties

```
{
  data: {
	  label: string;
	  value: string;
	  percentage: number;
	  color: "success" | "normal" | "exception" | "active";
  }[];
}
```

#### Example

```
{
  data: [
	  {
		  label: "Downtime";
		  value: "15";
		  percentage: 12;
		  color: "exception";
	  }
	];
}
```

### ChartFlow

![ChartFlow](/widgets-samples/chartflow.png)

#### Properties

```
{
	uid: string,
	name: string,
	kind: string,
	icon: string,
	health: {
		status: "Available" | "Healty" | "Progressing" | "Degraded" | "Suspended" | "Missing" | "Unknown"
	}
	status: "OutOfSync" | "Synced"
	version: string,
	createdAt: string,
	namespace: string,
	parentRefs: {
		uid: string,
	}[]
}[]
```

#### Example

```
[
	{
		uid: "ad8a8b68-40e7-4eb0-aac0-58df5ccd4820",
		name: "fire-firefire-ingress",
		kind: "Ingress",
		icon: "fa-shuffle",
		health: {
	    "status": "Healty"
	 	},
		status: "OutOfSync",
		version:"v1",
		createdAt:"2024-05-02T07:15:03Z",
		namespace:"fire-firefire-ns",
		parentRefs: [
			{
				uid:"e35ac33c-bd86-4301-83ee-c14236691a74",
			}
		]
	}
]
```

### ChartLine

![ChartLine](/widgets-samples/chartline.png)

#### Properties

```
{
	color: "blue" | "darkBlue" | "orange" | "gray" | "red" | "green",
	data: {
		xValue: string | number,
		yValue: string | number,
	}[]
}
```

#### Example

```
{
	color: "blue",
	data: {
		xValue: "2010-01",
		yValue: 1998,
	}[]
}
```

### ChartMultipleBars

![ChartMultipleBars](/widgets-samples/chartmultiplebars.png)

#### Properties

```
{
	data: {
		label: string,
		bars: {
			value: string,
			percentage: number,
			color: "success" | "normal" | "exception" | "active",
		}[]
	}[]
}
```

#### Example

```
{
	data: [
		{
	    label: "MySQL",
	    bars: [
	      {
	        value: "82",
	        percentage: 48,
	        color: "normal"
	      },
	      {
	        value: "63",
	        percentage: 23,
	        color: "exception"
	      },
	    ]
	  }
  ]
}
```

### ChartPie

![ChartPie](/widgets-samples/chartpie.png)

#### Properties

```
{
	title?: string;
  description?: string;
  series: {
    total: number,
    data: {
      color: "blue" | "darkBlue" | "orange" | "gray" | "red" | "green",
      value: number,
      label: string
    }[]
  }[]
}
```

#### Example

```
{
	title="5896",
  description="Licenses",
	series={[
		{
			total: 5000,
			data: [
				{
					color: "blue",
					value: 1890,
					label: "label #1"
				},
				{
					color: "darkBlue",
					value: 1415,
					label: "label #2"
				},
			]
		},
		{
			total: 2000,
			data: [
				{
					color: "red",
					value: 495,
					label: "label #3"
				}
			]
		}
	]}
}
```

### DataList

#### Properties

```
{
	prefix: string,
	data: {
		kind: string,
		spec: {
			app: {
			 props: {
			 	// widget (es: RichRow)
			 }
			}
		}
	}[],
	asGrid: boolean
}
```

#### Example

```
{
	prefix: "compositionsFiltered",
	data: {
		kind: "card",
		spec: {
			app: {
			 props: {
			 	// widget (es: Card Template)
			 }
			}
		}
	}[],
	asGrid: boolean
}
```

### DynamicContent

#### Properties

{
prefix: string,
content: {
kind: string,
spec: {
// widget (es: RichRow)
}
}[]
}

#### Example

{
prefix: "documentList",
content: {
kind: "Paragraph",
spec: {
// widget (es: RichRow)
}
}[]
}

### EditableContent

/_
WIP: miss update and check markdown editor
_/
{
text: string,
editEndpoint: string
}

### EditableList

/_
WIP: miss update, add, remove, fields sort
_/
{
description?: string,
data?: { id: string, label: string }[],
prefix: string,
endpoint: string,
}

### EventsList

![EventsList](/widgets-samples/eventlist.png)

#### Properties

```
{
  sseEndpoint?: string,
  sseTopic?: string,
  events: {
  	metadata: {
  		uid: string,
  		creationTimestamp: string,
  	},
  	reason: string,
  	icon: string,
  	type: string,
  	message: string,
  	involvedObject: {
  		name: string,
  		namespace: string,
  		kind: string,
  		apiVersion: string
  	}
  }[],
}
```

#### Example

```
{
  sseEndpoint: "/lorem/ipsum",
  sseTopic: "test",
  events: {
  	metadata: {
  		uid: "e35ac33c-bd86-4301-83ee-c14236691a74",
  		creationTimestamp: "01/05/2024 15:28:45",
  	},
  	reason: "lorem ipsum dolor sit amet",
  	icon: "fa-gear",
  	type: "Normal",
  	message: "lorem ipsum dolor sit amet",
  	involvedObject: {
  		name: "lorem ipsum dolor sit amet",
  		namespace: "lorem ipsum dolor sit amet",
  		kind: "lorem ipsum dolor sit amet",
  		apiVersion: "lorem ipsum dolor sit amet"
  	}
  }[],
}
```

### FormGenerator

![FormGenerator](/widgets-samples/formgenerator.png)

#### Properties

```
{
	title?: string,
	description?: string,
	fieldsEndpoint?: string,
	descriptionTooltip: boolean,
	prefix?: string,
}
```

#### Example

```
{
	title: "lorem ipsum dolor sit amet",
	description: "lorem ipsum dolor sit amet",
	fieldsEndpoint: "/lorem/ipsum",
	descriptionTooltip: true,
	prefix: "filtersCompositions",
}
```

### Panel

![Panel](/widgets-samples/panel.png)

#### Properties

```
{
	title: string,
	tooltip: string,
	content: {
		// other widget
	}
}
```

#### Example

```
{
	title: "lorem ipsum dolor sit amet",
	tooltip: "lorem ipsum dolor sit amet",
	content: // other widget
}
```

### Paragraph

![Paragraph](/widgets-samples/paragraph.png)

#### Properties

```
{
	text: string
}
```

#### Example

```
{
	text: "lorem ipsum dolor sit amet"
}
```

### RichElement

![RichElement](/widgets-samples/richelement.png)

#### Properties

```
{
	icon: string,
	color: "blue" | "darkBlue" | "orange" | "gray" | "red", title: string,
	description: string
}
```

#### Example

```
{
	icon: "fa-gear",
	color: "blue",
	description: "lorem ipsum dolor sit amet"
}
```

### RichRow

![RichRow](/widgets-samples/richrow.png)

#### Properties

```
{
	color: "blue" | "darkBlue" | "orange" | "gray" | "red",
	icon: string,
	subPrimaryText: string,
	primaryText: string,
	subSecondaryText: string,
	secondaryText: string
}
```

#### Example

```
{
	color: "blue",
	icon: "fa-gear",
	subPrimaryText: "lorem ipsum dolor sit amet",
	primaryText: "lorem ipsum dolor sit amet",
	subSecondaryText: "lorem ipsum dolor sit amet",
	secondaryText: "lorem ipsum dolor sit amet"
}
```

### TerminalPanel

![TerminalPanel](/widgets-samples/terminal.png)

#### Properties

```
{
  nodeId: string,
  commands: string,
}
```

#### Example

```
{
  nodeId: "e35ac33c-bd86-4301-83ee-c14236691a74",
  commands: "[{command: "xyz", label: "lorem ipsum"}]",
}
```

### TableData

![TableData](/widgets-samples/tabledata.png)

#### Properties

```
{
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
```

### YamlViewer

![YamlViewer](/widgets-samples/yamlviewer.png)

#### Properties

```
{
  json: string
}
```
