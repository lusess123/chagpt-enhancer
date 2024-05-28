import { useEffect, useState } from 'react'
import { storage } from 'webextension-polyfill'
import { getCurrentTab } from '../../helpers/tabs'
import {  Input } from "antd";

export const Counter = () => {
  const [value, setValue] = useState()
  const [content , setContent] = useState("")

  // useEffect(() => {
  //   const readBackgroundMessage = async () => {
  //     const tab = await getCurrentTab()
  //     const tabId = tab.id

  //     if (tabId) {
  //       const data = await storage.local.get(tabId.toString())
  //       const currentValue = data?.[tabId] ?? 0

  //       setValue(currentValue)
  //     }
  //   }

  //   readBackgroundMessage()
  // }, [])

  return (
    <div
      style={{
        height: '100vh',
        fontSize: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      Clicks: {value}- {content.length}
      <button onClick={()=>{
        alert(11)
      }}>dd</button>
      <Input.TextArea onChange={(e)=>{
        setContent(e.target.value)
      }} value={content}></Input.TextArea>
    </div>
  )
}
