import React from 'react';
import styled from 'styled-components';
import MaxMin from './MaxMin';
import Weather from './Weather';
import Forecast from './Forecast';
const Cointainer =styled.div `
    height:80vh;
`
const City =styled.h2`
    font-weight:400;
    margin-bottom:2px;
    text-align:center;
`

const Time =styled.h4 `
    margin-top:0;
    font-weight:300;
    text-align:center;
    margin-bottom:125px;
`
const CointainerTemp=styled.div `
    display:grid;
    grid-template-columns: 70vw 30vw;
`
const Temp =styled.h1 `
    display:inline-block;
    margin-top:0px;
    margin-left:18vw;
    font-weight:500;
    font-size:80px;
` 
export default class Front extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentDidMount(){
        navigator.geolocation.getCurrentPosition((pos)=>{
			fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
			.then(response=> response.json())
			.then(json=>{console.log(json);this.setState({
				curr:{
					temp:json.main.temp,
					temp_max:json.main.temp_max,
					temp_min:json.main.temp_min,
					weather:json.weather[0].main,
					icon:json.weather[0].icon,
					time:new Date(),
                    city_name:json.name
                }
			})})
			.catch(err=>console.log(err))
        },(err)=>{console.log(err)})
        
    }

    render(){
        let round=(temp)=> Number((temp).toFixed(1));
        const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        let weather=this.state.curr;
        return(
            <div>
                { this.state.curr && 
                <Cointainer>
                    <City>{weather.city_name}</City>
                    <Time>{days[weather.time.getDay()]},{weather.time.toJSON().slice(8,10).replace(/-/g,'/')}</Time>
                    <CointainerTemp>
                        <Temp>{round(weather.temp-273.15)}</Temp>
                        <MaxMin max={weather.temp_max} min={weather.temp_min}/>
                    </CointainerTemp>                    
                    <Weather weather={weather.weather}></Weather>
                </Cointainer>
                }
            <Forecast/>
            </div>
        );
    }

} 