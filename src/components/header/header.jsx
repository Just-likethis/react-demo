import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import menuList from '../../config/menuConfig'
import LinkButton from '../LinkButton'
import { formateDate } from '../../utils/dateUtils'
import { repweather } from '../../api'

import './header.less'
class Header extends Component {
    state = {
        cuurentTime: formateDate(Date.now()),
        dayPictureUrl: '',
        weather: ''
    }
    getTitle = () => {
        let title = ''
        //根据当前请求的path得到对应的title
        const path = this.props.location.pathname
        menuList.forEach(item => {
            if (item.key === path) {
                title = item.title
            } else if (item.children) {
                const cItem = item.children.find(cItem => cItem.key === path)
                if (cItem) {
                    title = cItem.title
                }
            }
        })
        return title
    }
    // 退出登陆
    logout = () => {
        //显示确认提示
        Modal.confirm({
            title: '确认退出吗？',
            content: 'Some descriptions',
            onOk: () => {
                console.log('OK');
                //确定后删除用户的信息
                //local中的
                storageUtils.removeUser()
                //内存中的
                memoryUtils.user = {}
                //跳转到登陆界面
                this.props.history.replace('/login')
            },
            onCancel() {
                console.log('Cancel');
            },
        })

    }
    getWeather = async () => {
        //发请求
        const {dayPictureUrl,weather} = await repweather('北京')
        //更新状态
        this.setState({
            dayPictureUrl,
            weather
        })
    }
    componentDidMount() {
        this.timeId = setInterval(() => {
            //将currentTime更新为最新的值
            this.setState({ cuurentTime: formateDate(Date.now()) })
        }, 1000)
        //送请求jsonp 获取天气信息显示
        this.getWeather()
    }
    componentWillMount() {
        clearInterval(this.timeId)
    }
    render() {
        const { cuurentTime,weather,dayPictureUrl } = this.state
        //得到当前需要显示的title
        const title = this.getTitle()
        const user = memoryUtils.user
        return (
            <div className='header'>
                <div className='header-top'>
                    欢迎！{user.username} &nbsp;&nbsp;
                    <LinkButton onClick={this.logout} to='/login'>退出</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{cuurentTime}</span>
                        <img src={dayPictureUrl} alt="weather" />
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)
