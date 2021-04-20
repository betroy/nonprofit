import { Component } from 'react'
import { View, Image, Text, Button } from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import './remould-result.scss'

type PageStateProps = {
  remouldStore: {
    watermarkImage: string,
    redirectToIndex: Function,
  }
}

interface RemouldResult {
  props: PageStateProps;
}

/**
 * 旧物改造结果
 */
@inject('remouldStore')
@observer
class RemouldResult extends Component {
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  _redirectToIndex = () => {
    const { remouldStore } = this.props
    remouldStore.redirectToIndex()
  }

  render() {
    const { remouldStore: { watermarkImage } } = this.props

    return (
      <View className='remould-result'>

        <Image style='width: 200px;height: 200px;margin-top:30px'
          src={watermarkImage} />

        <Text>已完成旧物改造</Text>

        <Text>太厉害啦，你真是个改造小能手</Text>

        <Text style='margin-top:30px' onClick={() => {
          this._redirectToIndex()
        }} >关闭</Text>
      </View>
    )
  }
}

export default RemouldResult
