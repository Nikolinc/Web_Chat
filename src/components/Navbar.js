import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { LOGIN_ROUTES } from "../utils/const";
import { Context } from "../index";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  return (
    <AppBar position="static" style={{ background: "rgb(54, 54, 54)" }}>
      <Toolbar variant={"dense"}>
        <Grid
          ccontainer
          direction={"row-reverse"}
          justify={"flex-end"}
          alignItems={"center"}
        >
          {" "}
          {user ? (
            <Button
              onClick={() => auth.signOut()}
              variant="outlined"
              style={{ color: "lightgray" }}
            >
              Go out
            </Button>
          ) : (
            <NavLink to={LOGIN_ROUTES}>
              <Button variant="outlined" style={{ color: "lightgray" }}>
                Login
              </Button>
            </NavLink>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
