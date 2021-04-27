/**
 *  通用弹窗
 * 
 *  2020-02-13
*/

import { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import PropTypes from 'prop-types';

import './index-rule-modal.scss'

class IndexRuleModal extends Component {
    //-------------------------------------
    //#region [ui] 
    //-------------------------------------
    render() {
        const { onCloseClick } = this.props
        return (
            <View className='index-rule-mask'>
                <View className='index-rule-modal'>
                    <View className='head-wrapper'>
                        <Image className='image-title' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/index/ic_index_rule_modal_head.png' />
                        <Image className='image-close' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/common/ic_donate_close.png' onClick={() => { onCloseClick() }} />
                    </View>

                    <View className='index-rule-content-wrapper'>
                        <Text className='title'>活动规则</Text>
                        <Text className='medal-text'>旧衣风尚</Text>
                    </View>

                </View>
            </View >
        )
    }
    //#endregion
}

IndexRuleModal.defaultProps = {
}

IndexRuleModal.propTypes = {
    onCloseClick: PropTypes.func.isRequired, //关闭弹窗事件
}

export { IndexRuleModal }
