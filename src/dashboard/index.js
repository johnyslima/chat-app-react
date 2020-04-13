import React from 'react'
import { Button } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import ChatList from '../chatlist'
import styles from './styles'
import ChatView from '../chatView'
import ChatTextBox from '../chatTextBox'
import NewChat from '../newChat'

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

  selectChat = async (chatIndex) => {
    await this.setState({selectedChat: chatIndex, newChatFormVisible: false})
    this.messsageRead()
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

  clickedChatWhereNotSender = (chatIndex) => {
    const { chats, email } = this.state
    return (
      chats[chatIndex].messages[chats[chatIndex].messages.length - 1].sender !== email
    )
  }

  messsageRead = () => {
    const { chats, selectedChat, email } = this.state
    const docKey = this.buildDocKey(chats[selectedChat].users.filter((_usr) => _usr !== email))
    if (this.clickedChatWhereNotSender(selectedChat)) {
      firebase
        .firestore()
        .collection('chats')
        .doc(docKey)
        .update({ receiverHasRead: true })
    } else {
      console.log('Clicked message where the user was the sender')
    }
  }

  goToChat = async (docKey, msg) => {
    const usersInChat = docKey.split(':')
    const chat = this.state.chats.find((_chat) => usersInChat.every((_user) => _chat.users.includes(_user)))
    this.setState({ newChatFormVisible: false })
    await this.selectChat(this.state.chats.indexOf(chat))
    this.submitMessage(msg)
  }

  newChatSubmit = async (chatObj) => {
    const docKey = this.buildDocKey(chatObj.sendTo)
    await firebase
      .firestore()
      .collection('chats')
      .doc(docKey)
      .set({
        receiverHasRead: false,
        users: [this.state.email, chatObj.sendTo],
        messages: [{
          message: chatObj.message,
          sender: this.state.email
        }]
      })
    this.setState({ newChatFormVisible: false })
    this.selectChat(this.state.chats.length - 1)
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
            ? <ChatTextBox messageReadFn={this.messsageRead} submitMessageFn={this.submitMessage} />
            : null

        }
        {
          this.state.newChatFormVisible
            ? (
              <NewChat goToChatFn={this.goToChat} newChatSubmitFn={this.newChatSubmit} />
            )
            : null
        }
        <Button onClick={this.signOut} className={classes.signOutBtn}>Sign out</Button>
      </div>
    )
  }
}

export default withStyles(styles)(Dashboard)
