import { MockMethod } from 'vite-plugin-mock'
import { v4 as uuidv4 } from 'uuid'

export default [
  {
    url: '/api/user/get-userinfo',
    method: 'get',
    timeout: Math.floor(Math.random() * (1200 + 1)),
    response: () => {
      return {
        code: 0,
        msg: 'success',
        data: {
          userId: uuidv4(),
          username: '你的名字',
        },
      }
    },
  },
  {
    url: '/api/user/login',
    method: 'post',
    timeout: Math.floor(Math.random() * (1200 + 1)),
    response: ({ body }) => {
      const { username, password } = body
      if (username && password) {
        return {
          code: 0,
          msg: 'success',
          data: {
            userId: 123,
            username: 'leyi',
            realname: '乐毅',
            avatar: '',
            desc: '',
            roles: [],
            token: uuidv4(),
          },
        }
      } else {
        return {
          code: 1001,
          msg: '账号不存在或密码错误',
          data: {},
        }
      }
    },
  },
  {
    url: '/api/user/vrequest',
    method: 'post',
    timeout: 3000,
    response: () => {
      return {
        code: 0,
        msg: 'success',
        data: 'this is v-request post',
      }
    },
  },
] as MockMethod[]
