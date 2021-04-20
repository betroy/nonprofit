import { Component } from 'react'
import { View, Button, Text, Image } from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import './donate-result.scss'

type PageStateProps = {
  donateStore: {
    redirectToIndex: Function,
    updateTaskStatus: Function,
    watermarkImage: string,
  }
}

interface DonateResult {
  props: PageStateProps;
}

/**
 * 旧物改造结果页
 */
@inject('donateStore')
@observer
class DonateResult extends Component {
  componentWillMount() { }

  componentDidMount() {
    const { donateStore } = this.props
    donateStore.updateTaskStatus()
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  _redirectToIndex() {
    const { donateStore } = this.props
    donateStore.redirectToIndex()
  }

  render() {
    const { donateStore: { watermarkImage } } = this.props
    return (
      <View className='donate-result'>
        <View className='body'>
          <View className='reward-tips'>
            <Text>完成捐赠！</Text>
            <Text>你是一个有爱心懂环保的小朋友</Text>
          </View>

          <Image style='width: 200px;height: 200px;margin-top:30px'
            src={watermarkImage} />

          <Text className='rule-tips'>奖励你一枚旧衣风尚勋章</Text>

          <Text style='margin-top:30px' onClick={() => {
            this._redirectToIndex()
          }} >确定</Text>

          <Text style='margin-top:30px' onClick={() => {
          }}>分享好友抽大奖</Text>
        </View>
      </View>
    )
  }
}

export default DonateResult
