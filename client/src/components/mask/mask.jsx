/**
 *  通用弹窗
 * 
 * 2020-02-13
*/

import { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import PropTypes from 'prop-types';

import './mask.scss'

class Mask extends Component {
    //-------------------------------------
    //#region [ui] 
    //-------------------------------------
    render() {
        const { onDismiss } = this.props

        return (
            <View className='mask' onClick={() => onDismiss()}>
                <Text className='tips'>将小程序分享给好友</Text>
            </View >
        )
    }
    //#endregion
}

Mask.defaultProps = {
}

Mask.propTypes = {
    onDismiss: PropTypes.func.isRequired
}

export { Mask }
