import React from "react"
import { Link } from "react-router-dom"
import {
  FormControl,
  InputLabel,
  Input,
  Paper,
  CssBaseline,
  Typography,
  Button,
} from "@material-ui/core"
import withStyles from "@material-ui/core/styles/withStyles"
import styles from "./styles"

const firebase = require("firebase")
class Login extends React.Component {
  
  constructor() {
    super()
    this.state = {
      email: null,
      password: null,
      loginError: ''
    }
  }

  userTyping = (type, e) => {
    switch (type) {
      case 'email':
        this.setState({email: e.target.value})
        break;

      case 'password':
        this.setState({password: e.target.value})
        break;
    
      default:
        break;
    }
  }

  submitLogin = (e) => {
    e.preventDefault()

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.props.history.push('/dashboard')
      }, err => {
        this.setState({loginError: 'server error'})
        console.log(err)
      })
  }

  render() {
    const { classes } = this.props

    return (
      <main className={classes.main}>
        <CssBaseline></CssBaseline>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Log In!
          </Typography>
          <form className={classes.form} onSubmit={(e) => this.submitLogin(e)}>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="login-email--input">
                Enter your email
              </InputLabel>
              <Input
                autoComplete="email"
                autoFocus
                id="login-email--input"
                onChange={(e) => this.userTyping("email", e)}
              ></Input>
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="login-password--input">
                Enter your password
              </InputLabel>
              <Input
                type='password'
                autoComplete="password"
                autoFocus
                id="login-password--input"
                onChange={(e) => this.userTyping("password", e)}
              ></Input>
            </FormControl>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Login
            </Button>
          </form>
          {
            this.state.loginError ?
            <Typography className={classes.errorText} component='h5' variant='h6'>
              Incorrect Login Information
            </Typography> :
            null
          }
          <Typography
              component='h5'
              variant='h6'
              className={classes.noAccountHeader}
            >
              Don't have An Account?
            </Typography>
            <Link className={classes.signUpLink} to='/signup'>Sign Up!</Link>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(Login);
