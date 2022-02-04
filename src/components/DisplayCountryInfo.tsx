import { Button, Container, Paper, SvgIcon, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const DisplayCountryInfo = () => {
    const location = useLocation();
    const [countryData, setCountryData] = useState<any>("");
    const [flag, setFlag] = useState<any>("");
    const [capitalData, setCapitalData] = useState<any>("");
    const [showWeather, setShowWeather] = useState(false);
    console.log(location.state);
    useEffect(() => {
        axios({
            method: "get",
            url: `https://restcountries.com/v2/name/${location.state}`,
            responseType: "stream"
        })
            .then((res) => {
                // console.log(res.data[1].flags);
                setFlag(res.data[1].flags);
                setCountryData(res.data[1]);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])
    const getCapitalWeather = async () => {
        try {
            const responce = await axios.get(`http://api.weatherstack.com/current?access_key=799d2cb12c98d1978925b8fa886e1e0a&query=${countryData.capital}`)
            setCapitalData(responce.data.current);
            setShowWeather(true)
        } catch (error) {
            console.log(error);
        }
    }
    return <Container>
        <Paper>
            <Typography variant='h2' data-testid="heading">Country Info</Typography>
            <Typography variant='body1'>Capital: {countryData.capital}</Typography>
            <Typography variant='body1'>Population: {countryData.population}</Typography>
            <Typography variant='body1'>latlng: {countryData.latlng}</Typography>
            <Typography variant='body1'>Flag: <img src={flag.svg} width="100px" /></Typography>
            <Button variant='contained' color="primary" onClick={() => getCapitalWeather()}>Capital Weather</Button>
        </Paper>
        {
            showWeather ?
                <>
                    <Typography variant='h2'>Capital Weather</Typography>

                    <Typography variant='body1'>temperature: {capitalData.temperature}</Typography>
                    <Typography variant='body1'>weather_icons: <img src={capitalData.weather_icons} width="100px" /></Typography>
                    <Typography variant='body1'>Wind_speed: {capitalData.wind_speed}</Typography>
                    <Typography variant='body1'>Precip: {capitalData.precip}</Typography>
                </>
                : ""
        }
    </Container>;
};

export default DisplayCountryInfo;
