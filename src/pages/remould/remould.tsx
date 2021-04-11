import { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import { CommonModal } from '../../components'

import './remould.scss'

type PageStateProps = {
  remouldStore: {
    navigatorToCourse: Function,
  }
}

interface Remould {
  props: PageStateProps;
}

/**
 * 旧物改造
 */
@inject('remouldStore')
@observer
class Remould extends Component {
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  _navigatorToCourse() {
    const { remouldStore } = this.props
    remouldStore.navigatorToCourse()
  }

  render() {
    // const { remouldStore: { isShowRuleModal } } = this.props
    return (
      <View className='remould' >
        <Text>选择你想改造的小创意</Text>

        <View className='item-wrapper' onClick={() => {
          this._navigatorToCourse()
        }}>
          <Text>纸杯投影机</Text>
        </View>

        <View className='item-wrapper' onClick={() => {
          this._navigatorToCourse()
        }}>
          <Text>矿泉水瓶小飞机</Text>
        </View>

        <View className='item-wrapper' onClick={() => {
          this._navigatorToCourse()
        }}>
          <Text>纸板小花瓶</Text>
        </View>

      </View>
    )
  }
}

export default Remould
