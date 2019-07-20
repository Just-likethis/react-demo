/* 
包含应用中所有请求接口的函数: 接口请求函数
函数的返回值都是promise对象
*/
import ajax from './ajax'
import jsonp from 'jsonp'
import {
  message
} from 'antd';
// const BASE = 'http://localhost:5000'
const BASE = ''

// 请求登陆
export const reqLogin = (username, password) => ajax.post(BASE + '/login', {
  username,
  password
})

/* ajax({
    method: 'post',
    url: BASE + '/login',
    data: { // data是对象, 默认使用json格式的请求体携带参数数据
      username,
      password
    }
    // data: qs.stringify({username, password})
  }) */


/* const name = 'admin'
const pwd = 'admin'
reqLogin(name, pwd).then(result => { // response.data的值
  // const result = response.data
  console.log('请求成功了', result)
})
 */
// 将实参数据赋值形参变量


//发送jsonp请求得到天气信息
export const repweather = (city) => {
  //返回的必须是一个promise对象
  return new Promise((resolve, reject) => { //执行器函数:内部去执行异步任务
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url, {}, (err, data) => {
      if (!err && data.error === 0) {
        const {
          dayPictureUrl,
          weather
        } = data.results[0].weather_data[0]
        resolve({
          dayPictureUrl,
          weather
        })
      } else {
        message.error('获取天气信息失败')
      }
    })
  })
}
//获取分类列表
// export const repCategoyrs=()=>ajax.get('/manage/category/list')

// export const repCategoyrs=()=>ajax({
//   method: 'get',//默认值
//   url: 'http://bit.ly/2mTM3nY',
//   responseType: 'stream'
// })
export const repCategoyrs = () => ajax('/manage/category/list') //返回的是promise对象

//添加分类
export const repAddCategoyr = (categoryName) => ajax.post('/manage/category/add', {
  categoryName
}) //返回的是promise对象
//修改分类
export const repUpdateCategoyr = ({
  categoryName,
  categoryId
}) => ajax.post('/manage/category/update', {
  categoryName,
  categoryId
}) //返回的是promise对象


//获取商品分页列表
export const repProducts = (pageNum, pageSize) => ajax('manage/product/list', {
  params: { //包含所有query参数的对象
    pageNum,
    pageSize
  }
})

//根据Name或者描述搜索产品分页列表
export const reqSearchProducts = ({
    pageNum,
    pageSize,
    searchName,
    searchType
  } //他的值是productName 或者  productDesc
) => ajax('/manage/product/search', {
  params: {
    pageNum,
    pageSize,
    [searchType]: searchName,

  }
})

// 对商品进行上架/下架处理
export const reaUpdateStatus = (productId, status) => ajax('/manage/product/updateStatus', {
  method: 'POST',
  data: {
    productId,
    status
  }
})