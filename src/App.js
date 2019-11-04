import React from 'react';
import Front from './components/Front';



class App extends React.Component{
	constructor(props){
		super(props);
		this.state={
		}
	}
	componentDidMount(){
		let city='london'
		let country='uk';
		navigator.geolocation.getCurrentPosition((pos)=>{
			console.log(pos);
			fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
			.then(response=> response.json())
			.then(json=>{this.setState({
				curr:{
					temp:json.main.temp,
					temp_max:json.main.temp_max,
					temp_min:json.main.temp_min,
					weather:json.weather[0].main,
					icon:json.weather[0].icon,
					time:new Date()
				}
			})})
			.catch(err=>console.log(err))
		},(err)=>{console.log(err)})
	}
	render(){
	return (
	<Front/>
	// <Router>
    //     <Switch>
    //       <Route path="/about">
    //          <Dash />
    //       </Route>
	// 	  <Route path="/test">
	// 		<Front/>
	// 	  </Route>
    //       <Route path="/users">
    //         <Users />
    //       </Route>
	// 	  <Route path='/vis'> 
	// 		<Forecast/>
	// 	  </Route>
    //       <Route path="/">
    //        {this.state.curr && <WeatherCard weather={this.state.curr} />}
    //       </Route>
    //     </Switch>
	// </Router>
		);
	}
}

export default App;
