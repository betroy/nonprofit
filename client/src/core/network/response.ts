export default interface Response<T> {

  /**  @description 响应的http状态码 */
  statusCode?: number

  /**  @description 响应对应的命令字 */
  cmd?: string

  /**  @description 响应返回的body */
  data?: T |  {[propName: string]: any} | null

  /**  @description 响应的错误码 */
  code: number

  /**  @description 响应返回的错误信息 */
  msg?: string

  // response 可能附加的参数
  [propName: string]: any
}