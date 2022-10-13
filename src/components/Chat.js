import React, { useContext, useState } from "react";
import { Context } from "../index";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Grid,
  Container,
  TextField,
  Button,
  Avatar,
  radioClasses,
} from "@mui/material";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Loader from "./Loader";
import { Timestamp, FieldValue } from "firebase/firestore";
import { collection, addDoc, query, orderBy } from "firebase/firestore";

const Chat = () => {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState("");
  const [messages, loading] = useCollectionData(
    query(collection(firestore, "messeges"), orderBy("createAt"))
  );

  const setMessage = async () => {
    addDoc(collection(firestore, "messeges"), {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      createAt: Date(),
    });
    setValue("");
    console.log(FieldValue);
    console.log(Date());
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <Container>
      <Grid
        container
        style={{
          height: window.innerHeight - 50,
          marginTop: 20,
          overflow: "hidden",
        }}
        justifyContent="center"
      >
        <div
          style={{
            width: "80%",
            height: "78vh",
            //border: "1px solid black",
            overflow: "auto",
          }}
        >
          {messages.map((message) => (
            <div
              style={{
                width: "250px",
                margin: 10,
                background: "#333",
                marginLeft: user.uid === message.uid ? "auto" : "10px",
                color: "white",
                borderRadius:
                  user.uid === message.uid
                    ? "10px 0px 10px 10px"
                    : "0px 10px 10px 10px",
                padding: 5,
                justifyContent:
                  user.uid === message.uid ? "flex-end" : "flex-start",
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
          component="form"
          //direction={"row-reverse"}
          //alignItems={"flex-end"}
          flexWrap={"nowrap"}
          style={{ width: "90%", height: "6%" }}
        >
          <TextField
            id="standard-basic"
            variant="outlined"
            fullWidth
            maxRows={2}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ background: "#333", borderRadius: "5px", color: "white" }}
          />
          <Button
            variant={"outlined"}
            onClick={() => {
              if (value !== "" && value < 255) setMessage();
            }}
            style={{ color: "#fff", borderColor: "#fff", width: "15%" }}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
