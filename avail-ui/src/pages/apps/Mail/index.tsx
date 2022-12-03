import React, { useEffect } from "react";
import MailsList from "./MailsList";
import MailDetail from "./MailDetail";
import {
  onGetConnectionList,
  onGetFolderList,
  onGetLabelList,
} from "../../../redux/actions";
import { useDispatch } from "react-redux";
import AppsContainer from "../../../@crema/core/AppsContainer";
import MailSidebar from "./MailSideBar";
import { useIntl } from "react-intl";
import { Params, useParams } from "react-router-dom";
import clsx from "clsx";
import Box from "@mui/material/Box";

import { styled } from "@mui/material/styles";

const MailDetailViewWrapper = styled(Box)(({ theme }) => {
  return {
    transition: "all 0.5s ease",
    transform: "translateX(100%)",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
    opacity: 0,
    visibility: "hidden",
    backgroundColor: theme.palette.background.paper,
    "&.show": {
      transform: "translateX(0)",
      opacity: 1,
      visibility: "visible",
    },
  };
});

interface MailProps {}

const Mail: React.FC<MailProps> = () => {
  const dispatch = useDispatch();
  const { id } = useParams<Readonly<Params>>();

  useEffect(() => {
    dispatch(onGetLabelList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetFolderList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetConnectionList());
  }, [dispatch]);

  const { messages } = useIntl();

  return (
    <AppsContainer
      title={messages["mailApp.mail"] as string}
      sidebarContent={<MailSidebar />}
    >
      <MailsList />
      <MailDetailViewWrapper
        className={clsx({
          show: id,
        })}
      >
        <MailDetail />
      </MailDetailViewWrapper>
    </AppsContainer>
  );
};

export default Mail;
