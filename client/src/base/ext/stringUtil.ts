 /**
 *
 * StringUtil string对象操作工具类
 *
 * 2020-12-16 21:06:57
 *
 */


interface StringUtil {

  /**
   * 判断给定参数是否是字符串
   */
  isString: (value?: any) => boolean

  /**
   * 判断给定字符串变量是否为空
   * @param {*} value
   */
  isEmpty: (value?: string | null) => boolean

  /**
   * 判断是否为正确的手机号
   * @param {*} value
   */
  isPhoneNum: (value: string) => boolean

  /**
   * 手机号格式化隐藏中间四位
   * @param {*} value
   */
  formatPhoneNo: (value: string) => string

  /**
   * url 添加get参数
   * @param key
   * @param value
   */
  addParamForUrl: (url: string, key: string, value: string) => string;
}

const StringUtil: StringUtil = {

  isString: (value?: any): boolean => {
    return  value instanceof String;
  },

  isEmpty: (value?: string): boolean => {
    if (value == null || typeof value != 'string' || value.length == 0) {
      return true
    }
    return false
  },

  isPhoneNum: (value: string): boolean => {
    const phoneReg = /^(1[0-9][0-9])\d{8}$/;
    if (!phoneReg.test(value)) {
      return false;
    } else {
      return true;
    }
  },

  formatPhoneNo: (value: string): string => {
    return value.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
  },

  addParamForUrl: (url: string, key: string, value: string): string => {
    let newStr: string = url;
    if (url.includes("#")) {
      const splits = url.split("#");
      if (url.indexOf("?") != -1) {
        newStr = splits[0] + "&" + key + "=" + value + splits[1];
      }

      if (url.indexOf("?") == -1) {
        newStr = splits[0] + "?" + key + "=" + value + splits[1];
      }
    } else {
      if (url.indexOf("?") != -1) {
        newStr = url + "&" + key + "=" + value;
      }

      if (url.indexOf("?") == -1) {
        newStr = url + "?" + key + "=" + value;
      }
    }
    return newStr;
  }
};

export default StringUtil;
