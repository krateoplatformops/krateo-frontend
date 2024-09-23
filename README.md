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

Button
{
  icon?: string,
  label?: string,
  badge?: string,
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
  icon: "gear",
  label: "click here!",
  badge: "true",
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

-------------------------

CardTemplate
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
 		verb: "get" | "delete",
 		path: string,
 	}[],
 	panel: string,
 	route: string // attualmente non utilizzato
}

{
	id: "e35ac33c-bd86-4301-83ee-c14236691a74",
 	icon: "gear",
 	color: "blue",
 	title: "This is the card title",
 	status: "pending",
 	date: "06/05/2024",
 	content: "{... oggetto widget ...}",
 	tags: "lorem, ipsum, dolor",
 	actions: [
	  {
	    path: "/lorem/ipsum/dolor",
	    verb: "get",
	  }
  ],
 	panel: "true",
 	route: ""
}

-------------------------


ChartBars
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
-------------------------

ChartFlow
{
	uid: string,
	name: string,
	kind: string,
	icon: string,
	health: {
		status: string
	}
	status: string
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
	    "status": "Synced"
	 	},
		status: "Available",
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


-------------------------


ChartLine
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

-------------------------


ChartMultipleBars
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


-------------------------



ChartPie
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

-------------------------


DataList
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


-------------------------


DynamicContent
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


-------------------------


/* 
	WIP: miss update and check markdown editor
*/
EditableContent
{
	text: string,
	editEndpoint: string
}

/* 
	WIP: miss update, add, remove, fields sort
*/
EditableList
{
	description?: string,
  data?: { id: string, label: string }[],
	prefix: string,
	endpoint: string,
}


-------------------------


EventsList
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

-------------------------


FormGenerator
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

-------------------------


Panel
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


-------------------------


Paragraph
{
	text: string
}

{
	text: "lorem ipsum dolor sit amet"
}

-------------------------


RichElement
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

-------------------------


RichRow
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

-------------------------


TerminalPanel
{
  nodeId: string,
  commands: string,
}

{
  nodeId: "e35ac33c-bd86-4301-83ee-c14236691a74",
  commands: "[{command: "xyz", label: "lorem ipsum"}]",
}

