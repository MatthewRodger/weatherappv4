import React, {useState} from "react";
import TextField from '@material-ui/core/TextField';
import AppBar from "@material-ui/core/AppBar";
import { Typography, ListItemText, IconButton, CardContent } from "@material-ui/core";
import List from '@material-ui/core/List';
import axios from "axios";
import Card from "@material-ui/core/Card";
import { makeStyles } from '@material-ui/core/styles';
import searchGlass from "./pngs/icons8-search-64.png";


function WeatherSearch() {
    const [weatherdata, setweatherdata] = useState({});
    const [searchedcity, setsearchedcity] = useState("");

    function search() {
        const apikey = "ba9faead36419b05538747acf541515b";
        const city = searchedcity;
        const url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apikey;
        axios.get(url)
            .then(res => {
                setweatherdata(res.data);
            })
    }

    function capital_letter(str) 
    {
        str = str.split(" ");

        for (var i = 0, x = str.length; i < x; i++) {
            str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
}



    const useStyles = makeStyles({
        card: {

            display: "",
            minWidth: "10px",
            minHeight: "10px",
            maxWidth: "400px",
            margin: "50px",
            
        },
        textfield: {
            margin: "10px",
            display:"block",
           
           
            
        },
        searchButton: {
            display:"block",
            
        },
        Icon:{
        
        },
        tempMain:{

        },
        Info:{
            
        }
        
      });
      const classes = useStyles()

    


    var displayedList = "";
    var displayedIcon = "";
    var displayedTemp = "";
    
    if( (weatherdata.name !== undefined) && (searchedcity !== undefined) ) {
        displayedTemp = <div className = {classes.tempMain}>
                        
                            <Typography variant = "h3">
                                {Math.round(weatherdata.main.temp -273.15) + "°C"}
                                
                            </Typography>
                            
                            <Typography variant = "h6">
                                {capital_letter(weatherdata.weather[0].description)}
                            </Typography>
                        </div>
        displayedList = <List  >
                            <ListItemText primary = {" Weather in "+ weatherdata.name +", "+ weatherdata.sys.country + ":"}/>
                            <ListItemText primary = {"Humidity: "+ weatherdata.main.humidity +"%" }/>
                            <ListItemText primary = {"Wind Speed: " + weatherdata.wind.speed + ",  Bearing: " + weatherdata.wind.deg + "°" }/>
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
                            label = "Search A City"
                            variant="outlined"
                            defaultValue = {searchedcity}
                            onChange= {event => {
                                const { value } = event.target;
                                setsearchedcity(value)
                            }}
                        />
                        <IconButton  
                            classname ={classes.searchButton}
                            onClick={() => search()}
                            aria-label="Search Weather"      
                        > 
                            <img src = {searchGlass} alt = ""/>
                        </IconButton> 
                    </CardContent> 
                    
                    <CardContent className={classes.Icon} >
                        
                        <img src={displayedIcon} alt = ""/>
                        {displayedTemp}

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