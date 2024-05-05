import { useMemo } from 'react';
import ReactFlow, {
  Controls,
  Background,
  Edge,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Space, Tag } from 'antd';
import dagre from '@dagrejs/dagre';
import styles from "./styles.module.scss";

const showNodeDetails = (data) => {
  console.log(data);
}

const getTagColor = (status: number) => {
  const colors = ["error", "success"]
  return colors[status];
}

const getTagText = (status: number) => {
  const text = ["offline", "online"]
  return text[status];
}

const NodeElement = ({ data }) => {
  return (
    <div className={styles.node} onClick={() => showNodeDetails(data)}>
      <Handle type="target" position={Position.Left} />
      <>
        <div className={styles.header}>
          {data.header}
        </div>
        <div className={styles.body}>
          <Space direction="vertical" size="middle">
            <div>{data.body}</div>
            <Tag color={getTagColor(data.status)}>{getTagText(data.status)}</Tag>
          </Space>
        </div>
      </>
      <Handle type="source" position={Position.Right} />
    </div>
  )
}

const ChartFlow = () => {
  const nodeType = useMemo(() => ({ nodeElement: NodeElement }), []);
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

   const nodeWidth = 400;
   const nodeHeight = 200;

   const mockData = [
      {
         "version":"v1",
         "kind":"Endpoints",
         "namespace":"alfredo-fire-firefire-ns",
         "name":"alfredo-fire-firefire-service",
         "uid":"4930a04b-9652-4914-8890-b646ea2bdcd4",
         "parentRefs":[
            {
               "kind":"Service",
               "namespace":"alfredo-fire-firefire-ns",
               "name":"alfredo-fire-firefire-service",
               "uid":"637d39a7-5db0-4c6f-9a1f-f9803ba1663a"
            }
         ],
         "resourceVersion":"84446863",
         "createdAt":"2024-05-02T07:15:03Z"
      },
      {
         "version":"v1",
         "kind":"Namespace",
         "name":"alfredo-fire-firefire-ns",
         "uid":"0aafde66-3b7f-4fce-8ed4-7dd10c3075fe",
         "resourceVersion":"84446802",
         "createdAt":"2024-05-02T07:15:03Z"
      },
      {
         "version":"v1",
         "kind":"Pod",
         "namespace":"alfredo-fire-firefire-ns",
         "name":"alfredo-fire-firefire-7c54bd49b9-bdqf8",
         "uid":"343be651-8315-402b-ae52-98bd9bef879f",
         "parentRefs":[
            {
               "group":"apps",
               "kind":"ReplicaSet",
               "namespace":"alfredo-fire-firefire-ns",
               "name":"alfredo-fire-firefire-7c54bd49b9",
               "uid":"e35ac33c-bd86-4301-83ee-c14236691a74"
            }
         ],
         "info":[
            {
               "name":"Status Reason",
               "value":"ImagePullBackOff"
            },
            {
               "name":"Node",
               "value":"aks-userpool-34513099-vmss000006"
            },
            {
               "name":"Containers",
               "value":"0/1"
            }
         ],
         "networkingInfo":{
            "labels":{
               "app":"krateo.io",
               "component":"alfredo-fire-firefire",
               "pod-template-hash":"7c54bd49b9"
            }
         },
         "resourceVersion":"84475847",
         "images":[
            "ghcr.io/krateoplatformops-archive/alfredo-fire-firefire:latest"
         ],
         "health":{
            "status":"Degraded",
            "message":"Back-off pulling image \"ghcr.io/krateoplatformops-archive/alfredo-fire-firefire:latest\""
         },
         "createdAt":"2024-05-02T07:15:03Z"
      },
      {
         "version":"v1",
         "kind":"Pod",
         "namespace":"alfredo-fire-firefire-ns",
         "name":"alfredo-fire-firefire-7c54bd49b9-drp4n",
         "uid":"4120b151-3231-4fcd-8986-4f1adfc59c72",
         "parentRefs":[
            {
               "group":"apps",
               "kind":"ReplicaSet",
               "namespace":"alfredo-fire-firefire-ns",
               "name":"alfredo-fire-firefire-7c54bd49b9",
               "uid":"e35ac33c-bd86-4301-83ee-c14236691a74"
            }
         ],
         "info":[
            {
               "name":"Status Reason",
               "value":"ImagePullBackOff"
            },
            {
               "name":"Node",
               "value":"aks-userpool-34513099-vmss000007"
            },
            {
               "name":"Containers",
               "value":"0/1"
            }
         ],
         "networkingInfo":{
            "labels":{
               "app":"krateo.io",
               "component":"alfredo-fire-firefire",
               "pod-template-hash":"7c54bd49b9"
            }
         },
         "resourceVersion":"84475693",
         "images":[
            "ghcr.io/krateoplatformops-archive/alfredo-fire-firefire:latest"
         ],
         "health":{
            "status":"Degraded",
            "message":"Back-off pulling image \"ghcr.io/krateoplatformops-archive/alfredo-fire-firefire:latest\""
         },
         "createdAt":"2024-05-02T07:15:03Z"
      },
      {
         "version":"v1",
         "kind":"Pod",
         "namespace":"alfredo-fire-firefire-ns",
         "name":"alfredo-fire-firefire-7c54bd49b9-kgzdp",
         "uid":"afc2febc-c711-4e28-972d-dbc93fff20e4",
         "parentRefs":[
            {
               "group":"apps",
               "kind":"ReplicaSet",
               "namespace":"alfredo-fire-firefire-ns",
               "name":"alfredo-fire-firefire-7c54bd49b9",
               "uid":"e35ac33c-bd86-4301-83ee-c14236691a74"
            }
         ],
         "info":[
            {
               "name":"Status Reason",
               "value":"ImagePullBackOff"
            },
            {
               "name":"Node",
               "value":"aks-userpool-34513099-vmss000008"
            },
            {
               "name":"Containers",
               "value":"0/1"
            }
         ],
         "networkingInfo":{
            "labels":{
               "app":"krateo.io",
               "component":"alfredo-fire-firefire",
               "pod-template-hash":"7c54bd49b9"
            }
         },
         "resourceVersion":"84475790",
         "images":[
            "ghcr.io/krateoplatformops-archive/alfredo-fire-firefire:latest"
         ],
         "health":{
            "status":"Degraded",
            "message":"Back-off pulling image \"ghcr.io/krateoplatformops-archive/alfredo-fire-firefire:latest\""
         },
         "createdAt":"2024-05-02T07:15:03Z"
      },
      {
         "version":"v1",
         "kind":"Service",
         "namespace":"alfredo-fire-firefire-ns",
         "name":"alfredo-fire-firefire-service",
         "uid":"637d39a7-5db0-4c6f-9a1f-f9803ba1663a",
         "networkingInfo":{
            "targetLabels":{
               "app":"krateo.io",
               "component":"alfredo-fire-firefire"
            }
         },
         "resourceVersion":"84446804",
         "health":{
            "status":"Healthy"
         },
         "createdAt":"2024-05-02T07:15:03Z"
      },
      {
         "group":"apps",
         "version":"v1",
         "kind":"Deployment",
         "namespace":"alfredo-fire-firefire-ns",
         "name":"alfredo-fire-firefire",
         "uid":"3a1cfa55-195d-4fc3-8f01-506f3017c0c6",
         "info":[
            {
               "name":"Revision",
               "value":"Rev:1"
            }
         ],
         "resourceVersion":"84450847",
         "health":{
            "status":"Degraded",
            "message":"Deployment \"alfredo-fire-firefire\" exceeded its progress deadline"
         },
         "createdAt":"2024-05-02T07:15:03Z"
      },
      {
         "group":"apps",
         "version":"v1",
         "kind":"ReplicaSet",
         "namespace":"alfredo-fire-firefire-ns",
         "name":"alfredo-fire-firefire-7c54bd49b9",
         "uid":"e35ac33c-bd86-4301-83ee-c14236691a74",
         "parentRefs":[
            {
               "group":"apps",
               "kind":"Deployment",
               "namespace":"alfredo-fire-firefire-ns",
               "name":"alfredo-fire-firefire",
               "uid":"3a1cfa55-195d-4fc3-8f01-506f3017c0c6"
            }
         ],
         "info":[
            {
               "name":"Revision",
               "value":"Rev:1"
            }
         ],
         "resourceVersion":"84446834",
         "health":{
            "status":"Progressing",
            "message":"Waiting for rollout to finish: 0 out of 3 new replicas are available..."
         },
         "createdAt":"2024-05-02T07:15:03Z"
      },
      {
         "group":"discovery.k8s.io",
         "version":"v1",
         "kind":"EndpointSlice",
         "namespace":"alfredo-fire-firefire-ns",
         "name":"alfredo-fire-firefire-service-4ckbn",
         "uid":"d0e97ca3-1e3b-487c-8393-04d44294a4e0",
         "parentRefs":[
            {
               "kind":"Service",
               "namespace":"alfredo-fire-firefire-ns",
               "name":"alfredo-fire-firefire-service",
               "uid":"637d39a7-5db0-4c6f-9a1f-f9803ba1663a"
            }
         ],
         "resourceVersion":"84446862",
         "createdAt":"2024-05-02T07:15:03Z"
      },
      {
         "group":"networking.k8s.io",
         "version":"v1",
         "kind":"Ingress",
         "namespace":"alfredo-fire-firefire-ns",
         "name":"alfredo-fire-firefire-ingress",
         "uid":"ad8a8b68-40e7-4eb0-aac0-58df5ccd4820",
         "networkingInfo":{
            "targetRefs":[
               {
                  "kind":"Service",
                  "namespace":"alfredo-fire-firefire-ns",
                  "name":"alfredo-fire-firefire-service"
               }
            ],
            "ingress":[
               {
                  "ip":"20.93.107.107"
               }
            ],
            "externalURLs":[
               "http://fireworks-app.krateo.site/"
            ]
         },
         "resourceVersion":"84446841",
         "health":{
            "status":"Healthy"
         },
         "createdAt":"2024-05-02T07:15:03Z"
      }
   ];

   // parsing data
   const parsedNodes = mockData.map((el) => (
   {
      id: el.uid,
      data: { header: el.name, status: el.health },
      type: 'nodeElement'
   }
   ));

   const parsedEdges: Edge[] = [];
   mockData.forEach((el) => {
      if (el.parentRefs !== undefined && el.parentRefs?.length > 0) {
         parsedEdges.push({ id: `${el.parentRefs[0].uid}-${el.uid}`, source: el.parentRefs[0].uid, target: el.uid, label: '' })
      }
   })

   // auto layouting
   const getLayoutedElements = (nodes, edges, direction) => {
      dagreGraph.setGraph({ rankdir: direction });
    
      nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
      });
    
      edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
      });
    
      dagre.layout(dagreGraph);
    
      nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id) as {x: number, y: number};
        node.targetPosition = "left";
        node.sourcePosition = "right";
    
        // We are shifting the dagre node position (anchor=center center) to the top left
        // so it matches the React Flow node anchor point (top left).
        node.position = {
          x: nodeWithPosition.x - nodeWidth / 2,
          y: nodeWithPosition.y - nodeHeight / 2,
        };
    
        return node;
      });
    
      return { nodes, edges };
   };

   const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      parsedNodes,
      parsedEdges,
      "LR"
   );

   const [nodes, , onNodesChange] = useNodesState(layoutedNodes);
   const [edges, , onEdgesChange] = useEdgesState(layoutedEdges);

   return (
      <div style={{ height: '100%' }}>
         <ReactFlow
            nodes={nodes}
            nodeTypes={nodeType}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange}
            //   nodesDraggable={false}
            nodesConnectable={false}
            fitView
            >
            <Background />
            <Controls showInteractive={false} />
         </ReactFlow>
      </div>
   )
}


export default ChartFlow;