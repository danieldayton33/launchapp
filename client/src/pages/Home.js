import React from 'react';
import Template from '../components/template/template.wrapper'
import API from '../utils/API';
import LaunchSlider from '../components/LaunchSlider/LaunchSlider';
import Spinner from 'react-bootstrap/Spinner';
import ListView from '../components/list-view/list.view';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setView } from '../actions/setView';
import { addLaunch } from '../actions/addAction';
import { incrementIndex, decrementIndex, resetIndex } from '../actions/indexActions';



class Home extends React.Component {
  state={
    filterOrg: "All Organizations",
    filter: false
  }
  componentDidMount () {
    console.log("mounted");
    API.getUpcoming()
    .then(result => {
      let launches = [];
      
      result.data.launches.forEach(launch => {
        const id = launch.id ? (launch.id): (1)
        const location = launch.location.name ? (launch.location.name) : ("");
        const longitude = launch.location.pads[0] ? (launch.location.pads[0].longitude) : ("");
        const latitude = launch.location.pads[0] ? (launch.location.pads[0].latitude) : ("");
        const rocket = launch.rocket.name ? (launch.rocket.name) : ("");
        const date = launch.net ? (launch.net) : ("");
        const timestamp = launch.netstamp ? (launch.netstamp) : ("");
        const company = launch.lsp.name ? (launch.lsp.name) : ("");
        const launchName = (launch.missions.length && launch.missions[0].name) ? (launch.missions[0].name) : ("");
        const type =  (launch.missions.length && launch.missions[0].typeName )? (launch.missions[0].typeName) : ("");
        const image = (launch.rocket.imageURL) ? (launch.rocket.imageURL) : ('./images/ea4078548b2778ad6487e1dfd3d4978fb67cdb2c.png');
        const countdownTime = moment(date).format("YYYY-MM-DTHH:mm:ss");
        const launchData = {id, image, location, rocket, date, timestamp, company, launchName, type, countdownTime, longitude, latitude};
        
        
        // console.log("LAUNCHDATA",launchData)
        this.props.addLaunch(launchData);
      })
    })
    .catch(err => console.log(err));
  }

  handleViewChange = (view) => {
    this.props.setView();
  
  }

  returnLaunchSlider = () => {
    let {launches, index} = this.props.appState;
    const filterLaunches = launches.filter(launch => launch.company === this.state.filterOrg );
    if (this.state.filter){
      if(index > 0) {
        this.props.resetIndex();
        let index = this.props.appState.index;
          if(filterLaunches.length) {
            console.log("IN FILTER LAUNCHES")
            return(
              <LaunchSlider
              launchID = {filterLaunches.id}
              prevDate={((index - 1) >= 0) ? (moment(filterLaunches[(index-1)].date).format("\u21E6 " + "MMM D")): ("none") } 
              index={index}
              launch={filterLaunches[index]}
              total={filterLaunches.length}
              handleDetailClick = {this.handleDetailClick}
              handleIndexChange = {this.handleIndexChange}
              nextDate={((index + 1 < filterLaunches.length)? (moment(filterLaunches[(index+1)].date).format("MMM D" + " \u21E8")) : ("none"))} 
              />
            )
          } else {
            return (
              <div>No Results</div>
            )
          }
      } else {
          if(filterLaunches.length) {
            console.log("IN FILTER LAUNCHES")
            return(
              <LaunchSlider
              launchID = {filterLaunches.id}
              prevDate={((index - 1) >= 0) ? (moment(filterLaunches[(index-1)].date).format("\u21E6 " + "MMM D")): ("none") } 
              index={index}
              launch={filterLaunches[index]}
              total={filterLaunches.length}
              handleDetailClick = {this.handleDetailClick}
              handleIndexChange = {this.handleIndexChange}
              nextDate={((index + 1 < filterLaunches.length)? (moment(filterLaunches[(index+1)].date).format("MMM D" + " \u21E8")) : ("none"))} 
              />
            )
          } else {
            return (
              <div>No Results</div>
            )
          }
      }
    } else {
      return (
        <LaunchSlider
        launchID = {launches.id}
        prevDate={((index - 1) >= 0) ? (moment(launches[(index-1)].date).format("\u21E6 " + "MMM D")): ("none") } 
        index={index}
        launch={launches[index]}
        total={launches.length}
        handleDetailClick = {this.handleDetailClick}
        handleIndexChange = {this.handleIndexChange}
        nextDate={((index + 1 < launches.length)? (moment(launches[(index+1)].date).format("MMM D" + " \u21E8")) : ("none"))} 
        />
      )
    }
      
    }

    returnListView = () => {
      const launches = this.props.appState.launches;
      const filterLaunches = launches.filter(launch => launch.company === this.state.filterOrg );
      console.log(filterLaunches);
      if(this.state.filter) {
        if(filterLaunches.length) {
          return (
            filterLaunches.map((launch,index) => (
              <ListView
              launchID = {launches.id}
              launch={launch} 
              key={index} 
              index={index} />)
            )
          )
        } else {
          return (
            <div>No results</div>
          )
        }
        
      } else {
        return (
          launches.map((launch,index) => (
            <ListView
            launchID = {launches.id}
            launch={launch} 
            key={index} 
            index={index} />)
          )
        ) 
      }
    }

    handleIndexChange = (change) => {
      if(change > 0 && (this.props.appState.index + change) < this.props.appState.launches.length) {
        this.props.incrementIndex();
      }
      if(change < 0 && (this.props.appState.index + change) >= 0) {
        this.props.decrementIndex();
      }
      else {
        return false
      }
    }
    handleFilter = (org)=> {
      if(org === "All Organizations") {
        this.setState({
          filter: false,
          filterOrg: org
        })
      } else {
        this.setState({
          filter: true,
          filterOrg: org
          })
      }
      
    }
  render() {
    console.log(this.props.appState)
    const {launches} = this.props.appState;
    return (
      <Template handleViewChange={this.handleViewChange} handleFilter={this.handleFilter} filterOrg={this.state.filterOrg} >
      {launches.length ? 
        ((this.props.appState.launchView === 'slider') ? (this.returnLaunchSlider()) : (this.returnListView())) 
        :
        (<Spinner animation="border" role="status">
          <span className="sr-only"> Loading ... </span>
          </Spinner>)}

      </Template>
    );
  }
}

const mapStateToProps = state => ({
  appState: state
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setView, addLaunch, incrementIndex, decrementIndex, resetIndex }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

