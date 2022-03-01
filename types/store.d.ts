export interface RoleInfo {
  roleName: string
  value: string
}

export interface UserInfo {
  userId: string | number
  username: string
  realname: string
  avatar: string
  desc?: string
  roles?: RoleInfo[]
}
