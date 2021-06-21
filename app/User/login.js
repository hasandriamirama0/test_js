import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  withStyles,
  Paper,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  IconButton,
  FormHelperText,
  Typography
} from '@material-ui/core';
import { userActions } from '../_actions';

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    padding: '16px 196px',
  },
  paper: {
    width: '50%',
    padding: theme.spacing(4),
  },
});

class Login extends Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.logout();

    this.state = {
      email: '',
      password: ''
    }

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeField(key, e) {
    this.setState({
      [key]: e.target.value
    });
  }

  handleSubmit(e) {
    const { email, password } = this.state;
    if (email && password) {
      this.props.login(email, password);
    }
  }

  render() {
    const { loggingIn, classes } = this.props;
    const { email, password, submitted } = this.state;

    return (
      <div className={ classes.root }>
        <Paper className={ classes.paper }>
          <Typography component='h2' variant='h5' align='center' paragraph>
            Login
          </Typography>
          <Grid container spacing={ 2 } alignItems='flex-end'>
            <Grid item md sm xs>
              <TextField
                id='email'
                label='Email'
                variant='filled'
                fullWidth
                autoFocus
                required
                onChange={ (e) => this.handleChangeField('email', e) }
                value={ email }
              />
            </Grid>
          </Grid>
          <Grid container spacing={ 2 } alignItems='flex-end'>
            <Grid item md sm xs>
              <TextField
                id='password'
                label='Password'
                type='password'
                variant='filled'
                fullWidth
                required
                onChange={ (e) => this.handleChangeField('password', e) }
                value={ password }
              />
            </Grid>
          </Grid>
          <Grid container justify='center' style={{ marginTop: '10px' }}>
            <Button
              variant='contained'
              color='primary'
              onClick={ this.handleSubmit }
            >
              Submit
            </Button>
          </Grid>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.login;
  return { loggingIn };
}

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout
}

const connectedLogin = connect(mapStateToProps, actionCreators)(withStyles(styles, { withTheme: true })(Login));

export { connectedLogin as Login };
