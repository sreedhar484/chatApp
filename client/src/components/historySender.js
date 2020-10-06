import React from "react";
import { useHistory } from "react-router-dom";
function historySender(path) {
  const history = useHistory();
  return history.push(path);
}

export default historySender;
