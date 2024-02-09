import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardMedia, Typography, Box, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LessonOne = () => {
  const [imageGroups, setImageGroups] = useState([]);
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
      }
    };

    fetchSentenceImages();
  }, []);

  const handleNextLesson = () =>{
    navigate('/lesson2')
  }
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom component="h1">
          Lesson 1: What is your name?
        </Typography>
        {imageGroups && imageGroups.map((group, index) => (
          <Box key={index} sx={{ mt: 2 }} style={{marginBottom:"50px"}}>
            <Typography variant="h6" gutterBottom>
              {group.word.toUpperCase()}
            </Typography>
            <Grid container spacing={2}>
              {group.images.map((image, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Card>
                    <CardMedia
                      component="img"
                      image={`data:image/jpeg;base64,${image.data}`} // Display the base64 encoded image
                      alt={`ASL Sign for "${group.word}" ${idx + 1}`}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Box>
      <Button onClick={handleNextLesson} variant='contained' color="success">Next Lesson</Button>
    </Container>
  );
};

export default LessonOne;
