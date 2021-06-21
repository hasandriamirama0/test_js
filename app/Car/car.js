import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { carService, commentService } from '../_services';
import AddComment from './add-comment';
import {
  withStyles,
  Paper,
  Grid,
  CardActionArea,
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider
} from '@material-ui/core';
import {
  MoreVert,
  Favorite,
  Edit,
  Delete,
  Comment
} from '@material-ui/icons';
import {
  red
} from '@material-ui/core/colors';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: '16px 48px',
    margin: 'auto',
    color: theme.palette.text.primary,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    '& > *': {
      flexShrink: 0,
    }
  },
  avatar: {
    backgroundColor: red[400],
  },
  cardContent: {
    flexGrow: 1,
  },
  edit: {
    color: theme.palette.warning.light,
  },
  delete: {
    color: theme.palette.error.light,
  },
  comment: {
    marginLeft: 'auto',
    color: theme.palette.primary.light,
  },
});

class Car extends Component {
  constructor(props) {
    super(props);

    this.state = {
      car: {}
    }
  }

  componentDidMount() {
    const { match: { params }, onLoad } = this.props;
    carService.getById(params._id)
      .then((res) => {
        console.log(res);
        this.setState({ car: res.car });
      });

    commentService.getAll(params._id)
      .then((res) => onLoad(res));
  }

  handleEdit(comment) {
    const { setEdit } = this.props;
    setEdit(comment);
  }

  handleDelete(_id) {
    const { onDelete } = this.props;
    return commentService.delete(_id)
      .then(() => onDelete(_id));
  }

  render() {
    const { car } = this.state;
    const { loggedIn, user, comments, classes } = this.props;
    const bull = <span className={ classes.bullet }>•</span>

    return (
      <div className={ classes.root }>
        {(car.pictures || []).map((url, key) => {
          return (
            <div key={ key } className=''>
              <span className=''>
                <img src={ url } alt='' width='100' height='100' />
              </span>
            </div>
          );
        })}
        <p>{ car.make }</p>
        <p>{ car.year }</p>
        <p className='text-muted'><b>{ car.make }</b> {bull} { moment(new Date(car.updatedAt)).fromNow() }</p>
        <div className='comments'>
          { loggedIn &&
            <>
              <AddComment car_id={ car._id } />
              <List className={ classes.comments }>
                { comments.map((comment) => {
                  return (<div key={ comment._id }>
                    <Fragment>
                      <ListItem alignItems='flex-start'>
                        <ListItemAvatar>
                          <Avatar
                            alt='avatar'
                            aria-label='recipe'
                            className={ classes.avatar }
                          >
                            { comment.author.charAt(0).toUpperCase() }
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography>
                              { comment.author } {bull} { moment(new Date(comment.updatedAt)).fromNow() }
                            </Typography>
                          }
                          secondary={
                            <Typography
                              component='span'
                              variant='body2'
                              className={ classes.inline }
                            >
                              { comment.body }
                            </Typography>
                          }
                        />
                        { (loggedIn && comment.author === user.name) &&
                          <>
                            <IconButton onClick={ () => this.handleEdit(comment) }>
                              <Edit />
                            </IconButton>
                            <IconButton onClick={ () => this.handleDelete(comment._id) }>
                              <Delete />
                            </IconButton>
                          </>
                        }
                      </ListItem>
                      <Divider />
                    </Fragment>
                  </div>);
                })}
              </List>
            </>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggedIn, user } = state.login;
  const comments = state.comments.items;
  return { loggedIn, user, comments };
}

const mapDispatchToProps = dispatch => ({
  onLoad: data => dispatch({ type: 'COMMENT_PAGE_LOADED', data }),
  setEdit: comment => dispatch({ type: 'COMMENT_SET_EDIT', comment }),
  onDelete: _id => dispatch({ type: 'COMMENT_DELETE', _id })
});

Car = withStyles(styles, { withTheme: true })(Car);

export default connect(mapStateToProps, mapDispatchToProps)(Car);
