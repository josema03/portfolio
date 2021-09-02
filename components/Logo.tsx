import React from "react";
import Typography from "./Typography";

const Logo = () => {
  return (
    <>
      <Typography
        renderAs="span"
        fontSize={{ _: 3 }}
        fontWeight="700"
        fontColor="textSecondary"
        mx="2"
      >
        {"{"}
      </Typography>
      <Typography renderAs="span" fontSize={{ _: 3 }} fontWeight="700" mx="2">
        JM
      </Typography>
      <Typography
        renderAs="span"
        fontSize={{ _: 3 }}
        fontWeight="700"
        fontColor="textSecondary"
        mx="2"
      >
        {"}"}
      </Typography>
    </>
  );
};

export default Logo;
