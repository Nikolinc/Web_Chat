import React, { useContext, useState } from "react";
import { Context } from "../index";
import { useAuthState } from "react-firebase-hooks/auth";
import { Grid, Container, TextField, Button, Avatar } from "@mui/material";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Loader from "./Loader";
import { Timestamp, FieldValue } from "firebase/firestore";
import { collection, addDoc, query,orderBy } from "firebase/firestore";
import { doc } from "firebase/firestore";

const Chat = () => {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState("");
  const [messages, loading] = useCollectionData(
    query(collection(firestore, "messeges",orderBy("createAt")))
  );

  const setMessage = async () => {
    addDoc(collection(firestore, "messeges"), {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      createAt: FieldValue | Timestamp | Date,
    });
    setValue("");
    
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50, marginTop: 20 }}
        justifyContent="center"
      >
        <div
          style={{
            width: "90%",
            height: "78vh",
            border: "1px solid black",
            overflow: "auto",
          }}
        >
          {messages.map((message) => (
            <div
              style={{
                margin: 10,
                border:
                  user.uid === message.uid
                    ? "2px solid green"
                    : "2px dashed red",
                marginLeft: user.uid === message.uid ? "auto" : "10px",

                padding: 5,
              }}
            >
              <Grid container>
                <Avatar src={message.photoURL} />
                <div>{message.displayName}</div>
              </Grid>
              <div>{message.text}</div>
            </div>
          ))}
        </div>
        <Grid
          container
          direction={"column"}
          alignItems={"flex-end"}
          style={{ width: "90%" }}
        >
          <TextField
            fullWidth
            maxRows={2}
            variant={"outlined"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button variant={"outlined"} onClick={() => setMessage()}>
            Send
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
