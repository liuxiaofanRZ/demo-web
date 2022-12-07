import http from './service'
// mock
export const mockTest = (data) => http.post('/mock/test', data)

// 用户管理
export const getUserList = (params) => http.get('/user/list', { params })
export const addUser = (data) => http.post('/user/add', data)
export const editUser = (data) => http.post('/user/edit', data)
export const deleteUser = (data) => http.post('/user/delete', data)

// 菜单管理
export const getMenuList = (params) => http.get('/menu/list', { params })
export const getMenuListByPid = (params) =>
  http.get(`/menu/listByPid/${params.pid}`)
export const getMenuTree = (params) => http.get(`/menu/treeList`, params)
export const addMenu = (data) => http.post('/menu/add', data)
export const editMenu = (data) => http.post('/menu/edit', data)
export const deleteMenu = (data) => http.post('/menu/delete', data)
