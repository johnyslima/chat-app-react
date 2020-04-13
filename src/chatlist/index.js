import React from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
  Avatar,
  Typography,
  Button,
  Divider,
} from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import NotificationImportant from '@material-ui/icons/NotificationImportant'
import styles from './styles'

class ChatList extends React.Component {

  newChat = () => {
    console.log('this is a new chat')
    this.props.newChatBtnFn()
  }

  selectChat = (index) => {
    const { selectChatFn } = this.props
    console.log(`select chat ${index}`)
    selectChatFn(index)
  }

  userIsSender = (chat) => (
    chat.messages[chat.messages.length - 1].sender === this.props.userEmail
  )

  render() {

    const {
      classes,
      chats,
      selectedChatIndex,
      userEmail
    } = this.props

    if (chats.length > 0) {
      return (
        <main className={classes.root}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            className={classes.newChatBtn}
            onClick={this.newChat}>
              New Message
          </Button>
          <List>
            {
              chats.map((_chat, _index) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={_index}>
                  <ListItem
                    onClick={() => this.selectChat(_index)}
                    className={classes.listItem}
                    selected={selectedChatIndex === _index}
                    alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp">
                        {_chat.users.filter((_user) => _user !== userEmail)[0].split('')[0]}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={_chat.users.filter((_user) => _user !== userEmail)[0]}
                      secondary={(
                        <>
                          <Typography component="span" color="textPrimary">
                            {
                              `${_chat.messages[_chat.messages.length - 1].message.substring(0, 30)} ...`
                            }
                          </Typography>
                        </>
                      )} />
                    {
                      _chat.receiverHasRead === false && !this.userIsSender(_chat)
                        ? (
                          <ListItemIcon>
                            <NotificationImportant className={classes.unreadMessage} />
                          </ListItemIcon>
                        )
                        : null
                    }
                  </ListItem>
                  <Divider />
                </div>
              ))
            }
          </List>
        </main>
      )
    }
    return (
      <main className={classes.root}>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={this.newChat}
          className={classes.newChatBtn}>
          New Message
        </Button>
      </main>
    )


  }
}

export default withStyles(styles)(ChatList)
