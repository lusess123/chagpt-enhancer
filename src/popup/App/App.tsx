import React from 'react'
import Client from './client'
import { ConfigProvider } from 'antd'
// import 'antd/dist/antd.css'

function App() {
  return (
    <div className="App">
            <ConfigProvider
            
            componentSize="small"
            csp={{ nonce: 'YourNonceCode' }}
            theme={{
              // algorithm: true ,
              token: {
                // Seed Token，影响范围大
                colorPrimary: '#1abc9c',
                colorLink: '#1abc9c',
                borderRadius: 16,
                // algorithm: true
                

                // 派生变量，影响范围小
                // colorBgContainer: '#f6ffed',
              },
            }}
          >  <Client /></ConfigProvider>
     
    </div>
  )
}

export default App
