import { Divider, Typography } from "@mui/material";
import React from "react";
import { FlexBox } from "../../components/FlexBox";
import googleLogo from "../../assets/googleLogo.png";
import { shades } from "../../theme";
import { useDispatch } from "react-redux";
import { loginWithGoogle } from "../../state/userSlice";

const Oauth = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Divider
        sx={{
          my: "15px",
          width: "100%",
        }}
        color="red"
      >
        OR
      </Divider>
      <FlexBox
        onClick={() => dispatch(loginWithGoogle())}
        my="4px"
        width="100%"
        p="13px 15px"
        columnGap="15px"
        sx={{
          cursor: "pointer",
          border: `1px solid ${shades.primary[200]}`,
          borderRadius: "4px",
        }}
      >
        <img alt="logo" width="25px" src={googleLogo} />
        <Typography fontSize="15px" color={shades.primary[400]}>
          Continue with Google
        </Typography>
      </FlexBox>
    </>
  );
};

export default Oauth;
