import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import { MUIButton } from "../../components/common/Button/MUIButton";
import { MUITextField } from "../../components/common/TextField/MUITextField";
import {
  clearBorrowBook,
  decreaseBorrowBook,
  increaseBorrowBook,
  removeBorrowBook,
  setTotal,
} from "../../redux/slice/bookSlice";

export const ShoppingCartBook = () => {
  const dispatch = useDispatch();
  const {
    borrowBook = {},
    totalQuantity,
    totalPrice,
  } = useSelector((state) => state.borrowReducer);

  const handleRemoveBook = (book) => {
    dispatch(removeBorrowBook(book));
  };
  const handleDecrease = (book) => {
    dispatch(decreaseBorrowBook(book));
  };
  const handleIncrease = (book) => {
    dispatch(increaseBorrowBook(book));
  };
  const clearCart = () => {
    dispatch(clearBorrowBook());
  };

  useEffect(() => {
    dispatch(setTotal());
  }, [borrowBook, dispatch]);

  return (
    <Box
      sx={{ backgroundColor: "	#F0F0F0" }}
      display="flex"
      flexDirection="column"
      minHeight="100vh"
    >
      <NavBar />
      <Box sx={{ flex: "1 0 auto", margin: "50px 60px" }}>
        <Grid container>
          {borrowBook.length === 0 ? (
            <Grid item xs={8}>
              <Box fontWeight="bold" fontSize="20px" marginBottom="10px">
                Order
              </Box>
              <Box justifyItems="center" textAlign="center" padding="130px 0">
                <img
                  src="https://cdn-icons-png.freepik.com/512/1413/1413908.png"
                  alt="#"
                  width="15%"
                  height="15%"
                />
                <Box fontSize="30px">Your shopping cart is empty.</Box>
              </Box>
            </Grid>
          ) : (
            <Grid item xs={8}>
              <Box fontWeight="bold" fontSize="20px" marginBottom="10px">
                Order
              </Box>
              <Box sx={{ backgroundColor: "white" }} padding="10px">
                <Grid
                  container
                  margin="10px 0"
                  alignItems="center"
                  // spacing={2}
                >
                  <Grid item xs={6} textAlign="center" fontWeight="bold">
                    Item
                  </Grid>
                  <Grid item xs={2} textAlign="center" fontWeight="bold">
                    Item Price
                  </Grid>
                  <Grid item xs={2} textAlign="center" fontWeight="bold">
                    Quantity
                  </Grid>
                  <Grid item xs={2} textAlign="center" fontWeight="bold">
                    Total Price
                  </Grid>
                </Grid>
                <Divider />
                {borrowBook.map((ele, id) => (
                  <Grid key={id} container margin="20px 0" alignItems="center">
                    <Grid
                      item
                      xs={6}
                      justifyContent="center"
                      alignContent="center"
                    >
                      <Grid container>
                        <Grid item xs={3} alignContent="center">
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
                              fontSize="17px"
                              marginBottom="10px"
                            >
                              {ele.title}
                            </Box>
                          </Link>
                          <Box display="flex">
                            <Button size="small">Edit</Button>
                            <Button
                              size="small"
                              onClick={() => handleRemoveBook(ele)}
                            >
                              Remove
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      justifyContent="center"
                      textAlign="center"
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        fontSize="17px"
                      >
                        <Typography fontWeight="bold">{ele.price}</Typography>
                        &nbsp;vnđ
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="17px"
                    >
                      <Button
                        onClick={() => handleIncrease(ele)}
                        sx={{ minWidth: "30px" }}
                      >
                        +
                      </Button>
                      {ele.cartQuantity}
                      <Button
                        sx={{ minWidth: "30px" }}
                        onClick={() => handleDecrease(ele)}
                      >
                        -
                      </Button>
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      justifyContent="center"
                      textAlign="center"
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        fontSize="17px"
                      >
                        <Typography fontWeight="bold">
                          {ele.price * ele.cartQuantity}
                        </Typography>
                        &nbsp;vnđ
                      </Box>
                    </Grid>
                  </Grid>
                ))}
                <Divider sx={{ mb: "10px" }} />
                <Button variant="contained" onClick={() => clearCart()}>
                  Clear Cart
                </Button>
              </Box>
            </Grid>
          )}
          <Grid item xs={1} />
          <Grid item xs={3}>
            <Box fontWeight="bold" fontSize="20px" marginBottom="10px">
              Payment Summary
            </Box>
            <Box sx={{ backgroundColor: "white" }} padding="20px">
              <Box
                display="flex"
                justifyContent="space-between"
                marginBottom="10px"
              >
                <Box fontWeight="bold">Items</Box>
                <Box>{totalQuantity}</Box>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                marginBottom="10px"
              >
                <Box fontWeight="bold">Promotion code</Box>
                <Box>code</Box>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                margin="20px 0"
              >
                <MUITextField label="COUPON CODE" />
                <MUIButton sx={{ ml: "20px", padding: "0 20px" }}>
                  Apply
                </MUIButton>
              </Box>
              <Divider sx={{ margin: "20px 0" }} />
              <Box
                display="flex"
                justifyContent="space-between"
                marginBottom="10px"
              >
                <Box fontWeight="bold">Order Summary</Box>
                <Box>${totalPrice}</Box>
              </Box>

              <Box
                display="flex"
                justifyContent="space-between"
                marginBottom="10px"
              >
                <Box fontWeight="bold">Additional Service</Box>
                <Box>$100</Box>
              </Box>
              <Divider sx={{ margin: "20px 0" }} />
              <Box
                display="flex"
                justifyContent="space-between"
                marginTop="10px"
              >
                <Box fontWeight="bold">Total Amount</Box>
                <Box>${totalPrice + 100}</Box>
              </Box>
            </Box>
            <Box textAlign="center" marginTop="10px">
              <Button sx={{ width: "80%" }} variant="contained">
                Place Order
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};
