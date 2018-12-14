import http from './public'
export const host = 'https://test.dtc233.com'
// const host = '/jz'

export const ERR_OK = 200

// 登录接口
// export const loginUrl = host + '/api/admin/auth/login';

// 课表列表
export const userListUrl = host + '/api/admin/user/list';
// 用户封禁操作
export const banUrl = host + '/api/admin/user/ban';
// 反馈列表
export const feedbackUrl = host + '/api/admin/feedback/list';
// 删除反馈
export const feedbackDelUrl = host + '/api/admin/feedback/del';
// 任务列表
export const taskListUrl = host + '/api/admin/task/list';
// 任务指派师傅
export const sendMasterUrl = host + '/api/admin/task/master/send';
// 手动取消任务
export const cancelTaskUrl = host + '/api/admin/task/cancel';
// 手动取消任务
export const taskCommentUrl = host + '/api/admin/task/comment';
// 施工汇报
export const reportListUrl = host + '/api/admin/report/list';
// 施工汇报删除
export const reportDelUrl = host + '/api/admin/report/del';
// 申请师傅的审核列表
export const masterApplyListUrl = host + '/api/admin/master/apply';




