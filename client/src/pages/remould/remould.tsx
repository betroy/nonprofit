import Taro, { getCurrentInstance } from '@tarojs/taro'
import { Component } from 'react'
import { View, Image, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import { CommonModal } from '../../components'

import './remould.scss'

type PageStateProps = {
  remouldStore: {
    navigatorToCourse: Function,
    takePhoto: Function,
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

  _takePhoto = () => {
    const { remouldStore } = this.props
    remouldStore.takePhoto()
  }

  _navigatorToCourse() {
    const { remouldStore } = this.props
    remouldStore.navigatorToCourse()
  }

  _goBack = () => {
    Taro.navigateBack()
  }


  render() {
    // const { remouldStore: { isShowRuleModal } } = this.props
    return (
      <View className='remould' >
        <View className='back' onClick={() => {
          this._goBack()
        }}>
          <Text className='text'>返回</Text>
        </View>

        <View className='margin-175' />

        <Image className='image-remould-carton' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/remould/ic_remould_carton.png' />

        <Image className='image-remould-plastic' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/remould/ic_remould_plastic.png' />

        <Image className='image-remould-clothes' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/remould/ic_remould_clothes.png' />

        <Image
          className='image-remould-takephoto' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/remould/ic_remould_takephoto.png' />

        <Image className='image-remould-btn' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/remould/ic_remould_btn.png'
          onClick={() => {
            this._takePhoto()
          }} />

      </View>
    )
  }
}

export default Remould
