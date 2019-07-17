import React, { Component } from 'react'
import { Card } from 'antd'
import './category.less'

export default class Category extends Component {

  render() {
    return (
      <Card extra={<a href="#1">More</a>} style={{ width: "100%", height: '100%' }}>

      </Card>
    )
  }
}
