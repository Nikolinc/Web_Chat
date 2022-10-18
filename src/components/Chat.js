import React, { useContext, useState } from "react";
import { Context } from "../index";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useAuthState } from "react-firebase-hooks/auth";
import "../../node_modules/video-react/dist/video-react.css";

import {
  Grid,
  Container,
  TextField,
  Button,
  Avatar,
  radioClasses,
  Box,
} from "@mui/material";
import { Input } from "@mui/material";
import Fab from "@mui/material/Fab";
import imageIcon from "@mui/icons-material/MoveToInbox";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Loader from "./Loader";
import { FieldValue } from "firebase/firestore";
import { collection, addDoc, query, orderBy } from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
} from "firebase/storage";
import { Player } from "video-react";
import Message from "./Message";

const Chat = () => {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState("");
  const [fileBool, setFileBool] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [percent, setPercent] = useState(0);
  const [cFiles, setFiles] = useState([]);
  const [messages, loading] = useCollectionData(
    query(collection(firestore, "messeges"), orderBy("createAt", "asc"))
  );
  const setMessage = async () => {
    if (value.split(" ").join("") !== "" && value.length < 255) {
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
    }
  };

  const handleImageChange = async () => {
    if (cFiles.length > 0) {
      const storage = getStorage();
      const storageRef = ref(storage, `files/${cFiles[0].name}`);
      console.log(storageRef);
      const uploadTask = uploadBytesResumable(storageRef, cFiles[0]);
      console.log(uploadTask);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            addDoc(collection(firestore, "messeges"), {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
              text: value,
              image: url,
              createAt: Date(),
            });
            console.log(url);
          });
        }
      );
    } else this.formData.image = "";
    setFileBool(false);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    height: "100%",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  if (loading) {
    return <Loader />;
  }
  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={3}
        md={3}
        display="flex"
        justifyContent="flex-start"
        style={{ height: "100vh", width: "10%" }}
      >
        <Container style={{ background: "#343434" }}>
          <Message />
        </Container>
      </Grid>
      <Grid xs={8} md={8}>
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
              {messages?.map((message) => (
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
                  <Content message={message} />
                </div>
              ))}
            </div>
            <Grid
              container
              component="form"
              //direction={"row-reverse"}
              //alignItems={"flex-end"}
              flexWrap={"nowrap"}
              style={{
                background: "#343434",
                width: "70%",
                height: "4%",
                borderRadius: "10px",
              }}
            >
              <div className="file-input">
                <Input
                  type="file"
                  name="file-input"
                  id="file-input"
                  class="file-input__input"
                  onChange={(e) => {
                    setFiles(e.target.files);
                    console.log(e.target.files);
                    setFileBool(true);
                  }}
                />
                <label
                  class="file-input__label"
                  for="file-input"
                  type="file"
                  accept="image/*"
                >
                  <img
                    src="https://github.com/Nikolinc/Web_Chat/blob/main/src/assets/file.png?raw=true"
                    height="30px"
                  />
                </label>
              </div>

              <TextField
                id="standard-basic"
                variant="outlined"
                fullWidth
                label={fileBool ? "one image" : ""}
                maxRows={2}
                size="small"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                style={{
                  background: "#343434",
                  borderColor: "#343434",
                  color: "white",
                }}
              />
              <Button
                variant={"outlined"}
                onClick={() => {
                  fileBool ? handleImageChange() : setMessage();
                }}
                style={{ color: "#fff", borderColor: "#343434", width: "15%" }}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
};

function Content(props) {
  if (props.message.image === undefined) {
    return (
      <div>
        <p>
          <span>{props.message.text}</span>
        </p>
      </div>
    );
  } else if (
    props.message.image.includes(".mp4") ||
    props.message.image.includes(".avi")
  ) {
    return (
      <>
        <div>
          <p>
            <span>{props.message.text}</span>
          </p>
        </div>
        <Player
          playsInline
          src={props.message.image}
          width={250}
          autoPlay={true}
        />
      </>
    );
  } else
    return (
      <>
        <div>
          <p>
            <span>{props.message.text}</span>
          </p>
        </div>
        <a href={props.message.image} target="_blank">
          <img src={props.message.image} size="100" width="250px" />
        </a>
      </>
    );
}

export default Chat;
