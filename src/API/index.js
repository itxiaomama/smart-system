import { get, post, deleteApi } from '../utils/https'
//租户管理---新增
export const tenant = () => {
  return get('/api/system/tenant?per_page=9999')
}
//租户管理---编辑
export const postTenant = (adadwa) => {
  return post('/api/system/tenant', adadwa)
}
//租户管理---删除
export const deleteTenant = (adadwa) => {
  return deleteApi('/api/system/tenant', adadwa)
} 