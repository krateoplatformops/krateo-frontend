// import { Input } from 'antd';
// import { useCallback, useEffect, useState } from 'react';
// import useWebSocket/*, { ReadyState }*/ from 'react-use-websocket';
import Terminal, { ColorMode, /* TerminalOutput */ } from 'react-terminal-ui';
import styles from "./styles.module.scss";

const TerminalPanel = () => {
  // const [history, setHistory] = useState<MessageEvent<any>[]>([]);
  // const { sendMessage, lastMessage/*, readyState */ } = useWebSocket('wss://echo.websocket.org');

  /*
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];
  */

  // const [terminalLineData, setTerminalLineData] = useState([
  //   <TerminalOutput>Welcome to the Krateo Terminal</TerminalOutput>
  // ]);

  // useEffect(() => {
  //   if (lastMessage !== null) {
  //     setHistory([lastMessage, ...history]);
  //   }
  // }, [history, lastMessage]);

  // const onSendCommand = useCallback((event) => {
  //   const command = event.target.value;
  //   // send websocket
  //   sendMessage(command);
  // }, [sendMessage]);

  return (
    <div className={styles.terminal}>
      {/* {history.map(el => <p>{el.data}</p>)} */}
      {/* <Input onPressEnter={onSendCommand} /> */}
      <Terminal
        name='Krateo Terminal'
        colorMode={ ColorMode.Dark }
        redBtnCallback={() => {}}
        onInput={ terminalInput => console.log(`New terminal input received: '${ terminalInput }'`) }>
        {/* { terminalLineData } */}
      </Terminal>
    </div>
  )
}

export default TerminalPanel;