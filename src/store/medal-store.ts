import { observable } from 'mobx'
import Taro from '@tarojs/taro'
import { Request } from '../core/network'

const medalStore = observable({
    isShowRuleModal: false,
    isShowShareMask: false,

    showModal() {
        this.isShowRuleModal = true
    },

    hideModal() {
        this.isShowRuleModal = false
    },

    showMask() {
        this.isShowShareMask = true
    },

    hideMask() {
        this.isShowShareMask = false
    }
})

export default medalStore