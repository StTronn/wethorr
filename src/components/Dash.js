import React from 'react';
import WeatherCard from './WeatherCard';
import BarChart from './BarChart';
import styled from 'styled-components';

const Grid=styled.div `
	display:grid;
	grid-template-columns:1fr 1fr 1fr 1fr 1fr;
	column-gap:80px;
	margin-left:10px;
	margin-right:10px;
`

export default class Dash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  prettyDate(date) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    return months[date.getUTCMonth()] + ' ' + date.getUTCDate() + ', ' + date.getUTCFullYear();
  }
  
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(pos => {
      fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
        .then(response => response.json())
        .then(json => {
          let all = [];
          let check_days=[];
          let days=[];
          let temp_days={};
          for (let item of json.list) {
            let ob = {
              weather: item.weather[0].main,
              icon: item.weather[0].icon,
              temp: item.main.temp,
              time: new Date(item.dt*1000)
            }
            all.push(ob);
            if (!check_days.includes(ob.time.getDay())){
              check_days.push(ob.time.getDay());
              days.push(ob);
              temp_days[ob.time.getDay()]=[]
            }
            temp_days[ob.time.getDay()].push(ob.temp);
          }
          //refactor
          for(let it of days)
            it.temp=temp_days[it.time.getDay()].reduce((a,b)=>a+b )/temp_days[it.time.getDay()].length;
          this.setState({all,days});
        })
    });
  }

  render() {
    let days=[]
    if(this.state.days)
      days=this.state.days.slice(0,5);
    return (
      <div>
        {this.state.days &&
          <Grid>
          {days.map( item => <WeatherCard key={item.time} weather={item}/>)}
          </Grid>
        }
      </div>
    );
  }

}