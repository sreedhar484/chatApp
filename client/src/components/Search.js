import { Box, Input, Image, Text } from "@chakra-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import Cookie from "js-cookie";
function Search(props) {
  const history = useHistory();
  const [users, setusers] = useState([]);
  const [search1, setSearch] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:1234/user")
      .then((res) => {
        let data = res.data;
        data = data.filter((data) => data._id !== Cookie.get("userId") && data.type==="user");
        setusers(data);
        setSearch(data);
      })
      .catch((err) => console.log(err));
  }, []);
  const onSearch = (e) => {
    let search = e.target.value;
    let arr1 = [];
    if (search.length > 0) {
      arr1 = users.filter((ele) =>
        ele.userName.toLowerCase().startsWith(search.toLowerCase())
      );
      setusers(arr1);
    } else {
      setusers(search1);
    }
  };
  return (
    <Box>
      <Box
        d="flex"
        px="10px"
        justifyContent="flex-start"
        h={["50px", "50px", "50px", "80px"]}
        w="100%"
        backgroundColor="#112147"
      >
        <Box mt="10px">
          <BsArrowLeftShort
            color="white"
            size="30px"
            onClick={() => history.push("/main")}
          />
        </Box>
        <Input
          variant="unstyled"
          ml="20px"
          color="white"
          placeholder="Search here"
          onChange={onSearch}
        />
      </Box>
      <Box mx="10px" h="auto">
        {users.map((data, idx) => (
          <Box
            key={idx}
            h="60px"
            d="flex"
            mt="10px"
            p="5px"
            onClick={() => {
              Cookie.set("userClick", JSON.stringify(data));
              return history.push("/main/id");
            }}
            boxShadow=" 0 0 7px 2px rgba(0,0,0,0.12)"
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
              <Text>message</Text>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Search;
