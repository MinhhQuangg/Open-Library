import React, { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import { Box, Button, Grid, Modal } from "@mui/material";
import { MUIButton } from "../../components/common/Button/MUIButton";
import { useDispatch, useSelector } from "react-redux";
import { setBorrowBook } from "../../redux/slice/bookSlice";
import { Link } from "react-router-dom";

export const MyBook = () => {
  // const { borrow } = useContext(BookContext);
  const { borrowBook = {} } = useSelector((state) => state.borrowReducer);
  console.log("borrowBook:", borrowBook);
  useEffect(() => {
    document.title = "MyBook | Library";
  }, []);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleBook = (book) => {
    dispatch(setBorrowBook(borrowBook.filter((ele) => ele.id !== book.id)));
    handleClose();
  };
  const numBorrowBook = borrowBook.length;
  const recentBook = borrowBook.slice(numBorrowBook - 5, numBorrowBook);

  return (
    <Box sx={{ backgroundColor: "	#F0F0F0" }}>
      <NavBar />
      <Box margin=" 50px auto" sx={{ width: "75%" }} padding="20px">
        <Box fontSize="35px">My Book List</Box>
        <Box display="flex" margin="10px auto">
          <Box
            sx={{ backgroundColor: "white" }}
            padding="5px 20px"
            boxShadow="0 0 5px gray"
            borderRadius="5px"
            fontSize="18px"
            marginRight="10px"
          >
            Rent {`${borrowBook.length}`}
          </Box>
        </Box>
        {borrowBook.length === 0 ? (
          <Box justifyItems="center" textAlign="center" padding="130px 0">
            <img
              src="https://cdn-icons-png.flaticon.com/128/864/864685.png"
              alt="#"
              width="15%"
              height="15%"
            />
            <Box fontSize="30px">You haven't added any books yet.</Box>
          </Box>
        ) : (
          <Box>
            <Box
              margin="20px 300px"
              justifyItems="center"
              sx={{ backgroundColor: "white" }}
            ></Box>
            <Box fontSize="25px">Recently Added</Box>
            <Box display="flex">
              {recentBook.map((ele, id) => (
                <Box
                  key={ele.id}
                  margin="20px"
                  sx={{ backgroundColor: "white" }}
                  width="240px"
                  height="340px"
                  borderRadius="5px"
                  // alignContent="center"
                  // textAlign="center"
                >
                  <Box padding="20px">
                    <Box textAlign="center">
                      <img
                        src={`data:image/jpeg;base64,${ele.imgBase64}`}
                        alt={ele.title}
                        width="100%"
                        height="100%"
                      />
                    </Box>
                    <Box marginTop="5px" fontWeight="bold">
                      {ele.title}
                    </Box>
                    <Box margin="5px 0"> {ele.authors}</Box>
                    <Box margin="5px 0" fontWeight="bold">
                      {ele.rating}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
            <Grid container margin="20px 0">
              <Grid item xs={5} fontWeight="bold" textAlign="center">
                Title
              </Grid>
              <Grid item xs={1} fontWeight="bold">
                Rating
              </Grid>
              <Grid item xs={3} fontWeight="bold">
                Genre
              </Grid>
              <Grid item xs={3} fontWeight="bold">
                Status
              </Grid>
            </Grid>
            {borrowBook.map((ele, id) => (
              <Grid
                key={id}
                container
                boxShadow="0 0 5px gray"
                borderRadius="5px"
                display="flex"
                margin="20px 0"
                sx={{ backgroundColor: "white" }}
                padding="10px"
                alignItems="center"
              >
                <Grid item xs={5}>
                  <Grid container>
                    <Grid item xs={3} textAlign="center">
                      <Link
                        to={`/books/${ele.id}`}
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        <img
                          src={`data:image/jpeg;base64,${ele.imgBase64}`}
                          alt={ele.title}
                          width="100%"
                          height="90%"
                        />
                      </Link>
                    </Grid>
                    <Grid item xs={9} alignContent="center">
                      <Link
                        to={`/books/${ele.id}`}
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        <Box
                          fontWeight="bold"
                          fontSize="18px"
                          marginBottom="10px"
                        >
                          {ele.title}
                        </Box>
                      </Link>
                      By {ele.author}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={1}>
                  {ele.rating}
                </Grid>
                <Grid item xs={3}>
                  {ele.genres}
                </Grid>
                <Grid item xs={3}>
                  <Button variant="outlined" color="error" onClick={handleOpen}>
                    Return Book
                  </Button>

                  <Modal open={open} onClose={handleClose}>
                    <Box
                      position="absolute"
                      top="50%"
                      left="50%"
                      sx={{ transform: "translate(-50%, -50%)" }}
                      width="450px"
                      bgcolor="background.paper"
                      padding="10px 20px"
                      boxShadow="0 0 5px gray"
                      borderRadius="10px"
                    >
                      <Box
                        fontSize="25px"
                        fontWeight="bold"
                        borderBottom="0.5px solid"
                      >
                        Please Confirm
                      </Box>
                      <Box sx={{ mt: 2, mb: 7 }} fontSize="20px">
                        Are you sure you want to return this book?
                      </Box>
                      <Box position="relative" sx={{ float: "right" }}>
                        <MUIButton
                          color="error"
                          onClick={() => handleBook(ele)}
                        >
                          CONFIRM
                        </MUIButton>
                      </Box>
                    </Box>
                  </Modal>
                </Grid>
              </Grid>
            ))}
          </Box>
        )}
      </Box>
      <Footer />
    </Box>
  );
};
