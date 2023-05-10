import http from './service'
// mock
export const mockTest = (params) => http.post('/mock/test', params)

// 用户管理
export const getUserList = (params) => http.get('/user/list', { params })
export const addUser = (params) => http.post('/user/add', params)
export const editUser = (params) => http.post('/user/edit', params)
export const deleteUser = (params) => http.post('/user/delete', params)
export const deleteBatchUser = (params) => http.post('/user/deleteBatch', params)
export const userRegister = (params) => http.post('/user/register', params)
export const userLogin = (params) => http.post('/user/login', params)

// 菜单管理
export const getMenuList = (params) => http.get('/menu/list', { params })
export const getMenuListByPid = (params) =>
  http.get(`/menu/listByPid/${params.pid}`)
export const getMenuTree = (params) => http.get(`/menu/treeList`, params)
export const addMenu = (params) => http.post('/menu/add', params)
export const editMenu = (params) => http.post('/menu/edit', params)
export const deleteMenu = (params) => http.post('/menu/delete', params)
export const deleteBatchMenu = (params) => http.post('/menu/deleteBatch', params)

// 平台管理
export const getPlatformList = (params) => http.get('/platform/list', { params })
export const getPlatformListAll = (params) => http.get('/platform/listAll', { params })
export const addPlatform = (params) => http.post('/platform/add', params)
export const editPlatform = (params) => http.post('/platform/edit', params)
export const deletePlatform = (params) => http.post('/platform/delete', params)
export const deleteBatchPlatform = (params) => http.post('/platform/deleteBatch', params)

// 账号管理
export const getAccountList = (params) => http.get('/account/list', { params })
export const addAccount = (params) => http.post('/account/add', params)
export const editAccount = (params) => http.post('/account/edit', params)
export const deleteAccount = (params) => http.post('/account/delete', params)
export const deleteBatchAccount = (params) => http.post('/account/deleteBatch', params)

// 任务管理
export const getSysTaskList = (params) => http.get('/sysTask/list', { params })
export const addSysTask = (params) => http.post('/sysTask/add', params)
export const editSysTask = (params) => http.post('/sysTask/edit', params)
export const deleteSysTask = (params) => http.post('/sysTask/delete', params)
export const deleteBatchSysTask = (params) => http.post('/sysTask/deleteBatch', params)