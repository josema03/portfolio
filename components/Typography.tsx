import React, { useContext } from "react";
import {
  Heading,
  HeadingProps,
  Text,
  TextProps,
} from "rebass/styled-components";
import { DefaultTheme, ThemeContext } from "styled-components";

interface CustomTypographyProps {
  heading?: boolean;
  fontColor?: keyof DefaultTheme["colors"];
}

const Typography = (
  props: React.PropsWithChildren<
    (HeadingProps | TextProps) & CustomTypographyProps
  > = { heading: false, fontColor: "textPrimary" }
) => {
  const { heading, fontColor, ...restProps } = { ...props };
  const theme = useContext(ThemeContext);

  if (props.heading) {
    return (
      <Heading
        {...restProps}
        fontFamily={theme.fontFamily.heading}
        color={theme.colors[fontColor || "textPrimary"]?.main}
      >
        {props.children}
      </Heading>
    );
  }
  return (
    <Text
      {...restProps}
      fontFamily={theme.fontFamily.body}
      color={theme.colors[fontColor || "textPrimary"]?.main}
    >
      {props.children}
    </Text>
  );
};

export default Typography;
