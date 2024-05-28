'use client'
import Image from "next/image";
import Logo from './logo.svg'
import { Input , Card, Button, Space } from 'antd'

export default function Home() {
  return  <Card className="pop-page" title="提示词" extra={<Image
    src={Logo}
    alt="Vercel Logo"
    className="dark:invert"
    width={24}
    height={24}
    priority
  />}>
    <Space direction="vertical" className="content-warp">
    <Input.TextArea placeholder="Basic usage"  className="content" />
    <Button type="primary">输入</Button>
    </Space>
  </Card>
}
