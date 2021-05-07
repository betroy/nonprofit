import Taro, { getCurrentInstance } from '@tarojs/taro'
import { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import { IndexRuleModal } from '../../components'
import { Constants } from '../../core/utils'

import './index.scss'
import { _allowStateChangesInsideComputed } from 'mobx'

type PageStateProps = {
  indexStore: {
    isShowRuleModal: Boolean,
    isFinishDonateTask: Boolean,
    isFinishRemouldTask: Boolean,
    isFinishSalonTask: Boolean,
    isStartSalonTask: Boolean,
    taskFinishCount: Number,
    donateBookCount: Number,
    showModal: Function,
    hideModal: Function,
    queryTaskFinishCount: Function,
    queryTaskStatus: Function,
    querySalonTaskStatus: Function,
    checkIsStartSalonTask: Function,
    setUserid: Function,
    setEnv: Function,
    navigateToLoadPage: Function,
    navigateToDonate: Function,
    navigateToRemould: Function,
    navigateToSalon: Function,
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
  componentWillMount() {
    console.log('componentWillMount')
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  componentDidShow() {
    console.log('componentDidShow')

    //接收小程序传递过来的参数
    console.log('params', getCurrentInstance().router.params)
    const { userId, env } = getCurrentInstance().router.params

    if (userId == undefined) {
      this._navigateToLoadPage()
    } else {
      console.log('userId', userId)
      this._setUserid(userId)
      this._setEnv(env)
      this._queryTaskFinishCount()
      this._queryTaskStatus()
      this._querySalonTaskStatus()
      this._checkIsStartSalonTask()
    }
  }

  componentDidHide() {
    console.log('componentDidHide')
  }

  _queryTaskFinishCount = () => {
    const { indexStore } = this.props
    indexStore.queryTaskFinishCount()
  }

  _queryTaskStatus() {
    const { indexStore } = this.props
    indexStore.queryTaskStatus()
  }

  _querySalonTaskStatus() {
    const { indexStore } = this.props
    indexStore.querySalonTaskStatus()
  }

  _checkIsStartSalonTask() {
    const { indexStore } = this.props
    indexStore.checkIsStartSalonTask()
  }

  _setUserid(userid: string) {
    const { indexStore } = this.props
    indexStore.setUserid(userid)
  }

  _setEnv(env: string) {
    const { indexStore } = this.props
    indexStore.setEnv(env)
  }

  _showModal = () => {
    const { indexStore } = this.props
    indexStore.showModal()
  }

  _hideModal = () => {
    const { indexStore } = this.props
    indexStore.hideModal()
  }

  _navigateToLoadPage = () => {
    const { indexStore } = this.props
    indexStore.navigateToLoadPage()
  }

  _navigateToDonate = () => {
    const { indexStore } = this.props
    indexStore.navigateToDonate()
  }

  _navigateToRemould = () => {
    const { indexStore } = this.props
    indexStore.navigateToRemould()
  }

  _navigateToSalon = () => {
    const { indexStore } = this.props
    indexStore.navigateToSalon()
  }

  _handleScroll = (isShowRuleModal) => {
    if (isShowRuleModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'scroll'
    }
  }

  render() {
    const { isShowRuleModal, isFinishDonateTask, isFinishRemouldTask, isFinishSalonTask, isStartSalonTask, taskFinishCount, donateBookCount } = this.props.indexStore

    this._handleScroll(isShowRuleModal)

    return (
      <View className='index'>
        <View className='index-head-wrapper'>
          <Image className='iamge-title' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/index/ic_index_title.png' />
          <Image className='image-desc' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/index/ic_index_desc.png' />
        </View>

        <View className='back'
          onClick={() => {
            window.history.go(-1)
          }} />

        <View className='rule'
          onClick={() => {
            this._showModal()
          }} />

        <View className='task-box'>
          <View className='task-count'>
            <View className='task-count-wrapper'>
              <Text className='task-count-label'>完成任务人数</Text>
              <Text className='task-count-text'>{taskFinishCount}</Text>
            </View>

            <View className='task-count-line' />

            <View className='task-count-wrapper'>
              <Text className='task-count-label'>已捐出书本</Text>
              <Text className='task-count-text'>{donateBookCount}</Text>
            </View>
          </View>

          <View className='space-33' />

          <View className='item-wrapper'>
            <View className='left-wrapper'>
              <Image className='image' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/index/ic_donate.png' />
              <View className='text-wrapper'>
                <Text className='title'>旧衣捐赠</Text>
                <Text className='desc'>衣份温暖让世界更美好</Text>
              </View>
            </View>

            <View className='btn-wrapper'
              onClick={() => {
                isFinishDonateTask ? null :
                  this._navigateToDonate()
              }}>
              <Text className='text'>{isFinishDonateTask ? '已完成' : '去捐赠'}</Text>
            </View>
          </View>

          <View className='item-wrapper'>
            <View className='left-wrapper'>
              <Image className='image' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/index/ic_remould.png' />
              <View className='text-wrapper'>
                <Text className='title'>变废为宝</Text>
                <Text className='desc'>让旧物通过创益焕然一新</Text>
              </View>
            </View>

            <View className='btn-wrapper'
              onClick={() => {
                isFinishRemouldTask ? null :
                  this._navigateToRemould()
              }}>
              <Text className='text'>{isFinishRemouldTask ? '已完成' : '去改造'}</Text>
            </View>
          </View>

          <View className='item-wrapper'>
            <View className='left-wrapper'>
              <Image className='image' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/index/ic_salon.png' />
              <View className='text-wrapper'>
                <Text className='title'>环保沙龙</Text>
                <Text className='desc'>5月20日起陆续开展，敬请期待</Text>
              </View>
            </View>

            <View className={isStartSalonTask ? 'btn-wrapper' : 'btn-wrapper_unavailable'}
              onClick={() => {
                (isFinishRemouldTask || !isStartSalonTask) ? null :
                  this._navigateToSalon()
              }}>
              <Text className={isStartSalonTask ? 'text' : 'text_unavailable'}>{isStartSalonTask ? (isFinishSalonTask ? '已完成' : '去参加') : '待开启'}</Text>
            </View>
          </View>
        </View>

        <View className='index_gift_wrapper'>
          {
            (isFinishDonateTask || isFinishRemouldTask || isFinishSalonTask) ?
              <Image className='image_luckdraw' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/index/ic_luck_draw.png'
                onClick={() => {
                  Taro.navigateTo({
                    url: Constants.PAGE.SharePage
                  })
                }} />
              :
              <Image className='image_unluckdraw' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/index/ic_un_luck_draw.png' />
          }
        </View>

        <Image className='image-classroom' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/index/ic_index_classroom.png' />

        <Image className='image-bottom-tips' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/index/ic_index_bottom_tips.png' />

        {isShowRuleModal &&
          <IndexRuleModal
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
