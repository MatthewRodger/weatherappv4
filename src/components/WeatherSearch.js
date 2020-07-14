import React, {useState} from "react";
import TextField from '@material-ui/core/TextField';
import AppBar from "@material-ui/core/AppBar";
import { Typography, ListItemText, Button, CardContent } from "@material-ui/core";
import List from '@material-ui/core/List';
import axios from "axios";
import Card from "@material-ui/core/Card";
import { makeStyles } from '@material-ui/core/styles';


function WeatherSearch() {
    const [weatherdata, setweatherdata] = useState({});
    const [searchedcity, setsearchedcity] = useState("");

    function search() {
        const apikey = "ba9faead36419b05538747acf541515b";
        const city = searchedcity;
        const url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + ",uk&APPID=" + apikey;
        axios.get(url)
            .then(res => {
                setweatherdata(res.data);
            })
    }



    const useStyles = makeStyles({
        card: {
            minWidth: 150,
            background:'linear-gradient(0deg, lightgreen 1%, lightblue 90%)',
            margin: "10px",
        },
        textfield: {
            margin: "10px",
            
        },
        searchButton: {
            margin : "50px", //this doesnt appear to be working for the button
        }
      });
      const classes = useStyles()

    

    function windDirection(deg) {
        const bearing = deg;
        switch (bearing){
            case (315 <= bearing || bearing <= 45):
                return "North";
                
            case (45 < bearing && bearing < 135):
                return "East";
                
            case (135 <= bearing && bearing <= 225):
                return "South";    

            case (225 < bearing && bearing < 315):
                return "West";

            default:
                return "unknown compass direction";
            
        }
    }

    var displayedList = "";
    if( (weatherdata.name !== undefined) && (searchedcity !== undefined) ) {
        displayedList = <List>
                            Weather in {weatherdata.name}:
                            <ListItemText primary = {"temp: " + Math.round(weatherdata.main.temp -273.15) + "°C"}  />
                            <ListItemText primary = {"humidity: "+ weatherdata.main.humidity +"%" }/>
                            <ListItemText primary = {"Wind speed: " + weatherdata.wind.speed + "  Bearing: " + weatherdata.wind.deg + "° (" + windDirection(weatherdata.wind.deg) + ")"}/>
                        </List> 
    }


    return (
       
        <div className="WeatherSearch">
            <div>
                <AppBar position="static">
                    <Typography variant="h6" className="AppBar">
                        Weather App
                    </Typography>
                </AppBar>
                
                <Card className={classes.card} variant="filled">
                    <CardContent>
                        <TextField 
                            className = {classes.textfield}
                            top = "50%"
                            id="textinput"
                            label="Search A City"
                            variant="outlined"
                            defaultValue = {searchedcity}
                            onChange= {event => {
                                const { value } = event.target;
                                setsearchedcity(value)
                            }}
                        />
                        <Button  
                            classname ={classes.searchButton}
                            onClick={() => search()}
                            variant="contained" 
                            color="primary"
                        
                            
                        > 
                        Seach Weather
                        </Button>  
                        {displayedList} 
                    </CardContent>  
                </Card>       
                
            </div>
        </div>
    )

}

export default WeatherSearch;