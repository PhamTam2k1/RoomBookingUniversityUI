import axios from 'axios'
//let BaseAPIConfig = axios.create({ baseURL: `http://localhost:51585/api/v1/` })
let BaseAPIConfig = axios.create({ baseURL: `http://localhost:5081/api/v1/` })
BaseAPIConfig.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
/**
 * Mô tả : Thực hiện axios chạy api
 * @param
 * @return
 * Created by: PTTAM
 * Created date: 08:57 1/9/2022
 */
BaseAPIConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error &&
      error.response &&
      (error.response.status == 401 || error.response.status == 500)
    ) {
      console.log('expired')
    }
    return Promise.reject(error)
  },
)

export default BaseAPIConfig
