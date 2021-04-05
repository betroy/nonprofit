import { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import { CommonModal } from '../../components'

import './index.scss'

type PageStateProps = {
  store: {
    counterStore: {
      counter: number,
      increment: Function,
      decrement: Function,
      incrementAsync: Function
    }
  }
}

interface Index {
  props: PageStateProps;
}

@inject('store')
@observer
class Index extends Component {
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  increment = () => {
    const { counterStore } = this.props.store
    counterStore.increment()
  }

  decrement = () => {
    const { counterStore } = this.props.store
    counterStore.decrement()
  }

  incrementAsync = () => {
    const { counterStore } = this.props.store
    counterStore.incrementAsync()
  }

  render() {
    const { counterStore: { counter } } = this.props.store
    return (
      <View className='index'>
        <View className='head'>
          <Button size='mini'>text</Button>
        </View>

        <CommonModal title='' content='' onCancelClick={() => {
          console.log('onCancelClick')
        }} onConfirmClick={() => {
          console.log('onConfirmClick')
        }} />
      </View>
    )
  }
}

export default Index
