import { Logout } from "@mui/icons-material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutRequest } from "../axios/ApiRequest";

export const ProfileCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutRequest(dispatch, navigate);
  };
  const { name, email } = JSON.parse(localStorage.getItem("user"));

  return (
    <Card sx={{ maxWidth: 300, textAlign: "center", paddingTop: "20px" }}>
      <IconButton>
        <Avatar sx={{ width: 100, height: 100, margin: "0 auto 10px" }} />
      </IconButton>
      {name && email && (
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {email}
          </Typography>
        </CardContent>
      )}
      <Divider />
      <CardActions>
        <Grid container sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Grid item xs={12}>
            <Button
              fullWidth
              sx={{ justifyContent: "flex-start", paddingLeft: "10%" }}
              color="primary"
            >
              <ListItemIcon>
                <AccountBoxIcon fontSize="small" />
                &nbsp; Profile
              </ListItemIcon>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              sx={{ justifyContent: "flex-start", paddingLeft: "10%" }}
            >
              <ListItemIcon>
                <AccountBoxIcon fontSize="small" />
                &nbsp; Account Settings
              </ListItemIcon>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              sx={{ justifyContent: "flex-start", paddingLeft: "10%" }}
              onClick={handleLogout}
            >
              <ListItemIcon>
                <Logout fontSize="small" />
                &nbsp; Log out
              </ListItemIcon>
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};
