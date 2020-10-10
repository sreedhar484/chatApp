import logbackground from "../asserts/Logbackground.svg";
import {
  Box,
  Image,
  Input,
  FormControl,
  FormHelperText,
  Text,
  Button,
} from "@chakra-ui/core";
import Cookie from "js-cookie";
import Axios from "axios";
import { Redirect, Link } from "react-router-dom";
import React, { Component } from "react";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      password: "",
      errorum: "",
      errorpm: "",
      log: false,
      erroru: false,
      errorp: false,
    };
  }
  changeHandle = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  btnClick = (event) => {
    event.preventDefault();
    if (this.state.userName.length !== 0) {
      if (this.state.password.length !== 0) {
        Axios.post("/login", {
          userName: this.state.userName,
          password: this.state.password,
        })
          .then((res) => {
            console.log(res);
            if (res.data === "You don't have a account") {
              this.setState({ errorum: "incorrect username" });
            } else if (res.data === "Invalid credentials") {
              this.setState({ errorpm: "incorrect password", errorum: "" });
            } else {
              this.setState(
                { log: true, errorpm: "", userName: "", password: "" },
                () => {
                  Cookie.set("userName", res.data.userName);
                  Cookie.set("userId", res.data.userId);
                  Cookie.set("userImage", res.data.userImage);
                }
              );
            }
          })
          .catch((err) => console.log(err));
      } else {
        this.setState({ errorpm: "Please enter password", errorum: "" });
      }
    } else {
      this.setState({ errorum: "Please enter username" });
    }
  };
  render() {
    return (
      <Box
        d="flex"
        w="100%"
        flexDirection={["column", "column", "column", "row"]}
      >
        <Box
          w={["100%", "100%", "100%", "64%"]}
          h={["40%", "40%", "40%", "100%"]}
        >
          <Box
            py={["22%", "22%", "22%", "34%"]}
            px={["15%", "20%", "30%", "35%"]}
          >
            <Text
              fontSize="30px"
              w={["244px", "244px", "244px", "349px"]}
              h={["74px", "74px", "74px", "104px"]}
            >
              NANDU
            </Text>
          </Box>
        </Box>
        <Box
          backgroundColor="#112147"
          w={["100%", "100%", "100%", "36%"]}
          h={["60%", "60%", "60%", "100%"]}
          color="white"
        >
          <Box
            h="60%"
            d={["none", "none", "none", "flex"]}
            justifyContent="flex-end"
          >
            <Image src={logbackground} alt="background" float="right"></Image>
          </Box>
          <Box mx={["25px", "25px", "25px", "40px"]}>
            <form onSubmit={this.btnClick}>
              <Text
                fontSize="30px"
                color="#7EAACD"
                fontWeight="bold"
                letterSpacing="1.2px"
                mt="20%"
              >
                LOGIN
              </Text>
              <FormControl mt="12%">
                <Input
                  variant="flushed"
                  type="text"
                  placeholder="USER NAME"
                  name="userName"
                  value={this.state.userName}
                  onChange={this.changeHandle}
                  borderColor={
                    this.state.erroru ? "crimson" : "rgba(255,255,255,0.24)"
                  }
                  focusBorderColor={this.state.erroru ? "crimson" : "#2A69AC"}
                ></Input>
                <FormHelperText color="red.500">
                  {this.state.errorum}
                </FormHelperText>
              </FormControl>
              <FormControl mt="14%">
                <Input
                  type="password"
                  variant="flushed"
                  placeholder="PASSWORD"
                  name="password"
                  value={this.state.password}
                  onChange={this.changeHandle}
                  borderColor={
                    this.state.errorp ? "crimson" : "rgba(255,255,255,0.24)"
                  }
                  focusBorderColor={this.state.errorp ? "crimson" : "#2A69AC"}
                ></Input>
                <FormHelperText color="red.500">
                  {this.state.errorpm}
                </FormHelperText>
              </FormControl>
              {this.state.log ? (
                <Redirect to="/main" />
              ) : (
                <Button
                  type="submit"
                  mt="14%"
                  backgroundColor="white"
                  fontFamily="Rubik-Regular"
                  fontSize="18px"
                  color="#112147"
                  borderRadius="4px"
                  width="114px"
                  h="44px"
                >
                  Login
                </Button>
              )}
            </form>
            <Link to="/register">
              <Text mb="16%">Don't have an account</Text>
            </Link>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Login;
