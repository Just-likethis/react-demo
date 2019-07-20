import React, { Component } from 'react'
import { Card, Button, Icon, Table, message, Modal } from 'antd'
import LinkButton from '../../components/LinkButton'

import { repCategoyrs, repAddCategoyr, repUpdateCategoyr } from '../../api'
import AddUpdatefrom from './add-update-from'

// repUpdateCategoyr
// const data = [
//   {
//     "_id": "5c2ed631f352726338607046",
//     "name": "分类001"
//   },
//   {
//     "_id": "5c2ed647f352726338607047",
//     "name": "分类2"
//   },
//   {
//     "_id": "5c2ed64cf352726338607048",
//     "name": "1分类3"
//   }
// ];
export default class Category extends Component {
  state = {
    categorys: [],//所有分类的数组
    loading: false,//是否正在请求加载中
    showStatus: 0//o代表不显示  1代表显示添加  2代表显示修改
  }
  //初始化Table的列信息
  initColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',

      },
      {
        title: '操作',
        width: 200,
        render: (category) => <LinkButton onClick={() => {
          //保存当前的分类，其他地方都可以读取到
          this.category = category
          this.setState({ showStatus: 2 })
        }
        }>修改分类</LinkButton>
      }
    ];
  }
  //异步获取分类列表显示
  getCategorys = async () => {
    //发送请求前loading
    this.setState({ loading: true })
    //发送请求
    const result = await repCategoyrs()
    //发送完请求loading取消效果
    this.setState({ loading: false })
    //获取到的数据
    const categorys = result.data
    if (result.status === 0) {//获取成功
      //更新数据 
      this.setState({ categorys })
    } else {
      message.error('请求分类失败')
    }
  }

  handleOk = () => {

    //进行表单验证
    this.form.validateFields(async (err, values) => {
      if (!err) {
        //重置输入数据
        this.form.resetFields()
        //验证通过后，得到数据
        const { categoryName } = values
        const { showStatus } = this.state
        let result
        if (showStatus === 1) {//添加
          //发添加分类的请求
          result = await repAddCategoyr(categoryName)
        } else {//修改
          const categoryId = this.category._id
          result = await repUpdateCategoyr({ categoryName, categoryId })
        }
        this.setState({ showStatus: 0 })
        //根据响应结果，做处理

        const action = showStatus === 1 ? '添加' : '修改'
        if (result.status === 0) {//重新获取分类列表
            
          this.getCategorys()
          message.success(action + '分类成功')
        } else {
          message.error(action + '分类失败')
        }
      }
    });

  };

  handleCancel = () => {
    //取消时候重置输入
    this.form.resetFields()
    this.setState({
      showStatus: 0,
    });

  };
  componentWillMount() {
    this.initColumns()


  }
  componentDidMount() {
    this.getCategorys()
  }
  render() {
    //读取更新的分类名称
    const category = this.category || {}

    //取出状态数据
    const { categorys, loading, showStatus } = this.state
    const extra = (
      <Button type='primary' onClick={() => { 
        this.category={}
        this.setState({ showStatus: 1 })
         }}>
        <Icon type="plus" />添加
      </Button>
    )
    return (
      <Card extra={extra} >
        <Table
          columns={this.columns}
          dataSource={categorys}
          bordered
          rowKey="_id"
          loading={loading}
          pagination={{ defaultPageSize: 6, showQuickJumper: true }}
        />
        <Modal
          title={showStatus === 1 ? '添加分类' : '修改分类'}
          visible={showStatus !== 0}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {/* 将子组件传递过来的form对象保存到当前组件对象上 */}
          <AddUpdatefrom setForm={form => this.form = form} categoryName={category.name} />
        </Modal>

      </Card>


    )
  }
}
