import { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import { CommonModal } from '../../components'

import './share.scss'

type PageStateProps = {
  shareStore: {
    isShowRuleModal: Boolean,
    showModal: Function,
    hideModal: Function,
  }
}

interface Share {
  props: PageStateProps;
}

@inject('shareStore')
@observer
class Share extends Component {
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  showModal = () => {
    const { shareStore } = this.props
    shareStore.showModal()
  }

  render() {
    const { shareStore: { isShowRuleModal } } = this.props
    return (
      <View className='share'>
        <Text className='rule' onClick={() => {
          this.showModal()
        }}>活动规则</Text>


        {isShowRuleModal &&
          <CommonModal title='' content='' onCancelClick={() => {
          }} onConfirmClick={() => {
          }} />}
      </View>
    )
  }
}

export default Share
