import { Component } from 'react'
import { View, Image, Text, Button } from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import { CommonModal } from '../../components'

import './remould-course.scss'

type PageStateProps = {
  remouldStore: {
    takePhoto: Function,
  }
}

interface RemouldCourse {
  props: PageStateProps;
}

/**
 * 旧物改造教程
 */
@inject('remouldStore')
@observer
class RemouldCourse extends Component {
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
      <View className='remould-course'>
        <View className='pic-wrapper'>
          <Image style='width: 300px;height: 300px;background: #ccc;margin-top:30px' src='https://cdn.colorhub.me/63EY137pzRsrDsywX49kbnNAZEjl7y4MZraLwK49mGM/auto/0/500/ce/0/bG9jYWw6Ly8vYTQv/NWMvZWYzZTZjYWMz/NTM2OWI4ZmFmYjE2/Mjc1YTUwMGM5NzE1/YjdhYTQ1Yy5qcGVn.jpg' />
          <Image style='width: 300px;height: 300px;background: #ccc;margin-top:30px' src='https://cdn.colorhub.me/63EY137pzRsrDsywX49kbnNAZEjl7y4MZraLwK49mGM/auto/0/500/ce/0/bG9jYWw6Ly8vYTQv/NWMvZWYzZTZjYWMz/NTM2OWI4ZmFmYjE2/Mjc1YTUwMGM5NzE1/YjdhYTQ1Yy5qcGVn.jpg' />
        </View>
        <Button className='btn-take-photo' onClick={() => {
          this._takePhoto()
        }}>拍照上传成果</Button>
      </View>
    )
  }
}

export default RemouldCourse
