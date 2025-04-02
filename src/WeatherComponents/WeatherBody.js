import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./WeatherBody.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  InputGroup,
  Input,
  Toast,
  ToastHeader,
  ToastBody,
} from "reactstrap";
import React, { useState } from "react";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function WeatherBody({ location }) {
  const [parameter, setParameter] = useState(null);
  const [region, setRegion] = useState("Paris");
  const [handleError, setHandleError] = useState(null);

  console.log("parameter", parameter);
  const handleOnClick = () => {
    axios
      .get("http://api.weatherapi.com/v1/current.json", {
        params: {
          key: "ef551ac08de5430b87a111604252303",
          q: region,
        },
      })
      .then((response) => {
        setParameter(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setHandleError(error);
        console.error("Error fetching data: ", error.status);
      });
  };
  const handleOnChange = (e) => {
    setRegion(e.target.value);
  };
  const reload = () => {
    setHandleError(null);
  };
  if (handleError === null) {
    return (
      <>
        {parameter !== null ? (
          <>
            <section className="box">
              <div style={{ width: "70%", margin: "2rem auto" }}>
                <InputGroup>
                  <Button color="danger">Reset</Button>
                  <Input
                    placeholder="City"
                    onChange={handleOnChange}
                    value={region}
                  />
                  <Button color="success" onClick={handleOnClick}>
                    Submit
                  </Button>
                </InputGroup>
              </div>
              <div className="container" style={{ marginTop: "5rem" }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2} columns={16}>
                    <Grid size={8}>
                      <Item
                        style={{ height: "100%", boxShadow: "3px 3px 1px" }}
                      >
                        <LocationOnIcon /> {region}
                        <h3>Temperature: {parameter.current.temp_c}</h3>
                      </Item>
                    </Grid>
                    <Grid size={8}>
                      <Item
                        style={{
                          height: "100%",
                          textAlign: "left",
                          boxShadow: "3px 3px 1px",
                        }}
                      >
                        <ul style={{ listStyleType: "none" }}>
                          <li>Humidity: {parameter.current.humidity}</li>
                          <li>Wind speed: {parameter.current.wind_kph}</li>
                          <li>Pressure: {parameter.current.pressure_mb}</li>
                        </ul>
                      </Item>
                    </Grid>
                    <Grid size={8} style={{ marginTop: "2rem", width: "100%" }}>
                      <Item
                        style={{ height: "100%", boxShadow: "3px 3px 1px" }}
                      >
                        <ul style={{ listStyleType: "none" }}>
                          <li>Region: {parameter.location.region}</li>
                          <li>Local time: {parameter.location.localtime}</li>
                        </ul>
                      </Item>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </section>
          </>
        ) : (
          <>
            <div style={{ width: "70%", margin: "2rem auto" }}>
              <InputGroup>
                <Button color="danger">Reset</Button>
                <Input placeholder="City" onChange={handleOnChange} />
                <Button color="success" onClick={handleOnClick}>
                  Submit
                </Button>
              </InputGroup>
            </div>
          </>
        )}
      </>
    );
  } else {
    return (
      <>
        <Toast style={{ margin: "5rem auto" }}>
          <ToastHeader>Invalid City Name</ToastHeader>
          <ToastBody>Please enter a valid city name!!</ToastBody>
          <Button color="success" style={{ margin: "auto" }} onClick={reload}>
            Go back!!
          </Button>
        </Toast>
      </>
    );
  }
}
