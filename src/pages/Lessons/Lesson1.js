import { Button } from '@mui/material';
import React from 'react';
import MicIcon from '@mui/icons-material/Mic';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import AudioRecorder from '../../components/AudioRecorder';
import Grid from '@mui/material/Grid';
function Lesson1() {
    return (
      <div>
        <h2>Lesson 1</h2>
        {/* Speech to text integration  & sign display logic */}
        <Grid container spacing={2}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <AudioRecorder />
              <p>Then click on Generate signs button to get its corresponding ASL symbol.</p>
              <Button variant="contained">Generate signs</Button>
            </Grid>
            <Grid item xs={4}></Grid>
        </Grid>
       
      </div>
    );
  }

export default Lesson1;
