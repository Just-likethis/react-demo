import React, { Component } from 'react'
import { Card, Select, Button, Input, Icon, Table } from 'antd'
const Option = Select.Option
const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: text => <a href="javascript:;">{text}</a>,
    },
    {
      title: 'Cash Assets',
      className: 'column-money',
      dataIndex: 'money',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];
  
  const data = [
    {
      key: '1',
      name: 'John Brown',
      money: '￥300,000.00',
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      money: '￥1,256,000.00',
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      money: '￥120,000.00',
      address: 'Sidney No. 1 Lake Park',
    },
  ];
  
export default class Product extends Component {

    render() {
        const title = (
            <span>
                <Select style={{ width: '200px' }} value='1'>
                    <Option value='1'>按名称搜索</Option>
                    <Option value='2'>按描述搜索</Option>
                </Select>
                <Input type='text' style={{ width: '200px', margin: '0 10px' }} />
                <Button type='primary'>
                    <Icon type='plus' />
                    搜索
            </Button>
            </span>
        )
        const extra = (
            <Button type='primary'>
                <Icon type='plus' />
                添加商品
            </Button>)
        return (
            <Card title={title} extra={extra}>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    loding={loading}
                    rowKey
                />,
            </Card>
        )
    }
}
