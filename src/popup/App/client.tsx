'use client'
// import Image from "next/image";
// import Logo from './logo.svg'
import { Input, Card, Button, Space } from 'antd'
import { observer } from "mobx-react";
import { Mst, IModel } from "./model";

function Warpper({ children }: any) {
  return <Mst.StoreProvider>{children}
  </Mst.StoreProvider>
}

export default observer(function Home() {
  const useStore = Mst.useStore
  const store = useStore() as IModel
  return <Warpper><Card className="pop-page" title="hello chatgpt"
    extra={<Space size={"small"}>
      <Button disabled={!Mst.snapShopState.hasUndo} type="dashed" onClick={Mst.undo}>撤销</Button>
      <Button type="dashed" onClick={Mst.redo} disabled={!Mst.snapShopState.hasRedo} >重做</Button>
    </Space>}>
    <Space direction="vertical" className="content-warp">
      <Input.TextArea placeholder="Basic usage"
        autoSize={{ minRows: 3, maxRows: 5 }}
        value={store.content}
        onChange={(e) => {
          debugger
          store.setContent(e.target.value)

        }}
        className="content" />
      <Button type="primary" onClick={() => {
        console.log("aa")
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0].id !== undefined) {
            // alert(1)
            chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              func: clickAndSetText,
              args: [store.content]
            });
          }
          window.close()
        });
      }} >输入</Button>
      <Button onClick={()=>{
          // 示例调用
           fetchDataFromGitHub('https://raw.githubusercontent.com/CHENJIAMIAN/awesome-chatgpt-prompts-zh-CN/main/Aiprm_Prompts-Prompt-zh-CN.json');

      }}>提示词</Button>
    </Space>
  </Card></Warpper>
})

async function fetchDataFromGitHub(url: string) {
  const response:any = await new Promise((resolve) => {
     chrome.runtime.sendMessage({ fetchData: url }, resolve);
  });
  if (response && response.success) {
    console.log('Data:', response.data);
  } else {
    console.error('Error:', response && response.error);
  }
}



function clickAndSetText(str: string) {

  // alert("ffff")

  var inputElement: any = document.querySelector('#prompt-textarea');
  // debugger
  // 设置 input 元素的 value
  inputElement.value = str
  console.log("#prompt-textarea")
  var event = new Event('input', { bubbles: true, cancelable: true });
  inputElement.dispatchEvent(event);
  setTimeout(() => {
    let sendButton: any = document.querySelector('button[data-testid="fruitjuice-send-button"]');
    sendButton.click();

    setTimeout(() => {
      const element: any = document.querySelector('.cursor-pointer.absolute.z-10.rounded-full.bg-clip-padding.border.text-token-text-secondary');

      if (element) {
        // 这里是找到元素后的操作
        console.log(element);
        element.click()
      }


    }, 1300);

    setTimeout(() => {
      const elements = document.querySelectorAll('[class^="react-scroll-to-bottom--css"]');
      if (elements && elements.length > 0) {
        const div = elements[0]
        div.scrollTop = div.scrollHeight - div.clientHeight;
      }


    }, 1000)
  }, 800)

  // chrome.windows.getCurrent(function (window: any) {
  //   chrome.windows.remove(window.id);
  // });
  // window.close()


}


// export default observer(Home)
