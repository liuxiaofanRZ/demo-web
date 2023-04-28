import http from './service'
// mock
export const mockTest = (data) => http.post('/mock/test', data)

// 用户管理
export const getUserList = (params) => http.get('/user/list', { params })
export const addUser = (data) => http.post('/user/add', data)
export const editUser = (data) => http.post('/user/edit', data)
export const deleteUser = (data) => http.post('/user/delete', data)
export const deleteBatchUser = (data) => http.post('/user/deleteBatch', data)
export const userRegister = (data)=> http.post('/user/register',data)

// 菜单管理
export const getMenuList = (params) => http.get('/menu/list', { params })
export const getMenuListByPid = (params) =>
  http.get(`/menu/listByPid/${params.pid}`)
export const getMenuTree = (params) => http.get(`/menu/treeList`, params)
export const addMenu = (data) => http.post('/menu/add', data)
export const editMenu = (data) => http.post('/menu/edit', data)
export const deleteMenu = (data) => http.post('/menu/delete', data)
export const deleteBatchMenu = (data) => http.post('/menu/deleteBatch', data)

// 平台管理
export const getPlatformList = (params) => http.get('/platform/list', { params })
export const getPlatformListAll = (params) => http.get('/platform/listAll', { params })
export const addPlatform = (data) => http.post('/platform/add', data)
export const editPlatform = (data) => http.post('/platform/edit', data)
export const deletePlatform = (data) => http.post('/platform/delete', data)
export const deleteBatchPlatform = (data) => http.post('/platform/deleteBatch', data)

// 账号管理
export const getAccountList = (params) => http.get('/account/list', { params })
export const addAccount = (data) => http.post('/account/add', data)
export const editAccount = (data) => http.post('/account/edit', data)
export const deleteAccount = (data) => http.post('/account/delete', data)
export const deleteBatchAccount = (data) => http.post('/account/deleteBatch', data)

// 任务管理
export const getSysTaskList = (params) => http.get('/sysTask/list', { params })
export const addSysTask = (data) => http.post('/sysTask/add', data)
export const editSysTask = (data) => http.post('/sysTask/edit', data)
export const deleteSysTask = (data) => http.post('/sysTask/delete', data)
export const deleteBatchSysTask = (data) => http.post('/sysTask/deleteBatch', data)