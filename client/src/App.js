import React, {Component} from 'react';
import MainPage from './MainPage';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {

      flights: [],
      depAirports: [],
      isLoaded: false,
      UpdateDone: false,
      businessClassProportion: 0,
      flightClassApp: [],
      flightsIntoSwedenPercentage: 0,
      allMANFlights: [],
      objectManFlightsWithDatesAndTally: {},
      dateWithMostFlightsFromMan: ""

}
      // this.getUniqueAirports = this.getUniqueAirports.bind(this);
      this.getFlightPercentageInAppJs = this.getFlightPercentageInAppJs.bind(this);
      this.setFlightClassToContainAllClasses = this.setFlightClassToContainAllClasses.bind(this);
      this.setDepAirportsToUniqueCodes = this.setDepAirportsToUniqueCodes.bind(this);
      this.getClassAmount = this.getClassAmount.bind(this);
      this.getAllDeparturesFromManchester = this.getAllDeparturesFromManchester.bind(this);
      this.getMapWithNumManFlightsPerDate = this.getMapWithNumManFlightsPerDate.bind(this);
      this.getKeyWithMostManFlights = this.getKeyWithMostManFlights.bind(this);


}

  componentDidMount() {
    fetch('http://localhost:3000/api/flights/')
    .then(response => response.json()
    .then((response) => {
      this.setState({
        flights: response
        })
      })
    )
  }



  componentDidUpdate(prevProps, prevState){
    if (this.state.flights !== prevState.flights && this.state.UpdateDone === false){

      //populate depAirports with unique aiport codes
      this.setDepAirportsToUniqueCodes()


      //flightClass to now contain all classes from in and outgoing
      this.setFlightClassToContainAllClasses()

      //get total flights going into Sweden
      this.getFlightPercentageInAppJs()

      //set business class percentage
      // this.getClassAmount()

      //find most dep from MAN
      this.getAllDeparturesFromManchester()

      this.setState({
        UpdateDone: true,
                    isLoaded: true})
    }
  }



  setDepAirportsToUniqueCodes(){
    const flights = this.state.flights;
    const allDeps = flights.map(flight => flight.depair);
    let uniqueArray = [...new Set(allDeps)];
    this.setState({depAirports: uniqueArray})
  }




  setFlightClassToContainAllClasses(){
    const flights = this.state.flights;
    const outClass = flights.map(flight => flight.outflightclass)
    const inClass = flights.map(flight =>
    flight.inflightclass)
    const allClass = outClass.concat(inClass);
    this.setState(
      {flightClassApp: allClass}, this.getClassAmount)
      //callback needed to wait until state is set
  }




  getFlightPercentageInAppJs(){
    const flights = this.state.flights;
    const outGoing = flights.map(flight => flight.destair)
    const inComing = flights.map(flight => flight.inarrivecode)
    const allIntoFlights = outGoing.concat(inComing);
    let count = 0;
    let swedishIataCodes = ["ARN", "GOT", "BMA", "AJR", "MMX", "NYO", "VST"]
    //seven most popular airports in Sweden IATA codes
    allIntoFlights.forEach(function(flight) {
      if( swedishIataCodes.includes(flight)){
        count++;
      }
    })
    let percentage = (count / allIntoFlights.length) * 100;
    this.setState({flightsIntoSwedenPercentage: percentage.toFixed(2)})
  }












  getClassAmount(){
    const allClass = this.state.flightClassApp

      // let classMap = {};
    //     let finalArray = [];
    //     allClass.map(function(value, index) {
    // //create new array using flightClass, call each element value
    //       if (classMap.hasOwnProperty(value)) {
    //         classMap[value] = classMap[value] + 1;
    //       } else {
    //         classMap[value] = 1
    //       }
    //     })
    //     for (var keys in classMap){
    //       let obj = {};
    //       obj[keys] = classMap[keys];
    //       finalArray.push(obj)
    //     }
    //     console.log(finalArray);
    let counts = {};

    for (var i = 0; i < allClass.length; i++){
      let num = allClass[i];

      counts[num] = counts[num] ? counts[num] +1 : 1;
    }
    let economy = counts["Economy"]
    let business = counts["Business"]
    let premiumEconomy = counts["Premium Economy"]
    let empty = counts[""]

    let total = economy + business +  premiumEconomy + empty
    let result = (business / total) * 100;
    this.setState({businessClassProportion: result.toFixed(2)
                    })
  }







///////////get date with most flights from MAN/////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
  getAllDeparturesFromManchester(){
        const flights = this.state.flights;
        const manFlights = [];
        flights.forEach(function(flight) {
          if (flight.depair === "MAN"){
            manFlights.push(flight)
          }

        })
        this.setState({allMANFlights: manFlights}, this.getMapWithNumManFlightsPerDate)
  }

  getMapWithNumManFlightsPerDate(){
      const flights = this.state.allMANFlights;
      const dates = flights.map(flight => flight.outdepartdate);

      let result = {};

      for (var i=0; i < dates.length; i++){
        if (!result[dates[i]]){
          result[dates[i]] = 1;
        } else {
          result[dates[i]] += 1;
        }
      }
      this.setState({objectManFlightsWithDatesAndTally:
                      result}, this.getKeyWithMostManFlights)
  }

  getKeyWithMostManFlights(){
    const dateObj = this.state.objectManFlightsWithDatesAndTally;
    const valueArray = Object.values(dateObj)
    var max = Math.max(...valueArray);

    function val2key(val, array){
      for (var key in array) {
        if(array[key] === val){
            return key;
        }
      }
      return false;
    }
    const key = val2key(max, dateObj);
    this.setState({dateWithMostFlightsFromMan: key})
  }
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////











  render(){
    let {isLoaded} = this.state;
    if (!isLoaded) {
      return <div>Loading......</div>;
    }
    else {
    return(
      <div>
        <button onClick={this.getClasses}>classes</button>
        <button onClick={this.getUniqueAirports}>what</button>
        <h2>Total Number of Flights: {this.state.flights.length}</h2>
        <MainPage
          getAirport = {this.state.depAirports}
          getData = {this.state.flights}
          getClass = {this.state.businessClassProportion}
          getFlightInPercentage = {this.state.flightsIntoSwedenPercentage}
          getDate = {this.state.dateWithMostFlightsFromMan}
          />

      </div>
      );
    }
  }
  }

  export default App;
