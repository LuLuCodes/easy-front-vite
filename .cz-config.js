'use strict'
module.exports = {
  types: [
    { value: '✨特性', name: '特性:    一个新的特性' },
    { value: '🐛修复', name: '修复:    修复一个Bug' },
    { value: '📝文档', name: '文档:    变更的只有文档' },
    { value: '💄格式', name: '格式:    空格, 分号等格式修复' },
    { value: '♻️重构', name: '重构:    代码重构，注意和特性、修复区分开' },
    { value: '⚡️性能', name: '性能:    提升性能' },
    { value: '✅测试', name: '测试:    添加一个测试' },
    { value: '🔧工具', name: '工具:    开发工具变动(构建、脚手架工具等)' },
    { value: '⏪回滚', name: '回滚:    代码回退' },
  ],
  scopes: [],
  // override the messages, defaults are as follows
  messages: {
    type: '选择你提交的变更类型:',
    customScope: '(非必填)变更所影响的范围:',
    subject: '(必填)变更的简短描述:\n',
    body: '(非必填)变更的详细描述:\n',
    breaking: '(非必填)非兼容性变更说明:\n',
    footer: '(非必填)变更所关联的Issue ID， 例如: #31, #34:\n',
    confirmCommit: '你确定要继续执行上面的提交吗？',
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['特性', '修复'],
  // limit subject length
  subjectLimit: 100,
}
