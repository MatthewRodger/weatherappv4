import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import AppBar from "@material-ui/core/AppBar";
import { Typography, ListItemText } from "@material-ui/core";
import List from '@material-ui/core/List';
import axios from "axios";


function WeatherSearch() {
    const [weatherdata, setweatherdata] = useState({});
    const [searchedcity, setsearchedcity] = useState("");

    const apikey = "ba9faead36419b05538747acf541515b";
    const city = "London";
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + ",uk&APPID=" + apikey;
    axios.get(url)
        .then(res => {
            setweatherdata(res.data);
        })

    
    var displayedData = "";
    if( weatherdata.name !== undefined) {
        displayedData = <List>
                            weather in {weatherdata.name}:
                            <ListItemText primary = {"temp: " + weatherdata.main.temp} />
                            <ListItemText primary = {"humidity: "+ weatherdata.main.humidity +"%" }/>
                        </List> 
    }

    // handleChange(){

    //}

    return (
        <div classname="WeatherSearch">
            <div>
                <AppBar position="static">
                    <Typography variant="h6" className="AppBar">
                        Weather App
                    </Typography>
                </AppBar>
                <TextField
                    id="textinput"
                    label="Search A City"
                    variant="outlined"
                    //onChange={handleChange("Location")}
                    

                />

                {displayedData}          
                
            </div>
        </div>
    )

}

export default WeatherSearch;