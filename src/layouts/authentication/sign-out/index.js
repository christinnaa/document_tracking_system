import React, { useEffect } from "react";
import { Cookies } from "react-cookie";

function Signout() {
  const cookies = new Cookies();

  useEffect(() => {
    cookies.remove("userId");
    cookies.remove("role");

    window.location.reload();
  });

  return <div />;
}

export default Signout;
