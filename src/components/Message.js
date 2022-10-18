import React, { useContext, useState } from "react";
import { Grid, Avatar, Button, AppBar, Typography } from "@mui/material/";
import { collection, addDoc, query, orderBy, limit } from "firebase/firestore";
import { Context } from "../index";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

export default function Message() {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [messager, setMessager] = useState(null);
  const [document, loading] = useCollectionData(
    query(collection(firestore, "docList"), orderBy("createAt", "asc"))
  );

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={2}
    >
      {document?.map((doc) => (
        <>
          <Grid
            item
            container
            style={{
              marginTop: 20,
              background: "##343434",
              color: "white",
              height: "100%",
            }}
          >
            <Avatar src={doc.photoURL} />
            <Typography gutterBottom variant="subtitle1" component="div">
              <p>
                <span>{doc.Name}</span>
              </p>
            </Typography>
          </Grid>
        </>
      ))}
    </Stack>
  );
}
