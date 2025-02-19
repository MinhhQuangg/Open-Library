import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Pagination,
  Rating,
  Select,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ErrorSearch } from "../../components/ErrorSearch";
import { Footer } from "../../components/Footer";
import { Loader } from "../../components/Loader";
import { NavBar } from "../../components/NavBar";
import { MUIButton } from "../../components/common/Button/MUIButton";
import { setBorrowBook } from "../../redux/slice/bookSlice";
import { UserService } from "../../services/User.service";

const postPerPage = 7;
// const page = 3;
export const BookList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useQuery({
    queryKey: ["getBooks", currentPage],
    queryFn: () => {
      const response = UserService.getBooks(currentPage, 7);
      return response;
    },
  });

  useEffect(() => {
    document.title = "BookList | Library";
  }, []);

  const handleChange = (_, value) => {
    setCurrentPage(value);
  };
  const [showMoreMap, setShowMoreMap] = useState({});
  const toggleShowMore = (id) => {
    setShowMoreMap((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // const { borrow, setBorrow, isBookBorrowed } = useContext(BookContexts);
  // const addBorrowBook = (book) => {
  //   setBorrow([...borrow, { ...book, returnedBook: false }]);
  // };

  const isBookBorrowed = (id) => {
    const borrowedBook = borrowBook.find((ele) => ele.id === id);
    return borrowedBook ? !borrowedBook.returnedBook : false;
  };

  const dispatch = useDispatch();
  const { borrowBook } = useSelector((state) => state.borrowReducer);

  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const addBorrowBook = (book) => {
    dispatch(setBorrowBook({ ...book, quantity }));
  };

  return (
    <Box
      sx={{ backgroundColor: "#F0F0F0" }}
      display="flex"
      flexDirection="column"
      minHeight="100vh"
    >
      <NavBar />
      <Grid
        container
        margin=" 50px auto"
        sx={{
          flex: "1 0 auto",
          width: "90%",
        }}
      >
        <Grid item xs={1.5} />
        <Grid
          item
          xs={9}
          padding="20px"
          sx={{ backgroundColor: "white" }}
          borderRadius="20px"
        >
          <Typography fontSize="35px" marginBottom="30px">
            List of Books
          </Typography>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <>
              <Grid container spacing={4}>
                {data.result.map((ele) => (
                  <Grid item xs={12} key={ele.id} marginBottom="20px">
                    <Box display="flex" alignContent="center">
                      <Box alignItems="center" justifyContent="center">
                        <Box marginRight="10px">
                          <Link to={`/books/${ele.id}`}>
                            <img
                              src={`data:image/jpeg;base64,${ele.imgBase64}`}
                              alt={ele.title}
                              width="200px"
                              height="200px"
                            />
                          </Link>
                        </Box>
                        <Box textAlign="center">
                          <Rating
                            defaultValue={ele.rating}
                            readOnly
                            precision={0.1}
                          />
                        </Box>
                      </Box>

                      <Grid container direction="column">
                        <Grid item>
                          <Box fontSize="23px" fontWeight="bold">
                            <Link
                              to={`/books/${ele.id}`}
                              style={{
                                color: "black",
                                textDecoration: "none",
                              }}
                            >
                              {ele.title}
                            </Link>
                          </Box>
                          <Box marginTop="5px" fontSize="15px">
                            By {ele.author}
                          </Box>
                          <Box margin="20px 0" fontSize="15px">
                            {showMoreMap[ele.id]
                              ? ele.description
                              : `${ele.description?.substring(0, 200)}`}
                            {ele.description?.length > 200 && (
                              <Button
                                onClick={() => toggleShowMore(ele.id)}
                                variant="text"
                                fontSize="14px"
                                size="small"
                                sx={{ padding: "0px" }}
                              >
                                {showMoreMap[ele.id] ? "(less)" : "...(more)"}
                              </Button>
                            )}
                          </Box>
                          <Box display="flex" marginTop="10px">
                            <Box
                              fontSize="17px"
                              display="flex"
                              marginRight="20px"
                              textAlign="center"
                            >
                              <Typography fontWeight="bold">
                                Quantity:&nbsp;
                              </Typography>
                              {ele.quantity} books
                            </Box>
                            <Box fontSize="17px" display="flex">
                              <Typography fontWeight="bold">
                                Price:&nbsp;
                              </Typography>
                              {ele.price} vnđ
                            </Box>
                          </Box>
                        </Grid>

                        <Grid item style={{ marginTop: "auto" }}>
                          <Box
                            alignItems="center"
                            display="flex"
                            marginBottom="5px"
                          >
                            <Box
                              alignContent="center"
                              fontWeight="bold"
                              margin="20px 0"
                            >
                              Select amount: &nbsp;
                            </Box>
                            <FormControl size="small">
                              <Select
                                autoWidth
                                value={quantity}
                                onChange={handleQuantity}
                              >
                                {[...Array(21).keys()].map((num) => (
                                  <MenuItem key={num} value={num}>
                                    {num}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Box>

                          <MUIButton
                            onClick={() => {
                              addBorrowBook(ele);
                            }}
                          >
                            Add to cart
                          </MUIButton>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: "20px",
                  mb: "20px",
                }}
              >
                <Pagination
                  count={Math.ceil(data.meta.total / postPerPage)}
                  onChange={handleChange}
                  page={currentPage}
                />
              </Box>
            </>
          )}
          {error && <ErrorSearch message={error} />}
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
};
