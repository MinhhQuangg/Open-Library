import { Box, Button, Grid } from "@mui/material";
import React from "react";

export const GenreList = ({ genres }) => {
  return (
    <Grid container spacing={2}>
      {genres.map((genre, i) => (
        <Grid item xs={2} key={i}>
          <Button fullWidth>
            <Box>
              <img
                src={genre.image_url}
                alt={genre.title}
                width="70px"
                height="70px"
              />
              <Box color="black">{genre.title}</Box>
            </Box>
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};
