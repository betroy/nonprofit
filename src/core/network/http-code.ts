
export default {
  LOGIC_SUCCESS            : 0,    // 服务逻辑成功

  HTTP_SUCCESS             : 200,
  HTTP_CREATED             : 201,
  HTTP_ACCEPTED            : 202,
  HTTP_CLIENT_ERROR        : 400,
  HTTP_AUTHENTICATE        : 401,
  HTTP_FORBIDDEN           : 403,
  HTTP_NOT_FOUND           : 404,
  HTTP_SERVER_ERROR        : 500,
  HTTP_BAD_GATEWAY         : 502,
  HTTP_SERVICE_UNAVAILABLE : 503,
  HTTP_GATEWAY_TIMEOUT     : 504,

  /** 网络错误(超时或其它) */
  NETWORK_ERROR       : -1001,  // 网络错误（可能是没网络或网络有问题）
  LOST_LOGIN          : -1002,  // 登录错误（可能是没登录或丢失登录态）
}
