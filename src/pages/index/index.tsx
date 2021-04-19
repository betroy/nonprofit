import Taro, { getCurrentInstance } from '@tarojs/taro'
import { Component } from 'react'
import { View, Button, Text, Image } from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import { CommonModal } from '../../components'
import { Constants } from '../../core/utils'

import './index.scss'

type PageStateProps = {
  indexStore: {
    isShowRuleModal: Boolean,
    showModal: Function,
    hideModal: Function,
    queryTaskFinishCount: Function,
    queryTaskStatus: Function,
    saveUserid: Function,
    navigateToLogin: Function,
  }
}

interface Index {
  props: PageStateProps;
}

/**
 * 活动首页
 */
@inject('indexStore')
@observer
class Index extends Component {
  componentWillMount() { }

  componentDidMount() {
    //接收小程序传递过来的参数
    console.log('params', getCurrentInstance().router.params)
    const { userId } = getCurrentInstance().router.params
    this._saveUserid('421575839')
    this._queryTaskFinishCount()
    this._queryTaskStatus()
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  _queryTaskFinishCount = () => {
    const { indexStore } = this.props
    indexStore.queryTaskFinishCount()
  }

  _queryTaskStatus() {
    const { indexStore } = this.props
    indexStore.queryTaskStatus()
  }

  _saveUserid(userid: string) {
    const { indexStore } = this.props
    indexStore.saveUserid(userid)
  }

  _showModal = () => {
    const { indexStore } = this.props
    indexStore.showModal()
    // indexStore.navigateToLogin()
  }

  _hideModal = () => {
    const { indexStore } = this.props
    indexStore.hideModal()
  }

  _navigateLogin = () => {
    const { indexStore } = this.props
  }

  render() {
    const { isShowRuleModal, isFinishDonateTask, isFinishRemouldTask, isFinishSalonTask, taskFinishCount, donateBookCount } = this.props.indexStore
    return (
      <View className='index'>
        <View className='spacebetween'>
          <View className='back'>
            <Text className='text'>返回</Text>
          </View>

          <View className='rule' onClick={() => {
            this._showModal()
          }}>
            <Text className='text'>活动规则</Text>
          </View>
        </View>

        <Image className='nonprofit-brand' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/index/ic_index_nonprofit.png' />

        <Image className='bank-brand' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/index/ic_index_bank_brand.png' />

        <Text className='events-time-text'>活动日期：2021.04.22~04.22</Text>

        <View className='image-task-count'>
          <View className='task-count-wrapper'>
            <Text className='task-count-label'>完成任务人数</Text>
            <Text className='task-count-text'>{taskFinishCount}</Text>
          </View>

          <View className='task-count-wrapper'>
            <Text className='task-count-label'>已捐出书本</Text>
            <Text className='task-count-text'>{donateBookCount}</Text>
          </View>
        </View>

        <View className='task-count-box'>
          <View className='head-wrapper'>
            <View className='left-wrapper'>
              <Image className='tips' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/index/ic_index_tips.png' />
              <Text className='text'>完成任意一个任务即可解锁环保勋章</Text>
            </View>
            <Image className='gift' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/index/ic_index_gift.png' onClick={() => {
              // Taro.navigateTo({
              //   url: Constants.PAGE.Share,
              // })
            }} />
          </View>

          <View className='space-46' />

          <View className='item-wrapper'>
            <View className='left-wrapper'>
              <Image className='image' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/index/ic_donate.png' />
              <View className='text-wrapper'>
                <Text className='title'>旧衣捐赠</Text>
                <Text className='desc'>一句话描述任务概要</Text>
              </View>
            </View>

            <View className='btn-wrapper'
              onClick={() => {
                Taro.navigateTo({
                  url: Constants.PAGE.Donate
                })
              }}>
              <Text className='text'>{isFinishDonateTask ? '已完成' : '去捐赠'}</Text>
            </View>
          </View>

          <View className='item-wrapper'>
            <View className='left-wrapper'>
              <Image className='image' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/index/ic_remould.png' />
              <View className='text-wrapper'>
                <Text className='title'>旧物改造</Text>
                <Text className='desc'>什么是旧物改造</Text>
              </View>
            </View>

            <View className='btn-wrapper'
              onClick={() => {
                // Taro.navigateTo({
                //   url: Constants.PAGE.Remould
                // })
              }}>
              <Text className='text'>{isFinishRemouldTask ? '已完成' : '去改造'}</Text>
            </View>
          </View>

          <View className='item-wrapper'>
            <View className='left-wrapper'>
              <Image className='image' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/index/ic_salon.png' />
              <View className='text-wrapper'>
                <Text className='title'>线下沙龙</Text>
                <Text className='desc'>什么是线下沙龙</Text>
              </View>
            </View>

            <View className='btn-wrapper'>
              <Text className='text'>{isFinishSalonTask ? '已完成' : '去参加'}</Text>
            </View>
          </View>
        </View>

        {isShowRuleModal &&
          <CommonModal title='活动规则' content='活动规则活动规则活动规则活动规则'
            onCancelClick={() => {
            }}
            onConfirmClick={() => {
            }}
            onCloseClick={() => {
              this._hideModal()
            }}
          />
        }
      </View>
    )
  }
}

export default Index
