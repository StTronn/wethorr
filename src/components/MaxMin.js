import React from 'react';
import styled from 'styled-components';

const Cointainer =styled.div `
    text-align:center;
`

const Line= styled.hr `
    display: block;
    
    width:50%;
    height: 1px;
    border: 0;
    border-top: 1px 
    solid #ccc;
    margin: 0 auto;
    padding: 0;
`
let round=(temp)=> Number((temp).toFixed(1));


export default (props)=>{
    return(
        <Cointainer>
            <h4>{round(props.max-273.15)}</h4>
            <Line/>
            <h4>{round(props.min-273.15)}</h4>
        </Cointainer>
    );
}
    