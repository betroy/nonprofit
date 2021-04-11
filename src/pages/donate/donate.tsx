import { Component } from 'react'
import { View, Button, Text, Image } from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import { CommonModal } from '../../components'

import './donate.scss'

type PageStateProps = {
  donateStore: {
    takePhoto: Function,
    image: String,
  }
}

interface Donate {
  props: PageStateProps;
}

/**
 * 旧物改造
 */
@inject('donateStore')
@observer
class Donate extends Component {
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  _takePhoto = () => {
    const { donateStore } = this.props
    donateStore.takePhoto()
  }

  render() {
    return (
      <View className='donate'>
        <Text>
          小朋友你好呀
        </Text>
        <Text>
          欢迎来到旧衣捐赠板块，能进入这里相信你一定是个超有爱心的孩子。
        </Text>

        <Button size='mini' type='primary' onClick={() => {
          this._takePhoto()
        }}>拍照上传我的捐赠时刻</Button>
      </View>
    )
  }
}

export default Donate
