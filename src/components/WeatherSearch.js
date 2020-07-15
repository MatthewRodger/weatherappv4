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
            background:'linear-gradient(180deg, lightyellow 1%, lightblue 90%)',
            margin: "100px",
            flexGrow: 1
        },
        textfield: {
            margin: "10px",
            
        },
        searchButton: {
            
        },
        Icon:{
            margin: "10px",
        }
        
      });
      const classes = useStyles()

    


    var displayedList = "";
    var displayedIcon = "";
    if( (weatherdata.name !== undefined) && (searchedcity !== undefined) ) {
        displayedList = <List  >
                            <ListItemText primary = {" Weather in "+ weatherdata.name +", "+ weatherdata.sys.country + ":"} />
                            <ListItemText primary = {weatherdata.weather[0].description} />
                            <ListItemText primary = {"temp: " + Math.round(weatherdata.main.temp -273.15) + "°C"}  />
                            <ListItemText primary = {"humidity: "+ weatherdata.main.humidity +"%" }/>
                            <ListItemText primary = {"Wind speed: " + weatherdata.wind.speed + "  Bearing: " + weatherdata.wind.deg + "°" }/>
                        </List> 
        
       
       
        switch(weatherdata.weather[0].icon) {
            case("01d"):{
                displayedIcon = "http://openweathermap.org/img/wn/01d@2x.png"
                break;
            }

            case("02d"):{
               displayedIcon = "http://openweathermap.org/img/wn/02d@2x.png"
               break;
            }

            case("03d"):{
                displayedIcon = "http://openweathermap.org/img/wn/03d@2x.png"
                break;
             }

            case("04d"):{
                displayedIcon = "http://openweathermap.org/img/wn/04d@2x.png"
                break;
            }
            case("09d"):{
                displayedIcon = "http://openweathermap.org/img/wn/04d@2x.png"
                break;
            }
            case("10d"):{
                displayedIcon = "http://openweathermap.org/img/wn/04d@2x.png"
                break;
            }
            case("11d"):{
                displayedIcon = "http://openweathermap.org/img/wn/04d@2x.png"
                break;
            }
            case("12d"):{
                displayedIcon = "http://openweathermap.org/img/wn/04d@2x.png"
                break;
            }
            case("50d"):{
                displayedIcon = "http://openweathermap.org/img/wn/04d@2x.png"
                break;
            }

            default:{
                displayedIcon = "http://openweathermap.org/img/wn/10d@2x.png"
            }

           
        }
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
                    </CardContent> 
                    
                    <CardContent className={classes.Icon} >
                        
                        <img src={displayedIcon} alt = ""/>

                    </CardContent>
                       
                    <CardContent className={classes.Info} >
                        {displayedList} 
                    </CardContent>
                        
                     
                </Card>       
                
            </div>
        </div>
    )

}

export default WeatherSearch;