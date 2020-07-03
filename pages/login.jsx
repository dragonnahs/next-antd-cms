import Head from 'next/head'
import {Layout, Form, Input, Button } from 'antd'
import cookie from 'js-cookie'
import {withRouter} from 'next/router'

const { Content } = Layout
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 100 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const Login = (props) => {
  console.log(props);
  const onFinish = (values) => {
    const {router} = props
    cookie.set('user', values.username)
    router.push({
      pathname: router.query.from || '/cms/home'
    })
  }
  const onFinishFailed = (err) => {
    console.log(err);
  }
  return (
    <Layout style={{height: '100vh'}}>
      <Head>
        <title>cms登陆</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Content style={{height: '100%',display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
        <Form
        {...layout}
        name="basic"
        style={{width: '300px'}}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder='请输入用户名' />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder='请输入密码' />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              登陆
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  )
}

export default withRouter(Login)