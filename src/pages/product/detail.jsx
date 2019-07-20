import React, { Component } from 'react'
import LinkButton from '../../components/LinkButton'
import {
    Card,
    Icon,
    List
} from 'antd'
const Item = List.Item


//商品详情路由组件
export default class ProductDetail extends Component {
    render() {
        const title = (
            <span>
                <LinkButton onClick={()=>this.props.history.goBack()}>
                <Icon type='arrow-left'></Icon>
                </LinkButton>
                <span>商品详情</span>
            </span>
        )
        return (
            <Card title={title} className='detail'>
                <List>
                    <Item>
                        <span className='detail-left'>商品名称:</span>
                        <span>aaaa</span>
                    </Item>
                    <Item>
                        <span className='detail-left'>商品描述:</span>
                        <span>bbbb</span>
                    </Item>
                    <Item>
                        <span className='detail-left'>商品价格:</span>
                        <span>10</span>
                    </Item>
                    <Item>
                        <span className='detail-left'>所属分类:</span>
                        <span>ccccc</span>
                    </Item>
                    <Item>
                        <span className='detail-left'>商品图片:</span>
                        <span>
                        <img className='detail-img' src="//bpic.588ku.com/ad_diversion/19/07/19/a6fb3d6254ab7e0627e07c829748115f.png" alt="图片走丢丢啦"/>
                        <img className='detail-img' src="http://dpic.tiankong.com/6h/m0/QJ6748122403.jpg" alt="图片走丢丢啦"/>
                        </span>
                    </Item>
                    <Item>
                        <span className='detail-left'>商品详情:</span>
                        <div dangerouslySetInnerHTML={{__html:'<a href="http://www.baidu.com">百度</a>'}}></div>
                    </Item>
                    
                </List>
            </Card>
        )
    }
}
