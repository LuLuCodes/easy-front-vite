/**
 * @description: Request result set
 */
export enum ResponseCode {
  OK = 0,
  PARM_ERROR = 1000,
  SIGN_ERROR = 1001,
  SYS_ERROR = 9999,
  UNKOWN_ERROR = 10000,
}

/**
 * @description: request method
 */
export enum RequestTypeEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * @description:  contentTyp
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
