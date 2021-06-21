import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useTheme,
  useMediaQuery,
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Typography
} from '@material-ui/core';
import {
  MoreVert
} from '@material-ui/icons';
import { history } from '../_helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'flex',
  },
  appbar: {
    background: 'rgba(0, 0, 0, 0.5)',
  },
  toolbar: {
    paddingLeft: 0,
  },
  logo: {
    flexGrow: 1,
    lineHeight: 0,
  },
  logoImage: {
    width: theme.spacing(16),
  }
}));

function Navigation(props) {
  const classes = useStyles();
  const [ mobileMenuAnchorEl, setMobileMenuAnchorEl ] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMenuAnchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const openMobileMenu = (e) => {
    setMobileMenuAnchorEl(e.currentTarget);
  }

  const closeMobileMenu = (e) => {
    setMobileMenuAnchorEl(null);
  }

  const mobileMenu = (
    <Menu
      anchorEl={ mobileMenuAnchorEl }
      id='mobile-menu'
      keepMounted
      open={ isMobileMenuOpen }
    >
      <MenuItem component={ Link } to='/cars' onClick={ closeMobileMenu }>Cars</MenuItem>
      <MenuItem component={ Link } to='/register' onClick={ closeMobileMenu } disabled={ props.user ? true : false }>S'inscrire</MenuItem>
      <MenuItem component={ Link } to='/login' onClick={ closeMobileMenu }>{ props.user ? 'Se déconneter' : 'Se connecter' }</MenuItem>
    </Menu>
  );

  return (
    <div className={ classes.root }>
      <Fragment>
        <AppBar position='relative' className={ classes.appbar }>
          <Toolbar className={ classes.toolbar }>
            <Typography className={ classes.logo }></Typography>
            { !isMobile ?
              (
                <div className={ classes.sectionDesktop }>
                  <Button color='inherit' component={ Link } to='/cars'>Cars</Button>
                  <Button color='inherit' component={ Link } to='/register' disabled={ props.user ? true : false }>S'inscrire</Button>
                  <Button color='inherit' component={ Link } to='/login'>{ props.user ? 'Se déconneter' : 'Se connecter' }</Button>
                </div>
              ) : (
                <IconButton color='inherit' onClick={ openMobileMenu }>
                  <MoreVert />
                </IconButton>
              )
            }
          </Toolbar>
        </AppBar>
        { mobileMenu }
      </Fragment>
    </div>
  );
}

export default Navigation;
