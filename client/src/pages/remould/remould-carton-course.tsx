import { getCurrentInstance } from '@tarojs/taro'
import { Component } from 'react'
import { View, Image, Text, Button } from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import './remould-carton-course.scss'

type PageStateProps = {
  remouldStore: {
    takePhoto: Function,
    navigateToLoadPage: Function,
    setEnv: Function,
    setUserid: Function,
  }
}

interface RemouldCartonCourse {
  props: PageStateProps;
}

/**
 * 旧物改造教程
 */
@inject('remouldStore')
@observer
class RemouldCartonCourse extends Component {
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

  render() {
    return (
      <View className='remould-carton-course'>
        <Image className='btn-take-photo' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/remould/ic_remould_carton_course_btn.png'
          onClick={() => {
            this._takePhoto()
          }}>拍照上传成果</Image>
      </View>
    )
  }
}

export default RemouldCartonCourse
