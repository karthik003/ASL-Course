import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Grid, Typography, Container, CircularProgress, Box, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LessonOne = () => {
  const [aslSigns, setAslSigns] = useState([]);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAslSigns = async () => {
      try {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('').join(' ');
        const response = await axios.post('http://localhost:105/text-to-image', { text: alphabet });
        setAslSigns(response.data.recognized_images);
      } catch (error) {
        console.error('Error fetching ASL signs:', error);
      }
    };
    fetchAslSigns();
  }, []);

  return (
    <Container maxWidth={false} disableGutters sx={{ height: '100vh', display: 'flex', flexDirection: 'row' }}>
      <Grid container sx={{ height: '100%', flexGrow: 1}}>
        <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',padding:"10px"  }}>
          {aslSigns.length > 0 ? (
            <>
              <Card sx={{ mb: 2 }}>
                {aslSigns[currentLetterIndex] ? (
                  <CardMedia
                    component="img"
                    image={`data:image/jpeg;base64,${aslSigns[currentLetterIndex].images[0].data}`}
                    alt={`ASL Sign for "${aslSigns[currentLetterIndex].word}"`}
                    sx={{ height: "100%", width: "100%" }}
                  />
                ) : (
                  <CircularProgress /> // Loader displayed while image is loading
                )}
                <CardContent>
                  <Typography variant="h4" align="center">
                    {aslSigns[currentLetterIndex] ? aslSigns[currentLetterIndex].word.toUpperCase() : 'Loading...'}
                  </Typography>
                </CardContent>
              </Card>
              <Box>
                <Button onClick={() => setCurrentLetterIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : aslSigns.length - 1))}>
                  <ArrowBackIosIcon />
                </Button>
                <Button onClick={() => setCurrentLetterIndex((prevIndex) => (prevIndex + 1) % aslSigns.length)}>
                  <ArrowForwardIosIcon />
                </Button>
              </Box>
            </>
          ) : (
            <CircularProgress size={60} /> // Loader displayed while all signs are loading
          )}
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',backgroundColor: '#f5f5f5'  }}>
          <Typography variant="h5">Camera</Typography>
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" onClick={() => navigate('/lesson2')} sx={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)' }}>
        Next Lesson
      </Button>
    </Container>
  );
};

export default LessonOne;
