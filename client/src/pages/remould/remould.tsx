import Taro, { getCurrentInstance } from '@tarojs/taro'
import { Component } from 'react'
import { View, Image, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import './remould.scss'

type PageStateProps = {
  remouldStore: {
    navigatorToPlasticCourse: Function,
    navigatorToCartonCourse: Function,
    navigatorToClothesCourse: Function,
    navigateToLoadPage: Function,
    takePhoto: Function,
    setEnv: Function,
    setUserid: Function,
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

  componentDidMount() {
    window.scrollTo(0, 0)

    //接收小程序传递过来的参数
    console.log('params', getCurrentInstance().router.params)
    const { userId, env } = getCurrentInstance().router.params

    if (userId == undefined) {
      this._navigateToLoadPage()
    } else {
      this._setUserid(userId)
    }

    if (env != undefined) {
      this._setEnv(env)
    }
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  _takePhoto = () => {
    const { remouldStore } = this.props
    remouldStore.takePhoto()
  }

  _navigatorToCartonCourse() {
    const { remouldStore } = this.props
    remouldStore.navigatorToCartonCourse()
  }

  _navigatorToPlasticCourse() {
    const { remouldStore } = this.props
    remouldStore.navigatorToPlasticCourse()
  }

  _navigatorToClothesCourse() {
    const { remouldStore } = this.props
    remouldStore.navigatorToClothesCourse()
  }

  _navigateToLoadPage = () => {
    const { remouldStore } = this.props
    remouldStore.navigateToLoadPage()
  }

  _setEnv(env: string) {
    const { remouldStore } = this.props
    remouldStore.setEnv(env)
  }

  _setUserid(userid: string) {
    const { remouldStore } = this.props
    remouldStore.setUserid(userid)
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
        }} />

        <View className='margin-175' />

        <Image className='image-remould-carton' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/remould/ic_remould_carton.png'
          onClick={() => {
            this._navigatorToCartonCourse()
          }} />

        <Image className='image-remould-plastic' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/remould/ic_remould_plastic.png'
          onClick={() => {
            this._navigatorToPlasticCourse()
          }} />

        <Image className='image-remould-clothes' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/remould/ic_remould_clothes.png'
          onClick={() => {
            this._navigatorToClothesCourse()
          }} />

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
