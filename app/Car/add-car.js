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
import { PhotoCamera } from '@material-ui/icons';
import { carService } from '../_services';

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
    width: '50%',
    marginTop: theme.spacing(3),
  },
});

class AddCar extends Component {
  fileObj = [];
  fileArray = [];

  constructor(props) {
    super(props);

    this.state = {
      car: {
        make: '',
        model: '',
        year: '',
      },
      files: null,
      theInputKey: 0
    }

    this.handleChangeField = this.handleChangeField.bind(this);
    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.carToEdit) {
      this.setState({
        car: {
          make: nextProps.carToEdit.make,
          model: nextProps.carToEdit.model,
          year: nextProps.carToEdit.year
        }
      });
    }
  }

  uploadMultipleFiles = (e) => {
    this.fileObj = [];
    this.fileArray = [];

    this.fileObj.push(e.target.files);
    for (let i = 0; i < this.fileObj[0].length; i++) {
      this.fileArray.push(this.fileObj[0][i]);
    }
    this.setState({ files: this.fileArray });
  }

  handleChangeField = (key, e) => {
    const { car } = this.state;
    this.setState({
      car: {
        ...car,
        [key]: e.target.value
      }
    });
  }

  handleSubmit = (e) => {
    const { onSubmit, carToEdit, onEdit } = this.props;
    const { car, files } = this.state;

    if (car.make && car.model && car.year) {
      if(!carToEdit) {
        var formData = new FormData();

        Object.keys(car).forEach(key => {
          formData.append(key, car[key]);
        });

        (files || []).map((file, index) => {
          formData.append('files', file);
        });

        return carService.add(formData)
          .then((res) => onSubmit(res))
          .then(() => this.setState({ car: { make: '', model: '', year: '' }, theInputKey: Math.random().toString(36), files: null }));
      } else {
        return carService.update(carToEdit._id, car)
          .then((res) => onEdit(res))
          .then(() => this.setState({ car: { make: '', model: '', year: '' }, theInputKey: Math.random().toString(36), files: null }));
      }
    }
  }

  render() {
    const { car, theInputKey, files } = this.state;
    const { carToEdit, user, classes } = this.props;

    return (
      <div className={ classes.root }>
        <Paper className={ classes.paper }>
          <Typography component='h2' variant='h5'>
            Add Car
          </Typography>
          <Grid container spacing={ 2 } className={ classes.form }>
            <Grid item xs={ 12 } sm={ 6 }>
              <TextField
                required
                fullWidth
                variant='filled'
                label='Make'
                autoFocus
                onChange={ (e) => this.handleChangeField('make', e) }
                value={ car.make }
              />
            </Grid>
            <Grid item xs={ 12 }>
              <TextField
                required
                fullWidth
                variant='filled'
                label='Model'
                onChange={ (e) => this.handleChangeField('model', e) }
                value={ car.model }
              />
            </Grid>
            <Grid item xs={ 12 }>
              <TextField
                required
                fullWidth
                variant='filled'
                label='Year'
                onChange={ (e) => this.handleChangeField('year', e) }
                value={ car.year }
              />
            </Grid>
            <Grid item xs={ 12 }>
              <input
                ref={ this.uploadInputRef }
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
                onChange={ (e) => this.uploadMultipleFiles(e) }
                key={theInputKey || ''}
              />
              <IconButton
                onClick={ () => this.uploadInputRef.current && this.uploadInputRef.current.click() }
                color='primary'
                component='span'
              >
                <PhotoCamera />
              </IconButton>
              {(files || []).map((file, key) => {
                return (
                  <div key={key} className=''>
                    <span className=''>
                      <img src={URL.createObjectURL(file)} alt='' width='100' height='100' />
                    </span>
                  </div>
                );
              })}
            </Grid>
            <Button
              variant='contained'
              color='primary'
              onClick={ () => this.handleSubmit() }
            >
              { carToEdit ? 'Update' : 'Submit' }
            </Button>
          </Grid>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggedIn, user } = state.login;
  const carToEdit = state.cars.carToEdit;
  return { loggedIn, user, carToEdit };
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch({ type: 'CAR_SUBMIT', data }),
  onEdit: data => dispatch({ type: 'CAR_EDIT', data })
});

AddCar = withStyles(styles, { withTheme: true })(AddCar);

export default connect(mapStateToProps, mapDispatchToProps)(AddCar);
