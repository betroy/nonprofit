import { observable } from 'mobx'
import Taro from '@tarojs/taro'
import { Request } from '../core/network'

const shareStore = observable({
    isShowRuleModal: false,
})

export default shareStore