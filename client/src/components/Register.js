import logo from "../asserts/Loglogo.svg";
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
import Axios from "axios";
import { Redirect, Link } from "react-router-dom";
import React, { Component } from "react";

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      password: "",
      password1: "",
      erroru: false,
      errorp: false,
      errorp1: false,
      errorum: "",
      errorpm: "",
      errorpm1: "",
      reg: false,
      file: null,
    };
  }
  changeHandle = (event) => {
    this.setState({ [event.target.name]: event.target.value})
  };
  changeHandle1 = (event) => {
    this.setState({ [event.target.name]: event.target.files[0] });
  };
  btnClick1 = (event) => {
    event.preventDefault();
    if (this.state.userName.length !== 0) {
      if (this.state.password.length !== 0) {
        if (this.state.password1.length !== 0) {
          const formData = new FormData();
          formData.append("userName", this.state.userName);
          formData.append("pwd1", this.state.password);
          formData.append("pwd2", this.state.password1);
          formData.append("users", null);
          formData.append("type", "user");
          formData.append("userImage", this.state.file);
          console.log(formData)
          Axios.post("http://localhost:1234/register",formData)
            .then((res) => {
              console.log(res.data);
              if (res.data === "Password doesn't match") {
                this.setState({
                  errorpm1: "incorrect username",
                  errorum: "",
                  errorpm: "",
                  userName: "",
                  password: "",
                  password1: "",
                });
              } else {
                this.setState({ reg: true, errorpm1: "" });
              }
            })
            .catch((err) => console.log(err));
        } else {
          this.setState({ errorpm1: "Please confirm password", errorpm: "" });
        }
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
            <Image
              src={logo}
              alt="logo"
              w={["244px", "244px", "244px", "349px"]}
              h={["74px", "74px", "74px", "104px"]}
            />
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
            <form onSubmit={this.btnClick1}>
              <Text
                fontSize="30px"
                // fontFamily="NotoSansJP-Bold"
                color="#7EAACD"
                fontWeight="bold"
                letterSpacing="1.2px"
                mt="20%"
              >
                REGISTER
              </Text>
              <FormControl mt="6%">
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
              <FormControl mt="7%">
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
              <FormControl mt="7%">
                <Input
                  type="password"
                  variant="flushed"
                  placeholder="CONFIRM PASSWORD"
                  name="password1"
                  value={this.state.password1}
                  onChange={this.changeHandle}
                  borderColor={
                    this.state.errorp1 ? "crimson" : "rgba(255,255,255,0.24)"
                  }
                  focusBorderColor={this.state.errorp1 ? "crimson" : "#2A69AC"}
                ></Input>
                <FormHelperText color="red.500">
                  {this.state.errorpm1}
                </FormHelperText>
              </FormControl>
              <Input
                type="file"
                name="file"
                variant="flushed"
                backgroundColor="#112147"
                onChange={this.changeHandle1}
              />
              {this.state.reg ? (
                <Redirect to="/" />
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
                  REGISTER
                </Button>
              )}
            </form>
            <Link to="/">
              <Text mb="16%">Already have an account</Text>
            </Link>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Register;
