import Taro, { getCurrentInstance } from '@tarojs/taro'
import { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import { IndexRuleModal } from '../../components'
import { Constants } from '../../core/utils'

import './index.scss'

type PageStateProps = {
  indexStore: {
    isShowRuleModal: Boolean,
    isFinishDonateTask: Boolean,
    isFinishRemouldTask: Boolean,
    isFinishSalonTask: Boolean,
    taskFinishCount: Number,
    donateBookCount: Number,
    showModal: Function,
    hideModal: Function,
    queryTaskFinishCount: Function,
    queryTaskStatus: Function,
    querySalonTaskStatus: Function,
    saveUserid: Function,
    navigateToLoadPage: Function,
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
      this._saveUserid(userId)
      this._queryTaskFinishCount()
      this._queryTaskStatus()
      // this._querySalonTaskStatus()
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

  _saveUserid(userid: string) {
    const { indexStore } = this.props
    indexStore.saveUserid(userid)
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

  render() {
    const { isShowRuleModal, isFinishDonateTask, isFinishRemouldTask, isFinishSalonTask, taskFinishCount, donateBookCount } = this.props.indexStore
    return (
      <View className={isShowRuleModal ? 'index-modal' : 'index'}>
        <View className='index-head-wrapper'>
          <Image className='iamge-title' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/index/ic_index_title.png' />
          <Image className='image-desc' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/index/ic_index_desc.png' />
        </View>

        <View className='back'>
          <Text className='text'>返回</Text>
        </View>

        <View className='rule' onClick={() => {
          this._showModal()
        }}>
          <Text className='text'>活动规则</Text>
        </View>

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
                <Text className='title'>变废为宝</Text>
                <Text className='desc'>让旧物通过创益焕然一新</Text>
              </View>
            </View>

            <View className='btn-wrapper'
              onClick={() => {
                isFinishRemouldTask ? null :
                  Taro.navigateTo({
                    url: Constants.PAGE.Remould
                  })
              }}>
              <Text className='text'>{isFinishRemouldTask ? '已完成' : '去改造'}</Text>
            </View>
          </View>

          <View className='item-wrapper'>
            <View className='left-wrapper'>
              <Image className='image' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/index/ic_salon.png' />
              <View className='text-wrapper'>
                <Text className='title'>环保沙龙</Text>
                <Text className='desc'>线下交流发现更有爱的自己</Text>
              </View>
            </View>

            <View className='btn-wrapper'>
              <Text className='text'>{isFinishSalonTask ? '已完成' : '去参加'}</Text>
            </View>
          </View>
        </View>

        <View className='index_gift_wrapper'>
          {
            (isFinishDonateTask || isFinishRemouldTask || isFinishSalonTask) ?
              <Image className='image_luckdraw' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/index/ic_luck_draw.png' />
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
