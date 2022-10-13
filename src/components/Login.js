import { Grid, Container, Box, Button } from "@mui/material";
import React, { useContext } from "react";
import { Context } from "../index";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const Login = () => {
  const { auth } = useContext(Context);
  const loginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);

    console.log(user);
  };

  const loginGitHub = async () => {
    const provider = new GithubAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    console.log(user);
  };

  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50, marginTop: 20 }}
        alignItems="center"
        justifyContent="center"
      >
        <Grid container alignItems={"center"} direction={"column"}>
          <Box p={5}>
            <Button onClick={loginGoogle} variant="outlined">
              <img
                src="https://www.vectorlogo.zone/logos/google/google-icon.svg"
                height={"20px"}
              />
              <p>Continue with Google</p>
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
