import React from 'react';
import styled from 'styled-components';
import Dash from './Dash';
const Cointainer= styled.div `
    height :40vh;
`



export default class Forecast extends React.Component{
    constructor(props){
        super(props);
        this.state={
            
        }
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
              const canvas = this.refs.canvas;
              draw(days,canvas);      
            })
        });
      }
    
    render(){
        return(  
         <div>
          <Dash/>
          {this.state.days &&
            <canvas ref="canvas" width={getWidth()} height={800} />                
         } 
         </div>
        );

    }
}


function draw(days,canvas){
  let data=[];
  days.map((item)=>{data.push(item.temp-273.15)});
  data=data.slice(0,5);              
  console.log(days,data);
  const ctx = canvas.getContext("2d")
  ctx.translate(0+5+((canvas.clientWidth/12)),canvas.clientHeight/2);
  ctx.scale(1,-1)
  ctx.strokeStyle='white';
  
  function drawLine(x1, y1, x2, y2){
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.closePath();
      ctx.stroke();
    }
  function drawCircle(x,y,r){
      ctx.beginPath();
      ctx.arc(x,y,r,0,Math.PI *2,true);
      ctx.fillStyle='white';  
      ctx.fill();
      ctx.closePath();
  }
      
  let scalex=(canvas.clientWidth-20)/5;
  let scaley=15;    
  let x1=0*scalex;
  let y1=data[0]*scaley;
  drawCircle(x1,y1,5);
  for(let i=1;i<data.length;i++)
  {
      let x2=i*scalex;
      let y2=data[i]*scaley;
      drawLine(x1,y1,x2,y2);
      drawCircle(x2,y2,5);
      x1=x2;
      y1=y2;
  }

}

function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}