import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  withStyles,
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton
} from '@material-ui/core';
import { carService, commentService } from '../_services';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: '16px 48px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  form: {
    marginTop: theme.spacing(3),
  },
});

class AddComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: {
        body: ''
      }
    }

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.commentToEdit) {
      this.setState({
        comment: {
          body: nextProps.commentToEdit.body
        }
      });
    }
  }

  handleChangeField = (key, e) => {
    const { comment } = this.state;
    this.setState({
      comment: {
        ...comment,
        [key]: e.target.value
      }
    });
  }

  handleSubmit = (e) => {
    const { onSubmit, commentToEdit, onEdit, car_id } = this.props;
    const { comment } = this.state;

    if (comment.body) {
      if(!commentToEdit) {
        return commentService.add(car_id, comment)
          .then((res) => onSubmit(res))
          .then(() => this.setState({ comment: { body: '' } }));
      } else {
        return commentService.update(commentToEdit._id, comment)
          .then((res) => onEdit(res))
          .then(() => this.setState({ comment: { body: ''} }));
      }
    }
  }

  render() {
    const { comment } = this.state;
    const { commentToEdit, classes } = this.props;

    return (
      <div className={ classes.root }>
        <Paper className={ classes.paper }>
          <Grid container spacing={ 2 } className={ classes.form }>
            <Grid item xs={ 12 }>
              <TextField
                required
                fullWidth
                multiline
                id='standard-multiline-flexible'
                variant='filled'
                label='Commentaire'
                rows={ 4 }
                onChange={ (e) => this.handleChangeField('body', e) }
                value={ comment.body }
              />
            </Grid>
            <Button
              variant='contained'
              color='primary'
              onClick={ () => this.handleSubmit() }
            >
              { commentToEdit ? 'Update' : 'Submit' }
            </Button>
          </Grid>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggedIn, user } = state.login;
  const commentToEdit = state.comments.commentToEdit;
  return { loggedIn, user, commentToEdit };
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch({ type: 'COMMENT_SUBMIT', data }),
  onEdit: data => dispatch({ type: 'COMMENT_EDIT', data })
});

AddComment = withStyles(styles, { withTheme: true })(AddComment);

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);
