import React, { useState } from 'react';
import { Button, Card, CardContent, CardMedia, Grid, Typography, Container, CircularProgress } from '@mui/material';
import axios from 'axios';

const LessonOne = () => {
  const [aslSigns, setAslSigns] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAslSigns = async () => {
    setLoading(true);
    try {
      // Sending a POST request with a string containing all letters A-Z
      const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('').join(' '); // Create a space-separated string of all letters
      const response = await axios.post('http://localhost:105/text-to-image', { text: alphabet });
      
      // Assuming the backend returns a structured list of each letter with its image
      setAslSigns(response.data.recognized_images);
    } catch (error) {
      console.error('Error fetching ASL signs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" >
      <Grid container spacing={4}>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" onClick={fetchAslSigns} disabled={loading} sx={{ mb: 4 }}>
              {loading ? <CircularProgress size={24} /> : 'Generate Signs'}
            </Button>
          </Grid>
      </Grid>
      <Grid container spacing={4}>
        {aslSigns.map((sign, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CardMedia
                component="img"
                image={`data:image/jpeg;base64,${sign.images[0].data}`} // Assuming the first image is the one we want to display
                alt={`ASL Sign for "${sign.word}"`}
                sx={{ width: 128, height: 128, mt: 2 }} // Adjust size as needed
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div" align="center">
                  {sign.word.toUpperCase()} {/* Display the letter in uppercase */}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default LessonOne;
