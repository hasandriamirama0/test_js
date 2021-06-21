import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from './navigation';

class Header extends Component {
  render() {
    const { user } = this.props;

    return (
      <div className='Header'>
        <Navigation user={ user } />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { user } = state.login;
  return { user };
}

const connectedHeader = connect(mapStateToProps)(Header);

export { connectedHeader as Header };
