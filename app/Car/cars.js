import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
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
  Menu,
  MenuItem
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
import AddCar from './add-car';
import { carService } from '../_services';

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
  media: {
    height: 0,
    paddingTop: '56.25%',
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
  wrapped: {
    whiteSpace: 'pre',
  },
});

class Cars extends Component {
  constructor(props) {
    super(props);

    this.state = {}

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { onLoad } = this.props;
    carService.getAll()
      .then((res) => onLoad(res));
  }

  handleEdit(car) {
    const { setEdit } = this.props;
    setEdit(car);
  }

  handleDelete(_id) {
    const { onDelete } = this.props;
    return carService.delete(_id)
      .then(() => onDelete(_id));
  }

  render() {
    const { loggedIn, user, cars, classes } = this.props;
    const bull = <span className={ classes.bullet }>•</span>

    return (
      <div className={ classes.root }>
        { loggedIn && <AddCar /> }
        <Paper className={ classes.paper }>
          <Grid container spacing={ 2 }>
            { cars.map((car) => {
              return (
                <Grid item xs={ 12 } sm={ 4 } key={ car._id }>
                  <Card variant='outlined' className={ classes.card }>
                    <CardHeader
                      avatar={
                        <Avatar
                          aria-label='recipe'
                          className={ classes.avatar }
                        >
                          { car.make.charAt(0).toUpperCase() }
                        </Avatar>
                      }
                      title={ car.make }
                      subheader={ moment(new Date(car.updatedAt)).fromNow() }
                    />
                    <CardActionArea>
                      <CardMedia
                        className={ classes.media }
                        image={ car.pictures.length ? car.pictures[0] : defaultImage }
                      />
                    </CardActionArea>
                    <CardContent className={ classes.cardContent }>
                      <Typography gutterBottom variant='h5' component='h2'>
                        { car.make } {bull} {car.year}
                      </Typography>
                      <Typography variant='body2' color='textSecondary' component='p' className={ classes.wrapped }>
                        { car.model }
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      { loggedIn && <>
                        <IconButton
                          aria-label='edit'
                          className={ classes.edit }
                          onClick={ () => this.handleEdit(car) }
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          aria-label='delete'
                          className={ classes.delete }
                          onClick={ () => this.handleDelete(car._id) }
                        >
                          <Delete />
                        </IconButton>
                      </> }
                      <IconButton
                        aria-label='comment'
                        className={ classes.comment }
                        href={ `/#/cars/${ car._id }` }>
                        <Comment />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              );
            }) }
          </Grid>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggedIn, user } = state.login;
  const cars = state.cars.items;
  return { loggedIn, user, cars };
}

const mapDispatchToProps = dispatch => ({
  onLoad: data => dispatch({ type: 'CAR_PAGE_LOADED', data }),
  setEdit: car => dispatch({ type: 'CAR_SET_EDIT', car }),
  onDelete: _id => dispatch({ type: 'CAR_DELETE', _id })
});

Cars = withStyles(styles, { withTheme: true })(Cars);

export default connect(mapStateToProps, mapDispatchToProps)(Cars);
