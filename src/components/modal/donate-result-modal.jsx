/**
 *  通用弹窗
 * 
 * @author chenlongfeiceo@gmail.com 2020-02-13
*/

import { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import PropTypes from 'prop-types';

import './donate-result-modal.scss'

class DonateResultModal extends Component {
    //-------------------------------------
    //#region [ui] 
    //-------------------------------------
    render() {
        const { onCancelClick, onConfirmClick, onCloseClick } = this.props
        return (
            <View className='donate-result-mask'>
                <View className='donate-result-modal'>
                    <View className='head-wrapper'>
                        <Image className='image-title' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/donate/ic_donate_result_titile.png' />
                        <Image className='image-close' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/donate/ic_donate_result_close.png' onClick={() => { onCloseClick() }} />
                    </View>

                    <View className='content-wrapper'>
                        <Text className='title'>恭喜张小白获得勋章</Text>
                        <Text className='medal-text'>旧衣风尚</Text>
                        <Image className='image-medal' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/donate/ic_donate_result_medal.png' />
                        <View className='image-box'>
                            <View className='spacebetween-top'>
                                <View className='left-wrapper'>
                                    <Text className='text-index'>成为第 588 位</Text>
                                    <Text className='text-nickname'>环保小卫士</Text>
                                </View>
                                <Image className='image-qr-code' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/donate/ic_donate_result_qr_code.png' />
                            </View>

                            <View className='spacebetween-bottom'>
                                <Image className='image-pa' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/donate/ic_donate_result_pa.png' />
                                <Text className='text'>一场有意义的公益之旅</Text>
                            </View>
                        </View>
                    </View>



                    <View className='bottom-wrapper'>
                        <View className='save-wrapper'>
                            <Text className='text'>保存分享海报</Text>
                        </View>

                        <View className='share-wrapper'>
                            <Text className='text'>分享好友抽大奖</Text>
                        </View>
                    </View>
                </View>
            </View >
        )
    }
    //#endregion
}

DonateResultModal.defaultProps = {
}

DonateResultModal.propTypes = {
    // onCancelClick: PropTypes.func.isRequired, //取消事件
    // onConfirmClick: PropTypes.func.isRequired, //确定事件
    onCloseClick: PropTypes.func.isRequired, //关闭弹窗事件
}

export { DonateResultModal }
