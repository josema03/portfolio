import { MotionProps } from "framer-motion";
import React, { useContext } from "react";
import { BaseProps, Text, TextProps } from "rebass/styled-components";
import { DefaultTheme, ThemeContext } from "styled-components";

interface CustomTypographyProps extends TextProps {
  fontColor?: keyof DefaultTheme["colors"];
  renderAs?: BaseProps["as"];
}

const Typography: React.FunctionComponent<CustomTypographyProps & MotionProps> =
  (props) => {
    const { fontColor, renderAs, ...restProps } = { ...props };
    const theme = useContext(ThemeContext);

    return (
      <Text
        {...restProps}
        as={renderAs || "div"}
        fontFamily={theme.fontFamily.body}
        color={
          typeof fontColor !== "undefined"
            ? theme.colors[fontColor]!.main
            : "inherit"
        }
      >
        {props.children}
      </Text>
    );
  };

export default Typography;
