import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import logo from './images/logo.png'
import './login.less'
export default class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        })
    }
    render() {
        return (
            <div className='login'>
                <div className="login-header">
                    <img src={logo} alt="图片走丢了" />
                    <h1>React项目</h1>
                </div>
                <div className="login-content">
                    <div className='login-denglu'>用户登陆</div>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">登 陆 </Button>

                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
