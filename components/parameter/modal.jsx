import React from 'react'
import { Modal, Form, Input, Button } from 'antd'



class SModel extends React.Component{
  constructor(props){
    super(props)
  }
  onChange(data,dataStrig){
    console.log(data,dataStrig);
  }
  handleOk(){
    this.props.handleOk(this.refs.formRef, this.props.bannerInfo && this.props.bannerInfo.id)
  }
  render(){
    return(
      <Modal
      title="编辑内容"
      visible={true}
      onCancel={() => {
        this.props.handleCancel()
        this.refs.formRef.resetFields()
      }}
      footer={[
        <Button key='back' onClick={this.props.handleCancel}>取消</Button>,
        <Button key='submit' type='primary' onClick={this.handleOk.bind(this)}>提交</Button>,
      ]}
      >
        <Form
        labelCol={{span: 4}}
        initialValues={this.props.bannerInfo}
        ref='formRef'>
          <Form.Item
          name='name'
          label='标题'>
            <Input></Input>
          </Form.Item>
          <Form.Item
          name='type'
          label='类型'>
            <Input></Input>
          </Form.Item>
          <Form.Item
          name='url'
          label='页面地址'>
            <Input></Input>
          </Form.Item>
          <Form.Item
          name='imgUrl'
          label='图片地址'>
            <Input></Input>
          </Form.Item>
          <Form.Item
          name='articleId'
          label='文章ID'>
            <Input></Input>
          </Form.Item>
          <Form.Item
          name='power'
          label='权重'>
            <Input></Input>
          </Form.Item>
          
        </Form>
      </Modal>
    )
  }
}

export default SModel