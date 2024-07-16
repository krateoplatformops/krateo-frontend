import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import App from './App.tsx'
import "./theme/index.scss"
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: 'Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif',
            colorLink: '#05629A',
            colorPrimary: '#05629A',
            colorSuccess: '#00d690',
            colorWarning: '#ffaa00',
            colorError: '#f84c4c',
            colorTextBase: '#323b40',
            colorBgBase: '#fbfbfb',
            colorBorder: '#E1E3E8',
            colorInfo: '#11B2E2', //bar charts
            colorWhite: '#FFFFFF',
            colorSuccessBg: '#00D690',
          }
        }}
      >
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
)
