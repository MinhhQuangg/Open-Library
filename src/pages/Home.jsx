import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Footer } from "../components/Footer";
import { GenreList } from "../components/GenreList";
import { Loader } from "../components/Loader";
import { MUILink } from "../components/common/Link/MUILink";

import { useQuery } from "@tanstack/react-query";

import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { BasicCarousel } from "../components/Carousel";
import { NavBar } from "../components/NavBar";
import { UserService } from "../services/User.service";

const genres = [
  {
    title: "Young Adult",
    image_url: "https://cdn-icons-png.flaticon.com/128/1453/1453486.png",
  },
  {
    title: "Fiction",
    image_url: "https://cdn-icons-png.flaticon.com/128/3839/3839372.png",
  },
  {
    title: "Science Fiction",
    image_url: "https://cdn-icons-png.flaticon.com/128/5381/5381421.png",
  },
  {
    title: "Dystopia",
    image_url: "https://cdn-icons-png.flaticon.com/128/15201/15201001.png",
  },
  {
    title: "Fantasy",
    image_url: "https://cdn-icons-png.flaticon.com/128/7860/7860331.png",
  },
  {
    title: "Classics",
    image_url: "https://cdn-icons-png.flaticon.com/128/1639/1639407.png",
  },
  {
    title: "Historical",
    image_url: "https://cdn-icons-png.flaticon.com/128/5234/5234766.png",
  },
  {
    title: "Historical Fiction",
    image_url: "https://cdn-icons-png.flaticon.com/128/5234/5234673.png",
  },
  {
    title: "Academic",
    image_url: "https://cdn-icons-png.flaticon.com/128/6475/6475927.png",
  },
  {
    title: "School",
    image_url: "https://cdn-icons-png.flaticon.com/128/8074/8074788.png",
  },
  {
    title: "Romance",
    image_url: "https://cdn-icons-png.flaticon.com/128/5100/5100487.png",
  },
  {
    title: "Paranormal",
    image_url: "https://cdn-icons-png.flaticon.com/128/5875/5875840.png",
  },
  {
    title: "Vampires",
    image_url: "https://cdn-icons-png.flaticon.com/128/3473/3473907.png",
  },
  {
    title: "Childrens",
    image_url: "https://cdn-icons-png.flaticon.com/128/769/769651.png",
  },
  {
    title: "Literature",
    image_url: "https://cdn-icons-png.flaticon.com/128/5418/5418007.png",
  },
  {
    title: "Politics",
    image_url: "https://cdn-icons-png.flaticon.com/128/3122/3122432.png",
  },
  {
    title: "Novels",
    image_url: "https://cdn-icons-png.flaticon.com/128/14176/14176890.png",
  },
  {
    title: "Read For School",
    image_url: "https://cdn-icons-png.flaticon.com/128/171/171322.png",
  },
];

export const Home = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getBooks"],
    queryFn: () => {
      const response = UserService.getBooks(1, 10);
      return response || {};
    },
  });
  // useQuery({
  //   queryKey: ["getUsers"],
  //   queryFn: () => {
  //     const response = UserService.getUsers();
  //     return response || {};
  //   },
  // });

  useEffect(() => {
    document.title = "Home | Library";
  }, []);

  return (
    <Box sx={{ backgroundColor: "	#F0F0F0" }}>
      <NavBar />
      <Box
        height="200px"
        sx={{
          backgroundImage:
            "url(" +
            "https://st4.depositphotos.com/23354048/25923/i/450/depositphotos_259232216-stock-photo-background-wallpaper-form-defocused-bookshelf.jpg" +
            ")",
          backgroundSize: "40%",
        }}
        alignContent="center"
      >
        <Typography
          color="white"
          textAlign="center"
          sx={{
            pt: "10px",
            fontSize: "40px",
            fontWeight: "bold",
          }}
        >
          WELCOME TO LIBRARY
        </Typography>
      </Box>
      <Grid
        container
        margin=" 20px auto"
        sx={{
          width: "80%",
        }}
      >
        <Grid
          item
          xs={12}
          marginTop="30px"
          marginBottom="30px"
          padding="10px"
          sx={{ backgroundColor: "white" }}
          borderRadius="20px"
        >
          <Typography
            sx={{ fontSize: "25px", mb: "20px", pl: "15px" }}
            fontFamily="Anton"
          >
            OUR BOOKS&nbsp;
            <MUILink href="/BookList" fontSize="18px">
              (View all)
            </MUILink>
          </Typography>
          {isLoading && <Loader />}
          {!isLoading && (
            <Box>
              <BasicCarousel>
                {data.result &&
                  data.result.map((book) => (
                    <Box
                      textAlign=" center"
                      fontFamily="arial"
                      margin="0 10px"
                      key={book.id}
                    >
                      <Grid container>
                        <Grid item xs={12} paddingTop="5px">
                          <Box
                            padding="10px"
                            boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
                          >
                            <Link
                              to={`/books/${book.id}`}
                              style={{ color: "black", textDecoration: "none" }}
                            >
                              <img
                                src={`data:image/jpeg;base64,${book.imgBase64}`}
                                alt={book.title}
                                width="75%"
                                height="200%"
                              />
                            </Link>
                          </Box>
                          <Box textAlign="left" marginTop="10px">
                            <Link
                              to={`/books/${book.id}`}
                              style={{ color: "black", textDecoration: "none" }}
                            >
                              {book.title}
                            </Link>
                            <Box fontSize="15px" color="gray" marginTop="8px">
                              {book.authors}
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
              </BasicCarousel>
            </Box>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          marginTop="30px"
          marginBottom="30px"
          padding="10px"
          sx={{ backgroundColor: "white" }}
          borderRadius="20px"
        >
          <Typography
            sx={{ fontSize: "25px", mb: "20px", pl: "15px" }}
            fontFamily="Anton"
          >
            LITERARY GENRES&nbsp;
            <MUILink href="/BookList" fontSize="18px">
              (View all)
            </MUILink>
          </Typography>
          <GenreList genres={genres} />
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
};
