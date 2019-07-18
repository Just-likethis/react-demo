import React, { Component } from 'react'
import LinkButton from '../../components/LinkButton'
import { repProducts } from '../../api'

import { Card, Select, Button, Input, Icon, Table } from 'antd'
const Option = Select.Option


export default class Product extends Component {
    state = {
        loading: false,
        products: [],//商品列表
        total: 0  //商品的总数量
    }
    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name'
            }, {
                title: '商品描述',
                dataIndex: 'desc'
            }, {
                title: '价格',
                dataIndex: 'price',
                render: (price) => '￥' + price
            }, {
                title: '状态',
                width: 80,
                dataIndex: 'status',
                render: (status) => {
                    let btnText = '下架'
                    let text = '在售'
                    if (status === 2) {
                        btnText = '上架'
                        text = '已下架'
                    }
                    return (
                        <span>
                            <button>{btnText}</button>
                            <span>{text}</span>
                        </span>
                    )
                }
            }, {
                title: '操作',
                render: (product) => (
                    <span>
                        <LinkButton>详情</LinkButton>
                        <LinkButton>修改</LinkButton>
                    </span>

                )
            }
        ]
    }
    getProducts = async (pageNum, pageSize) => {
        //发送请求
        const result = await repProducts(pageNum, 2)
        if (result.state === 0) {
            // const { total, list } = result.data
        }
    }
    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getProducts(1)
    }
    render() {
        const { loading, products, total } = this.state
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
                    columns={this.columns}
                    dataSource={products}
                    bordered
                    rowKey="_id"
                    loading={loading}
                    pagination={{ total, defaultPageSize: 2, showQuickJumper: true ,onChange:this.getProducts}}
                />
            </Card> 
        )
    }
}
