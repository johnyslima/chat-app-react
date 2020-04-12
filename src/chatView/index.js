import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

class ChatView extends React.Component {

  componentDidUpdate = () => {
    const container = document.getElementById('chatview-container')
    if (container) {
      container.scrollTo(0, container.scrollHeight)
    }
  }

  render() {

    const { classes, chat, user } = this.props

    if (chat === undefined) {
      return (
        <main id="chatview-container" className={classes.content}>
          <h1>Hello</h1>
        </main>
      )
    }
    return (
      <div>
        <div className={classes.chatHeader}>
        Your converstaion with
          {' '}
          {chat.users.filter((_usr) => _usr !== user)}
        </div>
        <main id="chatview-container" className={classes.content}>
          {
            chat.messages.map((_msg, _index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={_index} className={_msg.sender === user ? classes.friendSent : classes.userSent}>
                {_msg.message}
              </div>
            ))
          }
        </main>
      </div>
    )


  }
}

export default withStyles(styles)(ChatView)
