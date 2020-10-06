import { Box, Button, Input, PseudoBox } from "@chakra-ui/core";
import Axios from "axios";
import React, { useState } from "react";
import { AiOutlineSend, AiOutlineAudio } from "react-icons/ai";
import { GrAttachment, GrEmoji } from "react-icons/gr";
import Cookie from "js-cookie";
import "../App.css";
import moment from "moment";
function BottomInput(props) {
  const [msg, setmsg] = useState("");
  const [msgStatus, setmsgStatus] = useState(false);
  const changeHandle = (event) => {
    setmsg(event.target.value);
    if (msg.length !== 0) {
      setmsgStatus(true);
    } else {
      setmsgStatus(false);
    }
  };
  const userClick = JSON.parse(Cookie.get("userClick"));
  const onSend = () => {
    console.log("hello");
    Axios.post(`http://localhost:1234/user/${Cookie.get("userId")}/chat`, {
      message: msg,
      sender: Cookie.get("userId"),
      reciever: userClick._id,
      timeNow: moment(),
    });
    Axios.post(`http://localhost:1234/user/${userClick._id}/chat`, {
      message: msg,
      sender: Cookie.get("userId"),
      reciever: userClick._id,
      timeNow: moment(),
    });
  };
  return (
    <div className="footer">
      <Box
        h={["40px", "40px", "50px", "60px"]}
        px="10px"
        backgroundColor="#E2E8F0"
        color="black"
        d="flex"
      >
        <Box py="5px">
          <GrEmoji size="30px" />
        </Box>
        <Input
          name="chatMessage"
          ml="3px"
          variant="unstyled"
          backgroundColor="#E2E8F0"
          color="black"
          placeholder="Type here"
          onChange={changeHandle}
        />
        <Box>
          {msg ? (
            <PseudoBox py="5px" d="flex" as={Button} onClick={onSend}>
              <AiOutlineSend size="25px" />
            </PseudoBox>
          ) : (
            <Box py="5px" d="flex">
              <GrAttachment size="25px" />
              <AiOutlineAudio size="25px" />
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default BottomInput;
