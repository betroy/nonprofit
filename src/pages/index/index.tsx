import Taro, { getCurrentInstance } from '@tarojs/taro'
import { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
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
    const { userid } = getCurrentInstance().router.params
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
    // indexStore.showModal()
    indexStore.navigateToLogin()
  }

  _hideModal = () => {
    const { indexStore } = this.props
    indexStore.hideModal()
  }

  _navigateLogin = () => {
    const { indexStore } = this.props
  }

  render() {
    const { isShowRuleModal } = this.props.indexStore
    return (
      <View className='index'>
        <View className='head'>
          <Text className='rule' onClick={() => {
            this._showModal()
          }}>活动规则</Text>

          <View className='head-bottom'>
            <View className='statistic-wrapper'>
              <Text className='statistic-text'>完成任务人数:5422人</Text>
              <Text className='statistic-text'>已捐出书本:520本</Text>
            </View>

            <Text className='share' onClick={() => {
              Taro.navigateTo({
                url: Constants.PAGE.Share,
              })
            }}>🎁</Text>
          </View>
        </View>

        <View className='body'>
          <Text className='task-tips'>完成任意一个任务即可解锁环保勋章</Text>

          <View className='item-task'>
            <Text>旧衣捐赠</Text>
            <Button size='mini' onClick={() => {
              Taro.navigateTo({
                url: Constants.PAGE.Donate
              })
            }}>去完成</Button>
          </View>

          <View className='item-task'>
            <Text>旧物改造</Text>
            <Button size='mini' onClick={() => {
              Taro.navigateTo({
                url: Constants.PAGE.Remould
              })
            }}>去完成</Button>
          </View>

          <View className='item-task'>
            <Text>线下沙龙</Text>
            <Button size='mini'>去完成</Button>
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
