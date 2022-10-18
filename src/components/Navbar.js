import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Grid, Avatar, Button, AppBar, Toolbar } from "@mui/material/";
import { LOGIN_ROUTES } from "../utils/const";
import { Context } from "../index";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  return (
    <AppBar
      position="static"
      style={{ background: "rgb(54, 54, 54)", paddingButton: "5px" }}
    >
      <Toolbar variant={"dense"} sx={{ flexGrow: 2 }}>
        <Grid container spacing={2} minHeight={55}>
          {user ? (
            <>
              <Grid
                xs
                display="flex"
                justifyContent="flex-start"
                alignItems="flex-end"
                style={{ marginleft: "50px" }}
              >
                <Avatar src={user.photoURL} alt={user.displayName} />
              </Grid>
              <Grid
                xs
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
                style={{ marginRight: "50px" }}
              >
                <Button
                  onClick={() => auth.signOut()}
                  variant="outlined"
                  style={{ color: "lightgray" }}
                >
                  Go out
                </Button>
              </Grid>
            </>
          ) : (
            <Grid
              xs
              display="flex"
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <NavLink to={LOGIN_ROUTES}>
                <Button variant="outlined" style={{ color: "lightgray" }}>
                  Login
                </Button>
              </NavLink>
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
