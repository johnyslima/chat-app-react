import React from 'react'
import { Button } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import ChatList from '../chatlist'
import styles from './styles'
import ChatView from '../chatView'
import ChatTextBox from '../chatTextBox'

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
    this.setState({selectedChat: chatIndex})
    console.log('index: ', chatIndex)
  }

  submitMessage = (message) => {
    const { chats, selectedChat, email } = this.state
    const docKey = this.buildDocKey(chats[selectedChat]
      .users.filter((_usr) => _usr !== email))
    firebase
      .firestore()
      .collection('chats')
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: email,
          message,
          timestamp: Date.now()
        }),
        receiverHasRead: false
      })
  }

  buildDocKey = (friend) => [this.state.email, friend].sort().join(':')

  signOut = () => {
    firebase
      .auth()
      .signOut()
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
    const { history, classes } = this.props
    const {
      chats,
      email,
      selectedChat,
      newChatFormVisible
    } = this.state
    return (
      <div>
        <ChatList
          history={history}
          newChatBtnFn={this.newChatBtnClicked}
          selectChatFn={this.selectChat}
          chats={chats}
          userEmail={email}
          selectedChatIndex={selectedChat} />
        {
          newChatFormVisible
            ? null
            : (
              <ChatView user={email} chat={chats[selectedChat]} />
            )
        }
        {
          selectedChat !== null && !newChatFormVisible
            ? <ChatTextBox submitMessageFn={this.submitMessage} />
            : null

        }
        <Button onClick={this.signOut} className={classes.signOutBtn}>Sign out</Button>
      </div>
    )
  }
}

export default withStyles(styles)(Dashboard)
