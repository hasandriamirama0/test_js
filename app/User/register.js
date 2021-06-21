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
    alignItems: 'center',
  },
  hidden: {
    display: 'none',
  },
});

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: '',
        email: '',
        password: '',
        roles: []
      },
      submitted: false
    }

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeField(key, e) {
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [key]: e.target.value
      }
    });
  }

  handleSubmit(e) {
    this.setState({ submitted: true });
    const { user } = this.state;
    if (user.name && user.email && user.password) {
      this.props.register(user);
    }
  }

  render() {
    const { registering, classes } = this.props;
    const { user, submitted } = this.state;

    return (
      <div className={ classes.root }>
        <Paper className={ classes.paper }>
          <Typography component='h2' variant='h5' align='center' paragraph>
            Register
          </Typography>
          <Grid container spacing={ 2 } alignItems='flex-end'>
            <Grid item md sm xs>
              <TextField
                id='name'
                label='Nom'
                variant='filled'
                fullWidth
                autoFocus
                required
                onChange={ (e) => this.handleChangeField('name', e) }
                value={ user.name }
              />
            </Grid>
          </Grid>
          <Grid container spacing={ 2 } alignItems='flex-end'>
            <Grid item md sm xs>
              <TextField
                id='email'
                label='Email'
                variant='filled'
                fullWidth
                required
                onChange={ (e) => this.handleChangeField('email', e) }
                value={ user.email }
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
                value={ user.password }
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
    )
  }
}

function mapStateToProps(state) {
  const { registering } = state.register;
  return { registering };
}

const actionCreators = {
  register: userActions.register
}

const connectedRegister = connect(mapStateToProps, actionCreators)(withStyles(styles, { withTheme: true })(Register));

export { connectedRegister as Register };
