import React from 'react';
import styled from 'styled-components/macro';

//create a map of weathe->widgets
const Card = styled.div `
    height:100%;
    text-align:center;
`
const Heading =styled.h4 `
    font-weight :500;
    margin-bottom:4px;
`
const Temp =styled.h5 `
    margin-top:0px;
    font-weight:400;
`
    
const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
export default class WeatherCard extends React.Component{    
    constructor(props)
    {
        super(props);
    }
    render(){
        return(
            <Card>
                <Heading>{days[this.props.weather.time.getDay()]} {this.props.weather.time.toJSON().slice(8,10).replace(/-/g,'/')}</Heading>
                <Temp>{Number((this.props.weather.temp-273.15).toFixed(2))}</Temp>
            </Card>
        );
    }
} 