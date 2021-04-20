/**
 *
 * Broadcast 广播管理器
 *
 * @example
 *
 * import { Broadcast } from '@cooper-core';
 *
 */

import Taro from '@tarojs/taro'

interface Broadcast {

  /**
  * 监听一个事件，接受参数
  */
  on(eventName: string | symbol, listener: (...args: any[]) => void): void

  /**
   * 添加一个事件监听，并在事件触发完成之后移除Callbacks链
   */
  once(eventName: string | symbol, listener: (...args: any[]) => void): void

  /**
   * 取消监听一个事件
   */
  off(eventName: string | symbol, listener?: (...args: any[]) => void): void

  /**
   * 取消监听的所有事件
   */
  off(): void

  /**
   * 触发一个事件，传参
   */
  trigger(eventName: string | symbol, ...args: any[]): void
}

/**
 * Broadcast 页面导航类，负责页面间的跳转
 */
const Broadcast: Broadcast = {
  on: (eventName: string | symbol, listener: (...args: any[]) => void): void => {
    Taro.eventCenter.on(eventName, listener)
  },

  once: (eventName: string | symbol, listener: (...args: any[]) => void): void => {
    Taro.eventCenter.once(eventName, listener)
  },

  off: (eventName?: string | symbol, listener?: (...args: any[]) => void): void => {
    if (eventName) {
      Taro.eventCenter.off(eventName, listener)
    } else {
      Taro.eventCenter.off()
    }
  },

  trigger: (eventName: string | symbol, ...args: any[]): void => {
    Taro.eventCenter.trigger(eventName, args)
  },
}


export default Broadcast