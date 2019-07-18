import React, {Component} from 'react';

class MainPage extends Component {
  constructor(props){
    super(props);
      this.state = {
        flights: [],
        departureAirports: [],
        isLoaded: false,
        flightClass: [],
        businessClassProportion: 0,
        flightPercentageSweden: 0
      }

        this.getFlightPercentage = this.getFlightPercentage.bind(this);
  }


  componentDidMount(){
      this.setState({flights: this.props.getData,
                      departureAirports: this.props.getAirport,
                      isLoaded: true,
                      flightClass: this.props.getClass
                    })
  }


  getFlightPercentage(){
    this.setState({flightPercentageSweden: this.props.getFlightInPercentage})
  }



  render(){

      let {isLoaded, departureAirports} = this.state;
        if (!isLoaded) {
          return <div>Loading......</div>;
        }
        else {
          return(

                  <div>
                        <p>Business Class Proportion: <b>{this.props.getClass}%</b></p>

                  <hr></hr>

                        <p>Flights Into Sweden Percentage: <b>{this.props.getFlightInPercentage}%</b></p>

                  <hr></hr>

                        <label htmlFor="average-flight">Choose Aiports for  Average Flight Time:</label>

                        <form onSubmit={this.calulateAverageFlightTime}>
                            <select name="average-flight" id="">
                              {departureAirports.map((airport, index) => (
                               <option key={index}>{airport}</option>
                              ))}
                            </select>
                            <select name="average-flight" id="">
                              {departureAirports.map((airport, index) => (
                               <option key={index}>{airport}</option>
                              ))}
                            </select>
                          <button>submit</button>
                        </form>
                        <p><b>****Didn't have time to complete****</b></p>

                  <hr></hr>

                        <p>Date With Most Flights To MAN: <b>{this.props.getDate}</b></p>

                  </div>
                )
            }
      }
}


export default MainPage;
