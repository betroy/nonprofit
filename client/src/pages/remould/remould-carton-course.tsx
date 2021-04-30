import { Component } from 'react'
import { View, Image, Text, Button } from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import './remould-carton-course.scss'

type PageStateProps = {
  remouldStore: {
    takePhoto: Function,
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

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  _takePhoto = () => {
    const { remouldStore } = this.props
    remouldStore.takePhoto()
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
