import React from 'react'
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Paper,
  CssBaseline,
  Typography
} from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from './styles'

const firebase = require('firebase')

class NewChat extends React.Component {

  constructor() {
    super()
    this.state = {
      username: null,
      message: null
    }
  }

  userTyping = (type, e) => {
    switch (type) {
      case 'username':
        this.setState({username: e.target.value})
        break
      case 'message':
        this.setState({message: e.target.value})
        break

      default:
        break
    }
  }

  submitNewChat = async (e) => {
    console.log(e)
    e.preventDefault()
    const userExists = await this.userExists()
    if (userExists) {
      const chatExists = await this.chatExists()
      // eslint-disable-next-line no-unused-expressions
      chatExists ? this.goToChat() : this.createChat()
    }
  }

  createChat = () => {
    this.props.newChatSubmitFn({
      sendTo: this.state.username,
      message: this.state.message
    })
  }

  goToChat = () => {
    this.props.goToChatFn(this.buildDocKey(), this.state.message)
  }

  buildDocKey = () => [firebase.auth().currentUser.email, this.state.username].sort().join(':')

  chatExists = async () => {
    const docKey = this.buildDocKey()
    const chat = await firebase
      .firestore()
      .collection('chats')
      .doc(docKey)
      .get()
    console.log(chat.exists)
    return chat.exists
  }

  userExists = async () => {
    const usersSnapshot = await firebase
      .firestore()
      .collection('users')
      .get()
    const exists = usersSnapshot.docs
      .map((_doc) => _doc.data().email)
      .includes(this.state.username)
    this.setState({ serverError: !exists })
    return exists
  }

  render() {

    const { classes } = this.props
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">Send a message!</Typography>
          <form className={classes.form} onSubmit={(e) => this.submitNewChat(e)}>
            <FormControl fullWidth>
              <InputLabel htmlFor="new-chat-username">
                Enter your friend`s Email
              </InputLabel>
              <Input
                required
                className={classes.input}
                autoFocus
                onChange={(e) => this.userTyping('username', e)}
                id="new-chat-username" />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="new-chat-message">
                Enter your message
              </InputLabel>
              <Input
                required
                className={classes.input}
                onChange={(e) => this.userTyping('message', e)}
                id="new-chat-meesage" />
            </FormControl>
            <Button
              fullWidth
              className={classes.submit}
              variant="contained"
              color="primary"
              type="submit">
              Submit
            </Button>
          </form>
          {
            this.state.serverError
              ? (
                <Typography component="h5" variant="h6" className={classes.errorText}>
              Unable to locate the user
                </Typography>
              )
              : null
          }
        </Paper>
      </main>
    )
  }
}

export default withStyles(styles)(NewChat)
