/**
 * 全局对象
 */

import { StringUtil } from '../../base/index';
import Constants from "./constants";
import Broadcast from './broadcast'
import Cache from "./cache";
import Device from "./device";


//#region [define] type define

interface ContextType {
  shareInstance: any
}

const shareContainer: ContextType = {
  shareInstance: null
}

//#endregion

class Context {

  /** 全局 cache */
  globalCache: Cache


  constructor() {
    this.globalCache = new Cache();
  }


  static shareInstance(): Context {
    if (shareContainer.shareInstance == undefined) {
      shareContainer.shareInstance = new Context();
    }
    return shareContainer.shareInstance;
  }

}

export default Context;
