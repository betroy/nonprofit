import { Component } from 'react'
import { View, Button, Text, Image } from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import { CommonModal, Mask } from '../../components'

import './medal.scss'

type PageStateProps = {
  medalStore: {
    isShowRuleModal: Boolean,
    showModal: Function,
    hideModal: Function,
    isShowShareMask: Boolean,
    showMask: Function,
    hideMask: Function,
  }
}

interface Medal {
  props: PageStateProps;
}

/**
 * 分享
 */
@inject('medalStore')
@observer
class Medal extends Component {
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  _showModal = () => {
    const { medalStore } = this.props
    medalStore.showModal()
  }

  _hideModal = () => {
    const { medalStore } = this.props
    medalStore.hideModal()
  }

  _showMask = () => {
    const { medalStore } = this.props
    medalStore.showMask()
  }

  _hideMask = () => {
    const { medalStore } = this.props
    medalStore.hideMask()
  }

  render() {
    const { medalStore: { isShowRuleModal, isShowShareMask } } = this.props
    console.log('isShowShareMask:' + isShowShareMask)
    return (
      <View className='share'>
        <Text className='rule' onClick={() => {
          this._showModal()
        }}>奖品/活动规则</Text>

        <View className='body'>
          <View className='reward-tips'>
            <Text>你是第666个完成捐赠的小朋友</Text>
            <Text>已获得旧衣风尚勋章</Text>
          </View>

          <Image style='width: 100px;height: 100px;background: #ccc;margin-top:30px'
          />

          <Text className='rule-tips'>将本活动分享给好友，可获得一次抽奖机会，快来参与吧</Text>

          <Text style='margin-top:30px' onClick={() => {
            this._showMask()
          }}>分享好友抽大奖</Text>

          <Text style='margin-top:30px'>保存分享海报</Text>
        </View>

        {
          isShowRuleModal &&
          <CommonModal title='规则' content='分享活动给好友即可参与抽奖'
            onCancelClick={() => {
            }}
            onConfirmClick={() => {
            }}
            onCloseClick={() => {
              this._hideModal()
            }}
          />
        }
        {
          isShowShareMask &&
          <Mask onDismiss={() => {
            this._hideMask()
          }}
          />
        }
      </View>
    )
  }
}

export default Medal
