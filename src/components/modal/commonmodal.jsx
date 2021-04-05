/**
 *  通用弹窗
 * 
 * @author chenlongfeiceo@gmail.com 2020-02-13
*/

import { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import PropTypes from 'prop-types';

import closePng from '../../assets/images/ic_close.png'

import './commonmodal.scss'

class CommonModal extends Component {
    //-------------------------------------
    //#region [ui] 
    //-------------------------------------
    render() {
        const { title, content, cancelText, confirmText, onCancelClick, onConfirmClick } = this.props
        return (
            <View className='mask'>
                <View className='modal'>
                    {/** 标题 */}
                    <View className='head'>
                        <Text className='title'>{title}</Text>
                        <Image className='image' src={closePng} onClick={() => this.handleOnClose()} />
                    </View>
                    {/** 内容 */}
                    <Text className='content'>{content}</Text>
                    <View className='bottom'>
                        {/** 分割线 */}
                        <View className='horizontal-line' />
                        {/** 按钮 */}
                        <View className='content-btn' onClick={() => onCancelClick()}>
                            <View className='left-btn'>
                                <Text className='left-btn-text'>{cancelText}</Text>
                            </View>
                            <View className='vertical-line' />
                            <View className='right-btn' onClick={() => onConfirmClick()}>
                                <Text className='right-btn-text'>{confirmText}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View >
        )
    }
    //#endregion
}

CommonModal.defaultProps = {
    title: '提示',
    isShowClose: false,
    cancelText: '取消',
    confirmText: '确定'
}

CommonModal.propTypes = {
    title: PropTypes.string.isRequired, //提示的标题
    content: PropTypes.string.isRequired, //提示的内容
    isShowClose: PropTypes.bool, //是否显示关闭按钮
    cancelText: PropTypes.string, //取消按钮的文字，默认为"取消"
    confirmText: PropTypes.string, //确定按钮的文字，默认为"确定"
    onCancelClick: PropTypes.func.isRequired, //取消事件
    onConfirmClick: PropTypes.func.isRequired //确定事件
}

export { CommonModal }
