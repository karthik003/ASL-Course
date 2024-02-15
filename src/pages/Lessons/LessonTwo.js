import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardMedia, Typography, Box, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LessonTwo = () => {
  const [imageGroups, setImageGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSentenceImages = async () => {
      const firstName = JSON.parse(localStorage.getItem("googleUser")) 
        ? JSON.parse(localStorage.getItem("googleUser")).uT 
        : "John";
      const fullSentence = `My name is ${firstName}`;
      
      try {
        const response = await axios.post('http://localhost:105/text-to-image', { text: fullSentence });
        console.log(response.data)
        setImageGroups(response.data.recognized_images); // Assuming the backend directly returns the structured list
      } catch (error) {
        console.error('Error fetching ASL images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSentenceImages();
  }, []);

  const handleNextLesson = () =>{
    navigate('/lesson3')
  }
  return (
<Container maxWidth={false} disableGutters sx={{ height: '100vh', display: 'flex' }}>
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid item xs={6} sx={{ overflowY: 'auto', height: '100vh', padding: 3 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </Box>
          ) : (
            imageGroups.map((group, index) => (
              <Box key={index} sx={{ mb: 5 }}>
                <Typography variant="h5" gutterBottom>
                  {group.word.toUpperCase()}
                </Typography>
                {group.images.map((image, idx) => (
                  <Card key={idx} sx={{ mb: 2 }}>
                    <CardMedia
                      component="img"
                      image={`data:image/jpeg;base64,${image.data}`} // Display the base64 encoded image
                      alt={`ASL Sign for "${group.word}" ${idx + 1}`}
                    />
                  </Card>
                ))}
              </Box>
            ))
          )}
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
          {/* Placeholder for camera functionality */}
          <Typography variant="h5">Camera</Typography>
        </Grid>
      </Grid>
      <Button onClick={handleNextLesson} variant="contained" color="primary" sx={{ position: 'absolute', bottom: 16, right: 16 }}>
        Next Lesson
      </Button>
    </Container>
  );
};

export default LessonTwo;
