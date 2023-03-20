import { Box, Stack } from "@mui/material";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Deactivate from "./deactivateAccount/Deactivate";
import DeleteAccount from "./deleteAccount/DeleteAccount";
import LeftPanel from "./LeftPanel";
import logo from "../../assets/smallLogo.svg";

const Profile = () => {
  const { user, status } = useSelector((state) => state.user, shallowEqual);
  return (
    <>
      <Stack alignItems="center" mt={3}>
        <Link to="/">
          <img
            style={{ width: "100px", marginBottom: "20px" }}
            src={logo}
            alt="logo"
          />
        </Link>
      </Stack>
      {user && (
        <Box
          // border={1}
          gap="40px"
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          margin="auto"
          padding="20px"
          maxWidth="1100px"
          justifyContent="space-between"
        >
          {/* -----------left panel--------- */}

          <LeftPanel user={user} status={status} />

          {/* right side */}
          <Box flex={4}>
            <Deactivate status={status} />

            <DeleteAccount user={user} status={status} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Profile;
