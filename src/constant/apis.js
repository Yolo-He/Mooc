var mode = process.env.REACT_APP_MY_VAR
// var API_SERVER = 'http://192.18.50.192'
// var API_SERVER = 'http://172.31.231.102'
var API_SERVER = 'https://mooc.hznu.edu.cn'

if (mode === 'development') {
  API_SERVER = 'https://mooc.hznu.edu.cn'
  // API_SERVER = 'http://192.168.50.192'

}

if (mode === 'production') {
  // API_SERVER = 'https://webmooc.online'
  // API_SERVER = 'http://172.31.231.102:8080'
  API_SERVER = 'https://mooc.hznu.edu.cn'
}

export { API_SERVER }
