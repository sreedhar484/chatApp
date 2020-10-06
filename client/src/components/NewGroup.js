import { Box, Input, Image, Text, Button, Checkbox, PseudoBox, Flex } from "@chakra-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import Cookie from "js-cookie";
import "../App.css"
function NewGroup() {
    const history = useHistory();
    const [users, setusers] = useState([]);
    const [search1, setSearch] = useState([]);
    const [groupName, setgroupName] = useState("")
    const [group, setgroup] = useState([])
    const [groupImage, setgroupImage] = useState(null)
    console.log(group)
    useEffect(() => {
      setgroup([...group, Cookie.get("userName")]);
      Axios.get("http://localhost:1234/user")
        .then((res) => {
          let data = res.data;
          data = data.filter((data) => data.userName !== Cookie.get("userName"));
          data = data.filter((data)=>data.type!=="group");
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
    const addGroup = (id)=>{
      let data = [...group];
        if(data.includes(id)){
            data.splice(data.indexOf(id),1);
            setgroup(data)
        }
        else{
           setgroup([...group, id]); 
        }
    }
    const groupAdd=()=>{
      const formData = new FormData();
      formData.append("userName", groupName);
      formData.append("pwd1", null);
      formData.append("users", group);
      formData.append("type", "group");
      formData.append("userImage", groupImage);
        Axios.post("http://localhost:1234/register",formData).then(res=>{console.log(res);history.push("/main")});
    }
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
        <Input type="file" onChange={(e) => setgroupImage(e.target.files[0])} />
        <Box
          d="flex"
          pr="10px"
          justifyContent="flex-start"
          h={["50px", "50px", "50px", "80px"]}
          w="100%"
        >
          <Input
            variant="flushed"
            ml="20px"
            placeholder="Enter Group Name"
            onChange={(e) => setgroupName(e.target.value)}
          />
          <Button onClick={groupAdd}>Create</Button>
        </Box>

        <Box mx="10px" h="auto">
          {users.map((data, idx) => (
            <PseudoBox
              as={Checkbox}
              key={idx}
              h="60px"
              mt="10px"
              d="flex"
              name={data.userName}
              p="5px"
              boxShadow=" 0 0 7px 2px rgba(0,0,0,0.12)"
              onChange={(e) => addGroup(e.target.name)}
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
            </PseudoBox>
          ))}
        </Box>
      </Box>
    );
}

export default NewGroup
