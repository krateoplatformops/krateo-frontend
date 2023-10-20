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
            colorPrimary: '#303030',
            colorSuccess: '#00d690',
            colorWarning: '#ffaa00',
            colorError: '#f84c4c',
            colorTextBase: '#323b40',
            colorBgBase: '#fbfbfb',
            colorBorder: '#E1E3E8',
            colorInfo: '#05629A', //bar charts
          }
        }}
      >
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
)
