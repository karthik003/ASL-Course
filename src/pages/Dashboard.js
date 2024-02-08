import React,{useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    const [level, setLevel] = React.useState(1);
    const [firstName,setFirstName] = useState(JSON.parse(localStorage.getItem("googleUser")).uT)
    const handleChange = (event) => {
      setLevel(event.target.value);
    };
  
    const handleSubmit = () =>{
        if(level==1){
            navigate('/lesson1')
        }else if(level==2){
            navigate('/lesson2')
        }else if(level==3){
            navigate('/lesson3')
        }else{
            navigate('/lesson1')
        }
    }

    return (
      <div style={{textAlign:"center"}}>
        <h1>Hello {firstName}</h1>
        <p>Select a level to start learning:</p>
        <Grid container spacing={2}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Level</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={level}
            label="Level"
            onChange={handleChange}
            >
            <MenuItem value={1}>One</MenuItem>
            <MenuItem value={2}>Two</MenuItem>
            <MenuItem value={3}>Third</MenuItem>
            </Select>
        </FormControl>

            </Grid>
            <Grid item xs={4}></Grid>
        </Grid>
        <br />
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>

      </div>
    );
  }

export default Dashboard;
