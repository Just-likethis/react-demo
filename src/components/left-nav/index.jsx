import React, { Component } from 'react'
import { Link,withRouter } from 'react-router-dom'
import menuList from '../../config/menuConfig'
import logo from '../../assets/image/logo.png'
import './index.less'
import { Menu, Icon } from 'antd'
const { SubMenu } = Menu
class LeftNav extends Component {
    //reduce+递归方法
    getMenuNodes = (menuList) => {
        const path=this.props.location.pathname
        return menuList.reduce((pre, item) => {
            //可能添加<Item>
            if (!item.children) {
                pre.push(
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }else{
                //二级菜单下的默认打开问题
                const cItem =item.children.find(cItem=>cItem.key===path)
                if(cItem){
                    this.openKey=item.key
                }
                pre.push(
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {
                            this.getMenuNodes(item.children)
                        }
                    </SubMenu>
                )
            }
           
            //可能添加<MenuItem>
            return pre
        }, [])
    }
    //根据指定的menu数据生成<MenuItem>和<SubMenu>的数组
    //map+递归方法
    // getMenuNodes = (menuList) => {
    //     return menuList.map((item) => {
    //         if (!item.children) {
    //             return (
    //                 <Menu.Item key={item.key}>
    //                     <Link to={item.key}>
    //                         <Icon type={item.icon} />
    //                         <span>{item.title}</span>
    //                     </Link>
    //                 </Menu.Item>
    //             )
    //         }
    //         return (
    //             <SubMenu
    //                 key={item.key}
    //                 title={
    //                     <span>
    //                         <Icon type={item.icon} />
    //                         <span>{item.title}</span>
    //                     </span>
    //                 }
    //             >
    //                  {
    //                     this.getMenuNodes(item.children)
    //                 }
    //             </SubMenu>
    //         )
    //     })
    // }
    componentWillMount(){
         this.menuNodes= this.getMenuNodes(menuList)
    }
    render() {
        
        //得到当前请求的路由路径
        const selectKey =this.props.location.pathname
        console.log(selectKey)
        return (
            <div className='Left-Nav'>
                <Link className='Left-Nav-Link' to='/'>
                    <img src={logo} alt="logo" />
                    <h1>硅谷后台</h1>
                </Link>
                <Menu
                    selectedKeys={[selectKey]}
                    defaultOpenKeys={[this.openKey]}
                    mode="inline"
                    theme="dark"
                >{
                    this.menuNodes
                    }
                    {/* <Menu.Item key="/home">
                         <Icon type="home" />
                        <span>首页</span>
                    </Menu.Item>          
                           
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                               <Icon type="appstore" />
                                <span>商品</span>
                            </span>
                        }
                    >
                        <Menu.Item key="/category"> <Icon type="profile" />品类管理</Menu.Item>
                        <Menu.Item key="/product "><Icon type="tool" />商品管理</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/user">
                        <Icon type="user" />
                        <span>用户管理</span>
                    </Menu.Item> 
                    <Menu.Item key="/role ">
                          <Icon type="safety" />
                        <span>角色管理</span>
                    </Menu.Item> 
                     <SubMenu
                        key="/charts"
                        title={
                            <span>
                              <Icon type="area-chart" />
                                <span>图形图表</span>
                            </span>
                        }
                    >
                        <Menu.Item key="/charts/bar"><Icon type="bar-chart" />柱形图</Menu.Item>
                        <Menu.Item key="/charts/line"><Icon type="line-chart" />折线图</Menu.Item>
                        <Menu.Item key="/charts/pie"><Icon type="pie-chart" />饼图</Menu.Item>
                    </SubMenu>    
                    <Menu.Item key="3">
                         <Icon type="windows" />
                        <span>订单管理</span>
                    </Menu.Item>        */}
                </Menu>
            </div>
        )
    }
}
//向外暴露withRoute包装后的组件 ,  这样新组件会向子组件传递三个组件  ,这样子组件（非路由组件）可以操作路由组件相关方法
export default withRouter(LeftNav)