import React from 'react';
import styled from 'styled-components';
import {WiThunderstorm,WiShowers,WiRain,WiSnow,WiFog,WiDust,WiDayHaze,WiTornado,WiDaySunny,WiNightClear,WiCloud} from 'weather-icons-react';

const weatherMap={
    'Thunderstorm':WiThunderstorm,
    'Drizzle':WiShowers,
    'Rain':WiRain,
    'Snow':WiSnow,
    'Fog':WiFog,
    'Dust':WiDust,
    'Haze':WiDayHaze,
    'Tornado':WiTornado,
    'sunny':WiDaySunny,
    'nightclear':WiNightClear,
    'Clouds':WiCloud
};
const Cointainer =styled.div `
    margin-top:40px;
    display:grid;
    height:8vh;
    justify-content:center;
    grid-template-columns:1fr 1fr;
`
const Main=styled.h1 `
    justify-self:end;
    margin:0 0;
`


export default (props)=>{
    let Icon=weatherMap[props.weather];
    return(
        <Cointainer>
            <Main>{props.weather}</Main>        
            <Icon size={54}></Icon>
        </Cointainer>
    );
}