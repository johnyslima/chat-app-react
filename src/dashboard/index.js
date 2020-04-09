import React from 'react'
import ChatList from '../chatlist'

const firebase = require('firebase')

class Dashboard extends React.Component {

  constructor() {
    super()
    this.state = {
      selectedChat: null,
      newChatFormVisible: false,
      email: null,
      chats: []
    }
  }

  newChatBtnClicked = () => {
    this.setState({newChatFormVisible: true, selectedChat: null})
  }

  selectChat = (chatIndex) => {
    console.log('selected chat', chatIndex)
  }

  componentDidMount = () => {
    const { history } = this.props
    firebase
      .auth()
      .onAuthStateChanged(async (_usr) => {
        if (!_usr) {
          history.push('/login')
        } else {
          await firebase
            .firestore()
            .collection('chats')
            .where('users', 'array-contains', _usr.email)
            .onSnapshot(async (res) => {
              const chats = res.docs.map((_doc) => _doc.data())
              await this.setState({
                email: _usr.email,
                chats
              })
              console.log(this.state)
            })
        }
      })
  }

  render() {
    const { history } = this.props
    const { chats, email, selectedChat } = this.state
    return (
      <div>
        <ChatList
          history={history}
          newChatBtnFn={this.newChatBtnClicked}
          selectChatFn={this.selectChat}
          chats={chats}
          userEmail={email}
          selectedChatIndex={selectedChat} />
      </div>
    )
  }
}

export default Dashboard
