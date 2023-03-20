import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { FlexBox } from "./FlexBox";
import { shades } from "../theme";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { green } from "@mui/material/colors";
import { logOut } from "../state/userSlice";
import { Badge, Chip, CircularProgress } from "@mui/material";
import { useContext, useState } from "react";
import { resolvePath } from "../utils/resolvePath";
import { STATUS } from "../utils/enums";
import { loadingContext } from "../context/LoadingContext";

const UserAvatar = ({ user, setEmailVerificationAlert }) => {
  return (
    <>
      {user?.verified ? (
        <Avatar src={resolvePath(user?.avatar?.url)} />
      ) : (
        <Chip
          sx={{ cursor: "pointer" }}
          avatar={<Avatar src={resolvePath(user?.avatar?.url)} />}
          label={
            <Badge
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setEmailVerificationAlert(true);
              }}
              badgeContent="Verify"
              sx={{
                "& .MuiBadge-badge": {
                  color: "#ff0000",
                  fontSize: "11px",
                },
                mt: "-1px",
                ml: "16px",
                mr: "10px",
              }}
            />
          }
          variant="outlined"
        />
      )}
    </>
  );
};

const UserAlphaticAvatar = ({ user, setEmailVerificationAlert }) => {
  return (
    <>
      {user?.verified ? (
        <Avatar
          sx={{
            bgcolor: green[500],
            color: "#fff !important",
          }}
        >
          {user.firstName[0].toUpperCase()}
        </Avatar>
      ) : (
        <Chip
          sx={{ cursor: "pointer" }}
          avatar={
            <Avatar
              sx={{
                bgcolor: green[500],
                color: "#fff !important",
              }}
            >
              {user.firstName[0].toUpperCase()}
            </Avatar>
          }
          label={
            <Badge
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setEmailVerificationAlert(true);
              }}
              badgeContent="Verify"
              sx={{
                "& .MuiBadge-badge": {
                  color: "#ff0000",
                  fontSize: "11px",
                },
                mt: "-1px",
                ml: "16px",
                mr: "10px",
              }}
            />
          }
          variant="outlined"
        />
      )}
    </>
  );
};

const UserSettings = ({ setEmailVerificationAlert }) => {
  const { user, status } = useSelector((state) => state.user, shallowEqual);

  const { toggleLoading } = useContext(loadingContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Button border={2}>
      {user ? (
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            {user?.avatar ? (
              <UserAvatar {...{ user, setEmailVerificationAlert }} />
            ) : (
              <UserAlphaticAvatar {...{ user, setEmailVerificationAlert }} />
            )}
          </IconButton>
        </Tooltip>
      ) : (
        <FlexBox
          sx={{
            columnGap: "10px",
            fontWeight: "bold",
          }}
        >
          <Link to="/signin">
            <Box cursor="pointer" fontSize="12px" padding="5px 10px">
              SIGN IN
            </Box>
          </Link>
          <Link to="/signup">
            <Box
              fontSize="12px"
              padding="5px 10px"
              borderRadius="25px"
              color="#fff"
              backgroundColor={shades.secondary[900]}
            >
              SIGN UP
            </Box>
          </Link>
        </FlexBox>
      )}
      <Menu
        sx={{
          "& ul": {
            padding: 0,
          },
          "> div": {
            borderRadius: "10px",
          },
        }}
        disableScrollLock={true}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              left: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {/* Email menu item */}
        <MenuItem
          sx={{
            borderBottom: `1px solid ${shades.secondary[300]}`,
            minWidth: "210px",
            padding: "8px 10px",
          }}
          onClick={handleCloseUserMenu}
        >
          <Link to="/account">
            <FlexBox justifyContent="space-between" gap="35px">
              <Box>
                <Typography fontWeight="bold" fontSize="13px">
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography color={shades.primary[300]} variant="small">
                  {user?.email}
                </Typography>
              </Box>
              <Box>
                <Button
                  sx={{
                    fontSize: "10px",
                    padding: 0,
                    color: "#fff",
                    borderRadius: "50px",
                    pt: "1px",
                    bgcolor: user?.verified ? "#40a0ed" : "#ff7300",
                    ":hover": {
                      bgcolor: user?.verified ? "#008cff" : "#ff5e00",
                    },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (!user?.verified) setEmailVerificationAlert(true);
                  }}
                >
                  {user?.verified ? "Verified" : "Verify"}
                </Button>
              </Box>
            </FlexBox>
          </Link>
        </MenuItem>

        {/* links */}
        <Box sx={{ borderBottom: `1px solid ${shades.secondary[300]}` }}>
          {status === STATUS.LOADING ? (
            <MenuItem
              sx={{
                p: "8px 10px",
              }}
            >
              <CircularProgress size="15px" />
            </MenuItem>
          ) : (
            <MenuItem
              onClick={() => {
                dispatch(
                  logOut({ toggleLoading, navigate, handleCloseUserMenu })
                );
              }}
              sx={{
                p: "8px 10px",
                fontSize: "13px",
              }}
            >
              Sign out
            </MenuItem>
          )}
        </Box>

        {/* footer menu items */}
        <FlexBox justifyContent="start" columnGap="10px" p="10px">
          {[
            { label: "Content policy", url: "policies/content-policy" },
            { label: "Terms", url: "/terms" },
            { label: "About", url: "/about" },
          ].map((node, idx) => (
            <Link key={idx} to={node.url} target="__blank">
              <Typography
                sx={{
                  cursor: "pointer",
                  fontSize: "12px",
                  color: shades.primary[300],
                }}
              >
                {node.label}
              </Typography>
            </Link>
          ))}
        </FlexBox>
      </Menu>
    </Button>
  );
};

export default UserSettings;
