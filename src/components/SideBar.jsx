import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import * as React from "react";
import { Link } from "react-router-dom";

export default function SideBar({ open, handleOpen }) {
  return (
    <Drawer open={open} onClose={handleOpen(false)}>
      <Box
        sx={{ width: 250, height: "100vh" }}
        role="presentation"
        onClick={handleOpen(false)}
        // boxShadow="0 0 8px #888888"
      >
        <Typography
          sx={{
            textAlign: "left",
            fontSize: "25px",
            pl: "15px",
            pt: "10px",
            fontWeight: "bold",
          }}
        >
          LIBRARY
        </Typography>
        <Divider />
        <ListItemButton
          sx={{
            textAlign: "left",
            fontSize: "16px",
            pl: "15px",
            pt: "15px",
            fontWeight: "bold",
          }}
          href="Home"
        >
          HOME
        </ListItemButton>
        <Divider />
        <Typography
          sx={{
            textAlign: "left",
            fontSize: "15px",
            pl: "15px",
            pt: "15px",
            fontWeight: "bold",
          }}
        >
          BROWSE
        </Typography>
        <Divider />
        <List>
          {["Book List", "My Book", "Authors"].map((text) => (
            <Link
              to={`/${text.replace(" ", "")}`}
              style={{ color: "black", textDecoration: "none" }}
              key={text}
            >
              <ListItem disablePadding sx={{ pl: "15px", pr: "15px" }}>
                <ListItemButton sx={{ padding: "15px" }}>{text}</ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Typography
          sx={{
            textAlign: "left",
            fontSize: "15px",
            pl: "15px",
            pt: "15px",
            fontWeight: "bold",
          }}
        >
          CONTRIBUTE
        </Typography>
        <Divider />
        <List>
          {["Add book", "Leave a comment", "Spam"].map((text) => (
            <Link
              to={`/${text.replace(" ", "")}`}
              style={{ color: "black", textDecoration: "none" }}
              key={text}
            >
              <ListItem disablePadding sx={{ pl: "15px", pr: "15px" }}>
                <ListItemButton sx={{ padding: "15px" }}>{text}</ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Typography
          sx={{
            textAlign: "left",
            fontSize: "15px",
            pl: "15px",
            pt: "15px",
            fontWeight: "bold",
          }}
        >
          RESOURCE
        </Typography>
        <Divider />
        <List>
          {["Help & Support", "Update Center"].map((text) => (
            <Link
              to={`/${text.replace(" ", "")}`}
              style={{ color: "black", textDecoration: "none" }}
              key={text}
            >
              <ListItem disablePadding sx={{ pl: "15px", pr: "15px" }}>
                <ListItemButton sx={{ padding: "15px" }}>{text}</ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
