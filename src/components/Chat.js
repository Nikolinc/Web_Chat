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
          <Input
            type="file"
            variant={"outlined"}
            accept="image/*"
            placeholder="none"
            onChange={(e) => {
              setFiles(e.target.files);
              console.log(e.target.files);
              setFileBool(true);
            }}
            style={{
              color: "#fff",
              borderColor: "#343434",
              borderRadius: "10px",
            }}
          >
            <img
              src={
                "https://github.com/Nikolinc/Web_Chat/blob/main/src/assets/file.png?raw=true"
              }
              width="25px"
              size="100px"
              draggable="false"
            />
          </Input>
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
  );
};

function Content(props) {
  if (props.message.image === undefined) {
    return <div>{props.message.text}</div>;
  } else
    return (
      <>
        <div>{props.message.text}</div>
        <img src={props.message.image} size="100" width="250px" />
      </>
    );
}

export default Chat;
