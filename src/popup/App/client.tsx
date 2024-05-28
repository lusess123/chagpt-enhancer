'use client'
// import Image from "next/image";
// import Logo from './logo.svg'
import { Input , Card, Button, Space } from 'antd'
import { observer } from "mobx-react";
import { Mst, IModel } from "./model";

function Warpper({ children }: any) {
    return    <Mst.StoreProvider>{children}
     </Mst.StoreProvider>
}

 export default observer(function Home() {
    const useStore = Mst.useStore
    const store = useStore() as IModel
  return    <Warpper><Card className="pop-page" title="chatgpt 伴侣" 
  extra={<Space size={"small"}>
  <Button  disabled={!Mst.snapShopState.hasUndo} type="dashed" onClick={Mst.undo}>撤销</Button>
  <Button type="dashed" onClick={Mst.redo} disabled={!Mst.snapShopState.hasRedo} >重做</Button>
  </Space>}>
    <Space direction="vertical" className="content-warp">
    <Input.TextArea placeholder="Basic usage" 
    autoSize={{ minRows: 3, maxRows: 5 }} 
    value={store.content} 
    onChange={(e)=>{
        debugger
       store.setContent(e.target.value)
        
    }}
    className="content" />
    <Button type="primary" onClick={()=>{
         console.log("aa")
         alert(1)
    }} >输入</Button>
    </Space>
  </Card></Warpper>
})

// export default observer(Home)
