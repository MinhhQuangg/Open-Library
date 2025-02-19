import * as React from "react";

import { List } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../context/Theme";

const item1 = [
  { title: "About Us", href: "/AboutUs" },
  { title: "Term of services", href: "/TermOfServices" },
  { title: "Return to top", href: "#" },
];
const item2 = [
  { title: "Home", href: "/Home" },
  { title: "BookList", href: "/BookList" },
  { title: "Advanced Search", href: "/AdvancedSearch" },
  { title: "Genres", href: "/#" },
];
const item3 = [
  { title: "Help Center", href: "/HelpCenter" },
  { title: "Add book", href: "/AddBook" },
  { title: "Report problem", href: "/Reportproblem" },
];
export const Footer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box padding="20px 0" sx={{ backgroundColor: colors.primary[400] }}>
      <Box sx={{ pl: "20rem", pr: "10rem" }}>
        <Grid container spacing={3} columns={12} color="#fff" paddingTop="10px">
          <Grid item xs={4}>
            <Box fontWeight="bold">LIBRARY</Box>
            {item1.map((el) => (
              <List key={el.title}>
                <Link to={el.href} style={{ color: "white" }}>
                  {el.title}
                </Link>
              </List>
            ))}
          </Grid>
          <Grid item xs={4}>
            <Box fontWeight="bold">DISCOVER</Box>
            {item2.map((el) => (
              <List key={el.title}>
                <Link to={el.href} style={{ color: "white" }}>
                  {el.title}
                </Link>
              </List>
            ))}
          </Grid>
          <Grid item xs={4}>
            <Box fontWeight="bold">HELP</Box>
            {item3.map((el) => (
              <List key={el.title}>
                <Link to={el.href} style={{ color: "white" }}>
                  {el.title}
                </Link>
              </List>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
