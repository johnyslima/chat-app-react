import React from 'react'
import { TextField } from '@material-ui/core'
import Send from '@material-ui/icons/Send'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'


class ChatTextBox extends React.Component {

  constructor() {
    super()
    this.state = {
      chatText: '',
    }
  }

  userTyping = (e) => (
    e.keyCode === 13
      ? this.submitMessage()
      : this.setState({
        chatText: e.target.value
      })
  )

  messageValid = (text) => text && text.replace(/\s/g, '').length

  userClickedInput = () => {
    this.props.messageReadFn()
  }

  submitMessage = () => {
    const { chatText } = this.state
    const { submitMessageFn } = this.props
    console.log('submit btn')
    if (this.messageValid(chatText)) {
      submitMessageFn(chatText)
      document.getElementById('chatTextBox').value = ''
    }
  }

  render() {

    const { classes } = this.props

    return (
      <div className={classes.chatTextBoxContainer}>
        <TextField
          placeholder="Type ur message..."
          onKeyUp={(e) => this.userTyping(e)}
          id="chatTextBox"
          className={classes.chatTextBox}
          onFocus={this.userClickedInput}
        />
        <Send onClick={this.submitMessage} className={classes.sendBtn} />
      </div>
    )
  }
}

export default withStyles(styles)(ChatTextBox)
