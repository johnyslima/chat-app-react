import React from 'react'
import { Link } from 'react-router-dom'
import {
  FormControl,
  InputLabel,
  Input,
  Paper,
  CssBaseline,
  Typography,
  Button,
} from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from './styles'

const firebase = require('firebase')

class SignUp extends React.Component {
  constructor() {
    super()
    this.state = {
      email: null,
      password: null,
      passwordVerification: null,
      singupError: '',
    }
  }

  formIsValid = () => this.state.password === this.state.passwordVerification;

  changeTyping = (type, e) => {
    switch (type) {
      case 'email':
        this.setState({ email: e.target.value })
        break
      case 'password':
        this.setState({ password: e.target.value })
        break
      case 'passwordVerification':
        this.setState({ passwordVerification: e.target.value })
        break

      default:
        break
    }
  };

  submitSignup = (e) => {
    e.preventDefault()
    if (!this.formIsValid()) {
      this.setState({ singupError: 'Password do not match' })
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        (authRes) => {
          console.log(authRes)
          const userObj = {
            email: authRes.user.email,
          }
          firebase
            .firestore()
            .collection('users')
            .doc(this.state.email)
            .set(userObj)
            .then(
              () => {
                this.props.history.push('/dashboard')
              },
              (dbError) => {
                console.log(dbError)
                this.setState({ singupError: 'Failed to add user' })
              }
            )
        },
        (authError) => {
          console.log(authError)
          this.setState({ singupError: 'Failed to add user' })
        }
      )
    console.log('submit', this.state)
  };

  render() {
    const { classes } = this.props

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign Up!
          </Typography>
          <form onSubmit={(e) => this.submitSignup(e)} className={classes.form}>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-email--input">
                Enter your Email
              </InputLabel>
              <Input
                autoComplete="email"
                onChange={(e) => this.changeTyping('email', e)}
                autoFocus
                id="signup-email--input"
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password--input">
                Create a password
              </InputLabel>
              <Input
                type="password"
                onChange={(e) => this.changeTyping('password', e)}
                autoFocus
                id="signup-password--input"
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password-verification--input">
                Repeat your password
              </InputLabel>
              <Input
                type="password"
                onChange={(e) => this.changeTyping('passwordVerification', e)}
                autoFocus
                id="signup-password-verification--input"
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
          {this.state.singupError ? (
            <Typography className={classes.errorText} component="h5">
              {this.state.singupError}
            </Typography>
          ) : null}
          <Typography
            component="h5"
            variant="h6"
            className={classes.hasAccountHeader}
          >
            Already have a account?
          </Typography>
          <Link className={classes.logInLink} to="/login">
            Log in!
          </Link>
        </Paper>
      </main>
    )
  }
}

export default withStyles(styles)(SignUp)
