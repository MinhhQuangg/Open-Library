import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ShareIcon from "@mui/icons-material/Share";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Modal,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import { MUIButton } from "../../components/common/Button/MUIButton.jsx";
import { setBorrowBook } from "../../redux/slice/bookSlice";
import { UserService } from "../../services/User.service";

export const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const date = today.toDateString();
  const { borrowBook = [] } = useSelector((state) => state.borrowReducer);
  // const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [openEditBook, setOpenEditBook] = useState(false);
  const [openDeleteBook, setOpenDeleteBook] = useState(false);
  const [text, setText] = useState("");
  const [star, setStar] = useState(0);
  const [feedback, setFeedback] = useState([]);
  const formContext = useForm();
  const { register, handleSubmit, formState } = formContext;
  const { errors } = formState;
  const dispatch = useDispatch();
  const [book, setBook] = useState({});

  const { isLoading } = useQuery({
    queryKey: ["getBook", id],
    queryFn: async () => {
      if (!id) return {};
      const response = await UserService.bookData(id);
      setBook(response);
      return response;
    },
  });

  const isBookBorrowed = (id) => {
    const borrowedBook = borrowBook.find((ele) => ele.id === id);
    return borrowedBook ? !borrowedBook.returnedBook : false;
  };

  const handleReviewChange = (e) => {
    setText(e.target.value);
  };

  const handleAdd = (book) => {
    dispatch(setBorrowBook([...borrowBook, book]));
  };

  const handleClick = () => {
    setFeedback([...feedback, [text, star]]);
    setText("");
    setStar(0);
    handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseEditBook = () => {
    setOpenEditBook(false);
  };

  const handleOpenEditBook = () => {
    setOpenEditBook(true);
  };

  const handleCloseDeleteBook = () => {
    setOpenDeleteBook(false);
  };

  const handleOpenDeleteBook = () => {
    setOpenDeleteBook(true);
  };

  const { mutate } = useMutation({
    mutationFn: async (payload) => {
      const updateBook = await UserService.editBook(payload);
      updateBook && setBook(updateBook);
    },
    onSuccess: () => {
      handleCloseEditBook();
    },
  });

  const handleClickEditBook = handleSubmit((data) => {
    mutate({ ...book, ...data });
  });

  const { mutate: mutateDelete } = useMutation({
    mutationFn: async (id) => {
      await UserService.deleteBook(id);
    },
    onSuccess: () => {
      navigate("/booklist");
    },
  });

  const handleClickDeleteBook = (id) => {
    mutateDelete(id);
  };

  return (
    <Box
      height="100vh"
      sx={{ backgroundColor: "#F0F0F0" }}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <NavBar />
      <Grid
        container
        sx={{
          backgroundColor: "white",
        }}
      >
        {!isLoading && (
          <>
            <Grid item xs={3} padding="20px">
              <Box
                padding="20px"
                border="1px solid #DCDCDC"
                borderRadius="5px"
                textAlign="center"
              >
                <Box boxShadow="0px 0px 10px gray">
                  <img
                    alt={book?.title}
                    src={`data:image/jpeg;base64,${book.imgBase64}`}
                    width="100%"
                    height="100%"
                  />
                </Box>
                {isBookBorrowed(book.id) ? (
                  <MUIButton
                    disabled
                    fullWidth
                    sx={{
                      justifyContent: "center",
                      borderRadius: "10px",
                      margin: "10px 0",
                    }}
                  >
                    <Typography fontSize="20px">ALREADY ADDED</Typography>
                  </MUIButton>
                ) : (
                  <MUIButton
                    fullWidth
                    sx={{
                      justifyContent: "center",
                      borderRadius: "10px",
                      margin: "10px 0",
                    }}
                    onClick={() => handleAdd(book)}
                  >
                    <Typography fontSize="20px">BORROW</Typography>
                  </MUIButton>
                )}
                <Divider variant="middle" sx={{ margin: "10px 0" }} />
                <Box display="flex" justifyContent="center">
                  <Button
                    sx={{
                      display: "grid",
                      justifyItems: "center",
                    }}
                    onClick={handleOpen}
                  >
                    <RateReviewIcon />
                    Review
                  </Button>
                  <Button
                    sx={{
                      display: "grid",
                      justifyItems: "center",
                    }}
                  >
                    <ShareIcon />
                    Share
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={9} padding="30px">
              <Box display="flex" justifyContent="space-between">
                <Box fontWeight="bold" fontSize="30px">
                  {book?.title}
                </Box>
                <Box display="flex">
                  <IconButton onClick={handleOpenDeleteBook}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={handleOpenEditBook}>
                    <EditIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box color="grey" fontSize="20px" marginTop="10px">
                By {book.author}
              </Box>
              <Box display="flex" marginTop="10px">
                <Rating value={Number(book.rating)} precision={0.1} readOnly />
                <Typography>&nbsp;{book.rating}&nbsp;</Typography>
                <Divider orientation="vertical" flexItem />
                <Typography>&nbsp;{book.rating_count} Ratings&nbsp;</Typography>
                <Divider orientation="vertical" flexItem />
                <Typography>&nbsp;{book.review_count} Reviews</Typography>
              </Box>
              <Box fontSize="15px" margin="20px 0">
                {book.description}
              </Box>
              <Box
                display="flex"
                marginTop="10px"
                justifyContent="space-between"
              >
                <Box
                  border="1px solid #DCDCDC"
                  padding="5px 90px"
                  textAlign="center"
                  borderRadius="10px"
                >
                  <Typography fontWeight="bold">Publisher&nbsp;</Typography>
                  <Typography>{book.publisher}</Typography>
                </Box>
                <Box
                  border="1px solid #DCDCDC"
                  padding="5px 90px"
                  textAlign="center"
                  borderRadius="10px"
                >
                  <Typography fontWeight="bold">Quantity&nbsp;</Typography>
                  <Typography>{book.quantity}</Typography>
                </Box>
                <Box
                  border="1px solid #DCDCDC"
                  padding="5px 90px"
                  textAlign="center"
                  borderRadius="10px"
                >
                  <Typography fontWeight="bold">Price&nbsp;</Typography>
                  <Typography>{book.price} vnđ</Typography>
                </Box>
              </Box>
              {/* <Box
                marginTop="30px"
                borderRadius="10px"
                border="1px solid #DCDCDC"
              >
                <Box
                  padding="10px"
                  fontSize="20px"
                  fontWeight="bold"
                  color="#696969"
                >
                  Book Quote
                </Box>
                <Divider variant="middle" />
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  margin="10px 0"
                  padding="10px 0"
                >
                  <Button
                    sx={{ width: "24px", height: "24px" }}
                    disabled={index <= 0}
                  >
                    <ArrowCircleLeftIcon
                      fontSize="large"
                      // color="action"
                      onClick={handleLeftClick}
                    />
                  </Button>
                  <Box
                    width="500px"
                    height="150px"
                    alignContent="center"
                    borderRadius="20px"
                    border="1px solid gray"
                    boxShadow="0px 0px 5px gray"
                    padding="10px"
                    fontSize="25px"
                    textAlign="center"
                    fontWeight="bold"
                    fontStyle="italic"
                  >
                    {quotes[index]}
                  </Box>
                  <Button
                    sx={{ width: "24px", height: "24px" }}
                    disabled={index >= quotes.length - 1}
                  >
                    <ArrowCircleRightIcon
                      fontSize="large"
                      onClick={handleRightClick}
                    />
                  </Button>
                </Box>
              </Box> */}
              <Box
                marginTop="30px"
                borderRadius="10px"
                border="1px solid #DCDCDC"
                padding="10px 0"
              >
                <Box
                  padding="10px"
                  fontSize="20px"
                  fontWeight="bold"
                  color="#696969"
                >
                  Reviews
                </Box>
                <Divider variant="middle" />
                {feedback.length ? (
                  feedback.map((ele, index) => (
                    <Box padding="10px" margin="10px 0" key={index}>
                      <Grid
                        container
                        padding="15px 10px"
                        borderRadius="10px"
                        border="1px solid #DCDCDC"
                      >
                        <Grid item xs={1} textAlign="center">
                          <AccountCircleIcon sx={{ fontSize: 40 }} />
                        </Grid>
                        <Grid item xs={9}>
                          <Box
                            fontWeight="bold"
                            paddingBottom="2px"
                            fontSize="18px"
                          >
                            Username
                          </Box>
                          <Box fontSize="14px">{date}</Box>
                        </Grid>
                        <Grid item xs={2}>
                          <Rating readOnly defaultValue={ele[1]} />
                        </Grid>
                        <Grid item xs={12} padding="20px 20px 0 20px">
                          {ele[0]}
                        </Grid>
                      </Grid>
                    </Box>
                  ))
                ) : (
                  <Box padding="10px" fontSize="15px">
                    No reviews can display now
                  </Box>
                )}

                <Button variant="text" sx={{ ml: "10px" }} onClick={handleOpen}>
                  + Adding review to the community
                </Button>
                <Modal open={open} onClose={handleClose}>
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    sx={{ transform: "translate(-50%, -50%)" }}
                    width="450px"
                    bgcolor="background.paper"
                    padding="20px"
                    boxShadow="0 0 5px gray"
                    borderRadius="10px"
                  >
                    <Box
                      fontSize="35px"
                      fontWeight="bold"
                      borderBottom="0.5px solid"
                      textAlign="center"
                      marginBottom="30px"
                      paddingBottom="10px"
                    >
                      Leave a review
                    </Box>
                    <Box textAlign="center" marginBottom="10px">
                      <Typography
                        fontWeight="bold"
                        marginBottom="5px"
                        fontSize="20px"
                      >
                        Rating
                      </Typography>
                      <Rating
                        size="large"
                        value={star}
                        onChange={(event, value) => {
                          setStar(value);
                        }}
                      />
                    </Box>
                    <Box padding="10px" marginBottom="60px">
                      <Typography
                        fontWeight="bold"
                        fontSize="20px"
                        sx={{ mb: "5px " }}
                      >
                        Review
                      </Typography>
                      <TextField
                        value={text}
                        onChange={handleReviewChange}
                        placeholder="Write your review"
                        fullWidth
                        sx={{ height: "100px" }}
                        multiline
                        rows={5}
                        inputProps={{
                          maxLength: 500,
                        }}
                        type="text"
                      />
                    </Box>

                    <Box textAlign="center" marginTop="100px">
                      <MUIButton
                        color="error"
                        sx={{ width: "200px", padding: "10px" }}
                        onClick={handleClick}
                      >
                        RATE NOW
                      </MUIButton>
                    </Box>
                  </Box>
                </Modal>
              </Box>
              <Modal open={openEditBook} onClose={handleCloseEditBook}>
                <form>
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    sx={{ transform: "translate(-50%, -50%)" }}
                    width="50%"
                    bgcolor="background.paper"
                    padding="20px"
                    boxShadow="0 0 5px gray"
                    borderRadius="10px"
                    maxHeight="80vh"
                    overflow="auto"
                  >
                    <Box
                      fontSize="35px"
                      fontWeight="bold"
                      borderBottom="0.5px solid"
                      textAlign="center"
                      marginBottom="30px"
                      paddingBottom="10px"
                    >
                      Edit Book
                    </Box>
                    <Box padding="10px">
                      <Box display="flex">
                        <Typography
                          fontWeight="bold"
                          fontSize="20px"
                          sx={{ mb: "5px " }}
                        >
                          Title
                        </Typography>
                        <Typography color="red">*</Typography>
                      </Box>
                      <TextField
                        // value={text}
                        {...register("title", {
                          required: "Title is required",
                        })}
                        defaultValue={book.title}
                        fullWidth
                        type="text"
                      />
                      <Box color="red">{errors.title?.message}</Box>
                    </Box>
                    <Box padding="10px">
                      <Box display="flex">
                        <Typography
                          fontWeight="bold"
                          fontSize="20px"
                          sx={{ mb: "5px " }}
                        >
                          Author
                        </Typography>
                        <Typography color="red">*</Typography>
                      </Box>
                      <TextField
                        // value={text}
                        {...register("author", {
                          required: "Author is required",
                        })}
                        defaultValue={book.author}
                        fullWidth
                        type="text"
                      />
                      <Box color="red">{errors.author?.message}</Box>
                    </Box>
                    <Box padding="10px">
                      <Typography
                        fontWeight="bold"
                        fontSize="20px"
                        sx={{ mb: "5px " }}
                      >
                        Publisher
                      </Typography>
                      <TextField
                        // value={text}
                        {...register("publisher")}
                        defaultValue={book.publisher}
                        fullWidth
                        type="text"
                      />
                    </Box>
                    <Box padding="10px">
                      <Typography
                        fontWeight="bold"
                        fontSize="20px"
                        sx={{ mb: "5px " }}
                      >
                        Price
                      </Typography>
                      <TextField
                        // value={text}
                        {...register("price")}
                        defaultValue={book.price}
                        fullWidth
                        type="text"
                      />
                    </Box>
                    <Box padding="10px">
                      <Typography
                        fontWeight="bold"
                        fontSize="20px"
                        sx={{ mb: "5px " }}
                      >
                        Quantity
                      </Typography>
                      <TextField
                        // value={text}
                        {...register("quantity")}
                        defaultValue={book.quantity}
                        fullWidth
                        type="text"
                      />
                    </Box>
                    <Box padding="10px" marginBottom="60px">
                      <Typography
                        fontWeight="bold"
                        fontSize="20px"
                        sx={{ mb: "5px " }}
                      >
                        Description
                      </Typography>
                      <TextField
                        // value={text}
                        {...register("description")}
                        defaultValue={book.description}
                        fullWidth
                        multiline
                        rows={5}
                        type="text"
                      />
                    </Box>

                    <Box textAlign="center" marginTop="100px">
                      <MUIButton
                        color="error"
                        sx={{ width: "200px", padding: "10px" }}
                        onClick={handleClickEditBook}
                      >
                        SUBMIT
                      </MUIButton>
                    </Box>
                  </Box>
                </form>
              </Modal>
              <Modal open={openDeleteBook} onClose={handleCloseDeleteBook}>
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  sx={{ transform: "translate(-50%, -50%)" }}
                  bgcolor="background.paper"
                  padding="20px"
                  boxShadow="0 0 5px gray"
                  borderRadius="10px"
                  width="40%"
                >
                  <Box
                    fontSize="25px"
                    fontWeight="bold"
                    borderBottom="0.5px solid"
                    paddingBottom="10px"
                  >
                    Delete Book Confirmation
                  </Box>
                  <Box margin="20px 0 40px 0">
                    <Typography fontSize="20px">
                      Are you sure you want to delete this book?
                    </Typography>
                  </Box>
                  <Box textAlign="right">
                    <MUIButton
                      color="error"
                      onClick={() => handleClickDeleteBook(id)}
                    >
                      Delete
                    </MUIButton>
                  </Box>
                </Box>
              </Modal>
            </Grid>
          </>
        )}
      </Grid>
      <Footer />
    </Box>
  );
};
