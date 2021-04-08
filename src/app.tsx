import { Component } from 'react'
import { Provider } from 'mobx-react'

import stores from './store'

import './tcb'

import './app.scss'

class App extends Component {
  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // this.props.children 就是要渲染的页面
  render() {
    return (
      <Provider {...stores}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
