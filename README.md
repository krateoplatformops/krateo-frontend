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
$ export "VITE_BFF_API_BASE_URL=http://4.209.37.15:8081" && export "VITE_AUTHN_API_BASE_URL=http://51.138.231.131:8080" && npm run dev
```

## Deploying
Build application 
```sh
$ export "VITE_BFF_API_BASE_URL=http://20.105.44.127:8080" && export "VITE_AUTHN_API_BASE_URL=http://51.138.231.131:8080" &&  npm run vite build
```

Copy content of _/build_ folder in your web server



## Widget List

# Button
/widget-samples/button.png

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


# CardTemplate
/widget-samples/card.png

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


# ChartBars
/widget-samples/chartbars.png

{
  data: {
	  label: string;
	  value: string;
	  percentage: number;
	  color: "success" | "normal" | "exception" | "active";
  }[];
}

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


# ChartFlow
/widget-samples/chartflow.png

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


# ChartLine
/widget-samples/chartline.png

{
	color: "success" | "normal" | "exception" | "active";
	data: {
		xValue: string | number,
		yValue: string | number,
	}[]
}

{
	color: "normal";
	data: {
		xValue: "2010-01",
		yValue: 1998,
	}[]
}


# ChartMultipleBars
/widget-samples/chartmultiplebars.png

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


# ChartPie
/widget-samples/chartpie.png

{
	label?: string;
 	value: number;
 	total: number;
 	status: "default" | "error" | "warning"
}

{
	label?: "lorem ipsum";
 	value: 1522;
 	total: 4895;
 	status: "default"
}


# DataList

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



# DynamicContent

{
	prefix: string,
	content: {
		kind: string,
		spec: {
			// widget (es: RichRow)
		}
	}[]
}

{
	prefix: "documentList",
	content: {
		kind: "Paragraph",
		spec: {
			// widget (es: RichRow)
		}
	}[]
}




# EditableContent
/* 
	WIP: miss update and check markdown editor
*/
{
	text: string,
	editEndpoint: string
}


# EditableList
/* 
	WIP: miss update, add, remove, fields sort
*/
{
	description?: string,
  data?: { id: string, label: string }[],
	prefix: string,
	endpoint: string,
}



# EventsList
/widget-samples/eventlist.png

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



# FormGenerator
/widget-samples/formgenerator.png

{
	title?: string,
	description?: string,
	fieldsEndpoint?: string,
	prefix?: string,
}


{
	title: "lorem ipsum dolor sit amet",
	description: "lorem ipsum dolor sit amet",
	fieldsEndpoint: "/lorem/ipsum",
	prefix: "filtersCompositions",
}



# Panel
/widget-samples/panel.png

{
	title: string,
	tooltip: string,
	content: {
		// other widget
	}
}


{
	title: "lorem ipsum dolor sit amet",
	tooltip: "lorem ipsum dolor sit amet",
	content: // other widget
}



# Paragraph
/widget-samples/paragraph.png

{
	text: string
}

{
	text: "lorem ipsum dolor sit amet"
}



# RichElement
/widget-samples/richelement.png

{
	icon: string,
	color: "blue" | "darkBlue" | "orange" | "gray" | "red", title: string,
	description: string
}


{
	icon: "fa-gear",
	color: "blue",
	description: "lorem ipsum dolor sit amet"
}



# RichRow
/widget-samples/richrow.png

{
	color: "blue" | "darkBlue" | "orange" | "gray" | "red",
	icon: string,
	subPrimaryText: string,
	primaryText: string,
	subSecondaryText: string,
	secondaryText: string
}

{
	color: "blue",
	icon: "fa-gear",
	subPrimaryText: "lorem ipsum dolor sit amet",
	primaryText: "lorem ipsum dolor sit amet",
	subSecondaryText: "lorem ipsum dolor sit amet",
	secondaryText: "lorem ipsum dolor sit amet"
}




# TerminalPanel
/widget-samples/terminal.png

{
  nodeId: string,
  commands: string,
}

{
  nodeId: "e35ac33c-bd86-4301-83ee-c14236691a74",
  commands: "[{command: "xyz", label: "lorem ipsum"}]",
}

