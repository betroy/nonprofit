import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import { CommonModal } from '../../components'

import './index.scss'

type PageStateProps = {
  indexStore: {
    isShowRuleModal: Boolean,
    showModal: Function,
    hideModal: Function,
  }
}

interface Index {
  props: PageStateProps;
}

@inject('indexStore')
@observer
class Index extends Component {
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  _showModal = () => {
    const { indexStore } = this.props
    indexStore.showModal()
  }

  render() {
    const { isShowRuleModal } = this.props.indexStore
    return (
      <View className='index'>
        <View className='head'>
          <Text className='rule' onClick={() => {
            this._showModal()
          }}>活动规则</Text>

          <Text className='share' onClick={() => {
            Taro.navigateTo({
              url: '/pages/share/share',
            })
          }}>分享</Text>

          <View className='statistic-wrapper'>
            <Text>完成任务人数:5422人</Text>
            <Text>已捐出书本:520本</Text>
          </View>
        </View>

        <Text>完成任意一个任务即可解锁环保勋章</Text>

        <View className='item-task'>
          <Text>旧衣捐赠</Text>
          <Button size='mini'>去完成</Button>
        </View>

        <View className='item-task'>
          <Text>旧物改造</Text>
          <Button size='mini'>去完成</Button>
        </View>

        <View className='item-task'>
          <Text>线下沙龙</Text>
          <Button size='mini'>去完成</Button>
        </View>

        {isShowRuleModal &&
          <CommonModal title='' content='' onCancelClick={() => {
          }} onConfirmClick={() => {
          }} />}
      </View>
    )
  }
}

export default Index
