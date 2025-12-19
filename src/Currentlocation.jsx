import React from "react";
import apikeys from "./apikeys";
import ReactAnimatedWeather from "react-animated-weather";
import Clock from "./Clock";
import loader from './Images/weathericon.gif'
import Forecast from './forecast';


 function DateBuilder (d) {

    let months =[ 
"January",
"February",
"March",
"April",
"May",
"June",
"July" ,
"August",
"September",
"October",
"November",
"December",   
];

let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];


let day = days[d.getDay()];
let date = d.getDate();
let month = months[d.getMonth()];
let year = d.getFullYear();

return `${day}, ${date} ${month} ${year}`;
}

const defaults = {
  color: "white",
  size: 112,
  animate: true
};

class Weather extends React.Component{
    state={
        lat:undefined,
        lon:undefined,
        errorMessage:undefined,
        temperatureC:undefined,
        temperatureF: undefined,
        city:undefined,
        country:undefined,
        humidity:undefined,
        description:undefined,
        icon:"CLEAR_DAY",
        sunrise:undefined,
        sunset:undefined,
        errorMsg:undefined,
    };

    componentDidMount()
    {
        if(navigator.geolocation)
        {
            this.getPosition()
            .then((position)=> {
                this.getWeather(position.coords.latitude, position.coords.longitude);
                //console.log(position.coords.latitude, position.coords.longitude);
            })
            .catch((error)=>{
                this.getWeather(28.67, 67.22);
                alert("You have disabled the location service. Allow 'This App' to access your location.");

            });
        }else{
            alert("Geolocation not available");
        }

       this.timerID = setInterval(
        () => this.getWeather(this.state.lat, this.state.lon), 600000
       )
    };


        componentWillUnmount(){
            clearInterval(this.timerID);
        }

        getPosition = (options)=>{
            return new Promise(function (resolve,reject){
                navigator.geolocation.getCurrentPosition(resolve, reject, options);
            });
        };

        getWeather = async(lat, lon)=>{
const api_call = await fetch(
`${apikeys.base}weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikeys.key}`
);

const data = await api_call.json();
this.setState({
    lat:lat,
    lon:lon,
    city:data.name,
    temperatureC: Math.round(data.main.temp),
    temperatureF: Math.round(data.main.temp * 1.8 + 32),
    humidity: data.main.humidity,
    main: data.weather[0].main,
    country: data.sys.country,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
});

switch(data.weather[0].main){
    case "Haze":
    this.setState({icon: "CLEAR_DAY"});
    break;

    case "Clouds":
    this.setState({icon: "CLOUDY"});
    break;

     case "Rain":
    this.setState({icon: "RAIN"});
    break;

    case "Snow":
    this.setState({icon: "SNOW"});
    break;

     case "Dust":
    this.setState({icon: "WIND"});
    break;

    case "Drizzle":
    this.setState({icon: "SLEET"});
    break;

     case "Fog":
    this.setState({icon: "FOG"});
    break;

    case "Smoke":
    this.setState({icon: "SMOKE"});
    break;

    default:
        this.setState({icon: "CLEAR_DAY"});
}
        };

    render(){
        if(this.state.temperatureC){
                return (<>
                
                <div className="left-panel">
      <div className="city-title">
        <h2>{this.state.city}</h2>
        <p>{this.state.country}</p>
      </div>

      
                    <div className="mb-icon">
                        {" "}
                        <ReactAnimatedWeather
                         icon = {this.state.icon}
                         color = {defaults.color}
                         size = {defaults.size}
                         animate = {defaults.animate} />

                         <p>{this.state.main}</p>
                    </div>

                    <div className="date-time">

                        <div className="dmy">
                            <div id = "txt">

                            </div>
                        <div className="current-time">
                          <Clock format={'HH:mm:ss'} ticking={true} interval={1000} />

                        </div>
                        <div className="current-date">
                              {DateBuilder(new Date())}
                        </div>
                        <div className="temperature">
                         <p>
                            {this.state.temperatureC}° <span>C</span>
                         </p>
                        </div>
                        </div>
                    </div>

                </div>
               
               <Forecast icon={this.state.icon} weather ={this.state.main}/>
                </>);
            }else{
                return(<>
                <img src={loader} style={{width: "50%",
                    WebkitUserDrag: "none"
                }} />

                <h3 style={{color:"white", fontSize: "22px" , fontWeight:"600"}}>Detecting your location</h3>
                <h3 style={{color:"white", marginTop: "10px"}}>Your current location will be displayed on the app & used for calculating Real time weather.</h3>
                
                </>)
            }
        }
    }
 export default Weather;