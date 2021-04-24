import { Component } from 'react'
import { View, Image, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import Taro from '@tarojs/taro'

import { DonateResultModal } from '../../components'

import './donate.scss'

type PageStateProps = {
  donateStore: {
    takePhoto: Function,
    hideDonateModal: Function,
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

  _goBack = () => {
    Taro.navigateBack()
  }

  _hideDonateModal = () => {
    const { donateStore } = this.props
    donateStore.hideDonateModal()
  }

  render() {
    const { isShowDonateModal } = this.props.donateStore

    return (
      <View className='donate'>
        <View className='geometry-image-wrapper'>
          <Image className='image-oval' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/donate/ic_oval.png' />
          <Image className='image-rect' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/donate/ic_rect.png' />
        </View>
        <View className='back' onClick={() => {
          this._goBack()
        }}>
          <Text className='text'>返回</Text>
        </View>

        <Image className='image-do-it' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/donate/ic_do_it.png' />

        <Image className='image-title' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/donate/ic_donate_title.png' />

        <Image className='image-desc' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/donate/ic_donate_desc.png' />
        <View className='second-bg' >

          <Image className='image-text-1' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/donate/ic_donate_text_1.png' />

          <Image className='image-text-2' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/donate/ic_donate_text_2.png' />

          <Image className='image-donate-tips' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/donate/ic_donate_tips.png' />

          <Image className='image-bubble' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/donate/ic_bubble.png' />

          <Image className='image-submit-btn' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/donate/ic_donate_take_photo_btn.png' onClick={() => {
            this._takePhoto()
          }}>拍照上传我的捐赠时刻</Image>

          {isShowDonateModal &&
            <DonateResultModal onCloseClick={() => {
              this._hideDonateModal()
            }} />}
        </View>
      </View>
    )
  }
}

export default Donate
