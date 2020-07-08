import React from 'react'
import { Modal, Form, Input, Select,DatePicker, Button } from 'antd'

const { Option } = Select;


class SModel extends React.Component{
  constructor(props){
    super(props)
  }
  onChange(data,dataStrig){
    console.log(data,dataStrig);
  }
  render(){
    return(
      <Modal
      title="编辑内容"
      visible={this.props.visible}
      onOk={() => {
        this.props.handleOk(this.refs.formRef.getFieldsValue())
        this.refs.formRef.resetFields()
      }}
      onCancel={() => {
        this.props.handleCancel()
        this.refs.formRef.resetFields()
      }}
      footer={[
        <Button key='back' onClick={this.props.handleCancel}>取消</Button>,
        <Button key='submit' type='primary' onClick={this.props.handleOk}>提交</Button>,
      ]}
      >
        <Form ref='formRef'>
          <Form.Item
          name='bookName'
          label='书名'>
            <Input></Input>
          </Form.Item>
          <Form.Item
          name='author'
          label='作者'>
            <Input></Input>
          </Form.Item>
          <Form.Item
          name='category'
          label='分类'>
            <Select
            mode='multiple'
            placeholder='选择分类'>
              <Option key='1'>玄幻</Option>
              <Option key='2'>都市</Option>
              <Option key='3'>科幻</Option>
              <Option key='4'>游戏</Option>
            </Select>
          </Form.Item>
          <Form.Item
          name='time'
          label='时间'>
            <DatePicker onChange={this.onChange.bind(this)}/>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default SModel