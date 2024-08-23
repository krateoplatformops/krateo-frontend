import { io } from 'socket.io-client';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';
import styles from "./styles.module.scss";
import { getBaseUrl } from '../../../utils/config';
import { useEffect, useState } from 'react';
import { Button, Dropdown, Space, Tag } from 'antd';

type TerminalType = {
  nodeId: string,
  commands: string,
}

const URL = getBaseUrl("TERMINAL_SOCKET");
const socket = io(URL, {
  autoConnect: false
});

const TerminalPanel = ({nodeId, commands}: TerminalType) => {
  const commandList = commands && commands !== "" ? JSON.parse(commands) : [];
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const prompt = "$";
  const [terminalLineData, setTerminalLineData] = useState([
    <TerminalOutput key={0}>{`Welcome to the Krateo Terminal, type a command or choose one from the command list\n\n`}</TerminalOutput>
  ]);

  const sendCommand = (command) => {
    if (nodeId) {
      socket.emit('task', {nodeId: nodeId, command: command})
    }
  }

  useEffect(() => {
    socket.connect();

    const onConnect = () => {
      setIsConnected(true);
    }

    const onDisconnect = () => {
      setIsConnected(false);
    }

    const onCommandResult = (result) => {
      setTerminalLineData([...terminalLineData, <TerminalOutput key={`terminal_output_${terminalLineData.length}`}>{`${prompt} ${result.command}\n${result.output}\n`}</TerminalOutput>]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('task_result', onCommandResult);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('task_result', onCommandResult);
      socket.disconnect();
    };
  }, [prompt, terminalLineData]);

  return (
    <Space direction='vertical' size='large' className={styles.terminal}>
      <Space>
        <Space>State: 
          { isConnected && <Tag color='green'>connected</Tag> }
          { !isConnected && <Tag color='red'>disconnected</Tag> }
        </Space>
        <Dropdown 
          menu={{ items: commandList.map((el) => ({ key: el.command, label: el.label })), onClick: (e) => sendCommand(e.key) }}
          placement="bottomLeft"
        >
          <Button size='small'>Command list</Button>
        </Dropdown>
      </Space>
      <Terminal
        name='Krateo Terminal'
        colorMode={ ColorMode.Dark }
        prompt={prompt}
        onInput={ terminalInput => { sendCommand(terminalInput) } }>
        { terminalLineData }
      </Terminal>
    </Space>                                                          
  )
}

export default TerminalPanel;