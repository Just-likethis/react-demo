import React, { Component } from 'react'
import LinkButton from '../../components/LinkButton'
import { repProducts, reqSearchProducts, reaUpdateStatus } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'

import { Card, Select, Button, Input, Icon, Table, message } from 'antd'
const Option = Select.Option

//商品管理的首页组件
export default class ProductHome extends Component {
    state = {
        loading: false,
        products: [],//商品列表
        total: 0, //商品的总数量
        searchType: 'productName',//默认是按商品的名称搜索
        searchName: ''//搜索的关键字
    }
    updataStatus = async (productId, status) => {
        //计算更新后的值
        status = status === 1 ? 2 : 1
        //发送请求
        const result = await reaUpdateStatus(productId, status)
        if (result.status === 0) {
            message.success('更新商品信息成功')
            //设置当前显示第几页
            this.getProducts(this.pageNum)
        }
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
                // dataIndex: 'status',
                render: ({ _id, status }) => {
                    let btnText = '下架'
                    let text = '在售'
                    if (status === 2) {
                        btnText = '上架'
                        text = '已下架'
                    }
                    return (
                        <span>
                            <button onClick={() => { this.updataStatus(_id, status) }}>{btnText}</button>
                            <span>{text}</span>
                        </span>
                    )
                }
            }, {
                title: '操作',
                render: (product) => (
                    <span>
                        <LinkButton onClick={()=>this.props.history.push('/product/detail')}>详情</LinkButton>
                        <LinkButton>修改</LinkButton>
                    </span>

                )
            }
        ]
    }
    //异步获取指定页码的商品（可能带搜索）分页列表
    getProducts = async (pageNum) => {
        this.pageNum = pageNum
        const { searchName, searchType } = this.state
        let result
        if (!searchName) {
            //发送请求
            result = await repProducts(pageNum, PAGE_SIZE)
        } else {
            result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })
        }

        if (result.status === 0) {
            const { total, list } = result.data
            this.setState({ products: list, total })
        }
    }
    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getProducts(1)
    }
    render() {
        const { loading, products, total, searchType, searchName } = this.state
        const title = (
            <span>
                <Select
                    style={{ width: '200px' }}
                    value={searchType}
                    onChange={(value) => this.setState({ searchType: value })} >
                    <Option value='productName'>按名称搜索</Option>
                    <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input type='text'
                    style={{ width: '200px', margin: '0 10px' }}
                    value={searchName}
                    onChange={(event) => this.setState({ searchName: event.target.value })}
                />
                <Button type='primary' onClick={() => { this.getProducts(1) }}>
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
                    pagination={{ total, defaultPageSize: PAGE_SIZE, showQuickJumper: true, onChange: this.getProducts, current:this.pageNum }}
                />
                {/* current指的是默认页数 */}
            </Card>
        )
    }
}
