import React from 'react';
import Titles from './Components/Titles';
import Form from './Components/Form';
import Weather from './Components/Weather';

const API_KEY = "2b05ff8d216d27017aa27fd9c583d77f";

class App extends React.Component{
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) =>{
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}
    &appid=${API_KEY}&units=metric`);
    const data = await api_call.json();

   if (city && country){ 
    this.setState({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      //description: data.Weather[0].description,
      error: ""
    });
    
   }else {
    this.setState({
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      //description: undefined,
      error: "Please enter the values."
    });
   }
}

  render() {
    return(
    <div>
      <div className="Wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-xs-5 title-container">
                <Titles/>
                 </div>
                 <div className="col-xs-7 form-container">
                 <Form getWeather = {this.getWeather}/>
                 <Weather 
                        temperature = {this.state.temperature}
                        city = {this.state.city}
                        country = {this.state.country}
                        humidity = {this.state.humidity}
                        description = {this.state.description}
                        error = {this.state.error}/>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    );
  }
};

     
export default App;