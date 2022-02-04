import { Button, Container, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchCountry = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState<string | null>(null);
  const getCountryInfo = () => {
    navigate("/country-info", { state: inputData });
  }
  return <Container>
      <form>
      <TextField data-testid="inputField" id="input" label="Enter Country Name" value={inputData} onChange={(e: any) => setInputData(e.target.value)} />
      <Button variant='contained' data-testid="button" color="primary" disabled={inputData ? false : true} onClick={()=>getCountryInfo()} >Search Country Info</Button>
      </form>
  </Container>
  ;
};

export default SearchCountry;
