import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Navbar.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Navbar extends Component {
 constructor() {
  super()
  this.state = {
   // this works but might want this state to also effect the amount of space the other component takes up and edit that as well right now it just hides behind nav bar
   showNav: false
  }
 }
 toggleNav = () => {
  this.setState({
   showNav: !this.state.showNav
  })
 }
 render() {
  return (
   <Fragment>
   <div id="mySidenav" className="sidenav" style={{width: this.state.showNav ? '250px' : '0px'}}>
   <Link to="#" className="closebtn" onClick={this.toggleNav}>&times;</Link>
   <Link to="/launches/upcoming">Launches</Link>
   <Link to="/launches/fav">My Launches <i className='amount'>{this.props.appState.favoriteLaunches.length}</i></Link>
   <Link to="/launches/past">Past Launches</Link>
   <Link to="/organizations">Organizations</Link>
   <Link to="/notifications">Into The Void</Link>
   <Link to="/profile">Profile</Link>
   <Link to="/">Logout</Link>
 </div>
 <span className="text-white" onClick={this.toggleNav}>&#9776;</span>
           </Fragment>
           )
 }
}

const mapStateToProps = state => ({
  appState: state
});


export default connect(mapStateToProps)(Navbar)