import { io } from 'socket.io-client';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';
import styles from "./styles.module.scss";
import { getBaseUrl } from '../../../utils/config';
import { useEffect, useState } from 'react';
import { Tag } from 'antd';

const URL = getBaseUrl("TERMINAL_SOCKET");
const socket = io(URL, {
  autoConnect: false
});

const TerminalPanel = () => {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  // const [history, setHistory] = useState<MessageEvent<any>[]>([]);
  const [terminalLineData, setTerminalLineData] = useState([
    <TerminalOutput>Welcome to the Krateo Terminal</TerminalOutput>
  ]);

  useEffect(() => {
    socket.connect();

    const onConnect = () => {
      setIsConnected(true);
    }

    const onDisconnect = () => {
      setIsConnected(false);
    }

    const onCommandResult = (values) => {
      setTerminalLineData([values, ...terminalLineData]);
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
  }, [terminalLineData]);
  
  return (
    <div className={styles.terminal}>
      { isConnected && <Tag color='green'>connected</Tag> }
      { !isConnected && <Tag color='red'>disconnected</Tag> }

      <Terminal
        name='Krateo Terminal'
        colorMode={ ColorMode.Dark }
        onInput={ terminalInput => { socket.emit('task', {nodeId: 12345, command: terminalInput}) } }>
        { terminalLineData }
      </Terminal>
    </div>
  )
}

export default TerminalPanel;