import { ThemeProps } from "@/packages/core/theme/themeProvider/themeProvider";
import { css, SerializedStyles } from "@emotion/react";
import {
  ButtonBaseProps,
  ButtonPropsSize,
} from "./ButtonBase";

const RUI_BUTTON_BASE = "RuiButtonBase";

const mergeNameTargetComponent = (chain: string): string => {
  return `${RUI_BUTTON_BASE}${chain}`;
};

export const generateButtonBaseClassNames = (props: {
  root: boolean;
  disableElevation?: boolean;
  size?: ButtonPropsSize;
  fullWidth?: boolean;
}) => {
  const _props: { [key: string]: boolean | string } = props;
  return Object.keys(props)
    .reduce((prevClasses: any, key: any) => {
      if (_props[key]) {
        if (
          key === "size"
        ) {
          return [...prevClasses, classNames[key](_props[key])];
        }
        return [...prevClasses, classNames[key]];
      }
      return prevClasses;
    }, [])
    .join(" ");
};

const classNames: { [key: string]: string | any } = {
  root: mergeNameTargetComponent("Root"),
  fullWidth: mergeNameTargetComponent("FullWidth"),
  disableElevation: mergeNameTargetComponent("DisableElevation"),
  size: (value: ButtonPropsSize): string =>
    value && mergeNameTargetComponent(`Size${value.toUpperCase()}`),
};

const getButtonBaseCss = (
  theme: ThemeProps,
  props: ButtonBaseProps
): SerializedStyles => css`
  &.${classNames.root} {
    min-width: 64px;
  }
  &.${classNames.size(props.size)} {
    ${theme.components.button.sizes[
      props.size as NonNullable<keyof typeof theme.components.button.sizes>
    ](theme)};
  }
  &.${classNames.fullWidth} {
    width: 100%;
  }
  ${props.disableElevation &&
  `
  &.${classNames.disableElevation} {
    box-shadow: none;
  }
  `}
`;

export default getButtonBaseCss;
