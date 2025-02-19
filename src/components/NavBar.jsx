import { useTheme } from "@emotion/react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../context/Theme";
import { ProfileCard } from "./ProfileCard";
import SideBar from "./SideBar";
import { Search } from "./common/SearchBar/Search";
import { SearchIconWrapper } from "./common/SearchBar/SearchIconWrapper";
import { StyledInputBase } from "./common/SearchBar/StyleInputBased";
import { useQuery } from "@tanstack/react-query";
import { UserService } from "../services/User.service";

export const NavBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState(null);
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const profileRef = React.useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpen = (open) => () => {
    setOpen(open);
  };
  const handleOpenUserMenu = (event) => {
    setProfileOpen((prev) => !prev);
  };
  const { borrowBook } = useSelector((state) => state.borrowReducer);

  const handleShoppingCart = () => {
    navigate("/ShoppingCartBook");
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      refetch();
      navigate("/BookList");
    }
  };
  const handleChange = (value) => {
    setQuery(value);
  };
  const { data, refetch } = useQuery({
    queryKey: ["searchBook", query],
    queryFn: async () => {
      const response = await UserService.searchBook(query);
      // console.log("response:", response);
      return response;
    },
    enabled: false,
  });

  return (
    <Box>
      <AppBar position="relative" sx={{ backgroundColor: colors.primary[400] }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 3 }}
            onClick={handleOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          {open && <SideBar open={open} handleOpen={handleOpen} />}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontSize: 30 }}
          >
            LIBRARY
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",

              "& > :not(style) ~ :not(style)": {
                ml: 2,
              },
            }}
          >
            <Box fontSize="20px">
              <Link
                to="/Home"
                style={{ color: "white", textDecoration: "none" }}
              >
                Home
              </Link>
            </Box>
            <Box fontSize="20px">
              <Link
                to="/BookList"
                style={{ color: "white", textDecoration: "none" }}
              >
                BookList
              </Link>
            </Box>
            <Box fontSize="20px">
              <Link
                to="/MyBook"
                style={{ color: "white", textDecoration: "none" }}
              >
                MyBook ({borrowBook.length || 0})
              </Link>
            </Box>
          </Box>

          <Search value={query} onChange={(e) => handleChange(e.target.value)}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onKeyDown={handleKey}
              sx={{ width: "40ch" }}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          {/* <Box display="flex" alignContent="center"> */}

          <IconButton
            sx={{ p: 1 }}
            color="inherit"
            onClick={handleShoppingCart}
          >
            <ShoppingCartOutlinedIcon />
          </IconButton>
          <Tooltip>
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ p: 0 }}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      {profileOpen && (
        <Box
          ref={profileRef}
          sx={{ position: "absolute", right: 10, zIndex: 1 }}
        >
          <ProfileCard />
        </Box>
      )}
    </Box>
  );
};
