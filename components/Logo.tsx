import React from "react";
import Typography from "./Typography";

const Logo = () => {
  return (
    <>
      <Typography
        as="span"
        fontSize={{ _: 3 }}
        fontWeight="700"
        fontColor="textSecondary"
        mx="2"
      >
        {"{"}
      </Typography>
      <Typography as="span" fontSize={{ _: 3 }} fontWeight="700" mx="2">
        JM
      </Typography>
      <Typography
        as="span"
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
