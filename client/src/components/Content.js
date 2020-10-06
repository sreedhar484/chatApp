import { Box, Image, Text } from "@chakra-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Cookie from "js-cookie";
function Content(props) {
  const [arr, setarr] = useState([]);
  const history = useHistory();
  useEffect(() => {
    Axios.get("http://localhost:1234/user/chat")
      .then((res) => {
        let data3 = res.data;
        data3 = data3.map((data4) =>
          data4.sender === Cookie.get("userName")
            ? data4.reciever
            : data4.reciever === Cookie.get("userName")
            ? data4.sender
            : ""
        );

        Axios.get("http://localhost:1234/user")
          .then((res) => {
            let data1 = res.data;
            data1 = data1.filter((data) => {
              let data2 =
                data.type === "group" ? [...data.users][0].slice(",") : [];
              if (data.type === "user" && data._id !== Cookie.get("userId")) {
                if (data3.includes(data.userName)) {
                  return true;
                } else {
                  return false;
                }
              } else if (data2.includes(Cookie.get("userName"))) {
                return true;
              } else {
                return false;
              }
            });
            setarr(data1);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box mx="10px" h="auto">
      {arr.map((data, idx) => (
        <Box
          key={idx}
          h="60px"
          d="flex"
          mt="10px"
          p="5px"
          backgroundColor={data.type === "group" && "teal.300"}
          boxShadow=" 0 0 7px 2px rgba(0,0,0,0.12)"
          onClick={() => {
            Cookie.set("userClick", JSON.stringify(data));
            history.push("/main/id");
          }}
        >
          <Image
            border="1px solid black"
            borderRadius="50%"
            w="50px"
            h="50px"
            src={`http://localhost:1234/${data.userImage}`}
          />
          <Box ml={4}>
            <Text fontWeight="bold">{data.userName}</Text>
            <Text>good night</Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
export default Content;
