import { Box, Stack, Text } from "@chakra-ui/core";
import React from "react";
import Header from "../components/Header";
import Content from "./Content";
import Search from "./Search";
import Login from "./Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ContactDetails from "./ContactDetails";
import Register from "./Register";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewGroup from "./NewGroup";
function Main() {
  return (
    <Box>
      <Stack spacing={8}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/main">
              <Header />
              <Content />
            </Route>
            <Route exact path="/search">
              <Search />
            </Route>
            <Route exact path="/main/id">
              <ContactDetails />
            </Route>
            <Route exact path="/newgroup">
              <NewGroup/>
            </Route>
            <Route
              path="*"
              component={() => (
                <Text
                  textAlign="center"
                  color="red.500"
                  fontSize={["30px", "30px", "35px", "40px"]}
                >
                  404 Page Not Found
                </Text>
              )}
            ></Route>
          </Switch>
        </Router>
      </Stack>
    </Box>
  );
}

export default Main;
