import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ColorLensIcon from "@mui/icons-material/ColorLens";

import { orange } from "@mui/material/colors";
import IntlMessages from "../../utility/IntlMessages";
import { LayoutType } from "../../../shared/constants/AppEnums";
import { useLayoutContext } from "../../utility/AppContextProvider/LayoutContextProvider";
import AppScrollbar from "../AppScrollbar";
import ThemeColors from "./ThemeColors";
import ThemeFooter from "./ThemeFooter";
import ThemeModes from "./ThemeModes";
import ThemeDirection from "./ThemeDirection";
import SidebarSettings from "./SidebarSettings";
import NavStyles from "./NavStyles";
import LayoutTypes from "./LayoutTypes";
import ThemeHeader from "./ThemeHeader";

const AppThemeSetting = () => {
  const [isSettingOpen, setSettingOpen] = useState(false);
  const [isColorSettingOpen, setColorSettingOpen] = useState(false);
  const { layoutType } = useLayoutContext();
  return (
    <span></span>
  );
};

export default AppThemeSetting;
