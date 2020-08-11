import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import { List, Button, ListItemText, CardContent } from "@material-ui/core";
import axios from "axios";
import Card from "@material-ui/core/Card";
import { makeStyles } from '@material-ui/core/styles';

function UserInfo() {

    const [userInfo, setUserInfo] = useState({ username: "", locationPref: "", success: "", error: "" });
    const [weatherdata, setweatherdata] = useState({});

    function search() {
        const apikey = "ba9faead36419b05538747acf541515b";
        const city = userInfo.locationPref;
        const url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apikey;
        axios.get(url)
            .then(res => {
                setweatherdata(res.data);
            })
    }

    async function saveprefs() {

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }
        var body = {
            username: userInfo.username,
            locationPref: userInfo.locationPref
        }
        await axios.post("/users", body, config)
            .then(res => {
                setUserInfo({ ...userInfo, success: res.data.success })
                setUserInfo({ ...userInfo, error: res.data.error })
            })
        search()

    }

    function handleUsernameChange(input) {
        setUserInfo({ ...userInfo, username: input })
    }

    function handleLocationPrefChange(input) {
        setUserInfo({ ...userInfo, locationPref: input })
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

        },

        SignInForm: {
            margin: "12px",
        }

    });
    const classes = useStyles()


    function ifSuccess() {
        if (userInfo.success === true) {
            if (weatherdata.name !== undefined) {
                return (
                    <div>
                        <List  >
                            <ListItemText primary={" Weather in " + weatherdata.name + ", " + weatherdata.sys.country + ":"} />
                            <ListItemText primary={"Humidity: " + weatherdata.main.humidity + "%"} />
                            <ListItemText primary={"Wind Speed: " + weatherdata.wind.speed + ",  Bearing: " + weatherdata.wind.deg + "°"} />
                        </List>
                        <Button variant="contained" color="primary"
                            onClick={() => { }}
                        >
                            Log out
                    </Button>
                    </div>


                )
            } else {
                return (
                    <div>
                        <Button variant="contained" color="primary"
                            onClick={() => { }}
                        >
                            Log out
                    </Button>
                    </div>
                )
            }



        } else if (userInfo.success === false) {
            return (
                <div>

                    <form className={classes.SignInForm} noValidate autoComplete="off">
                        <TextField label="Username"
                            onChange={(event) => handleUsernameChange(event.target.value)}
                        />


                        <TextField label="Home City"
                            onChange={(event) => handleLocationPrefChange(event.target.value)}
                        />


                    </form>
                    <Button variant="contained" color="primary"
                        onClick={() => { saveprefs() }}
                    >
                        Save Preferences
                    </Button>
                </div>
            )

        }
    }

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    {ifSuccess()}
                </CardContent>
            </Card>

        </div>

    )

}

export default UserInfo;