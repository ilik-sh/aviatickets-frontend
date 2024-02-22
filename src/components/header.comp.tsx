import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { signOut } from "aviatickets-submodule/auth/store/auth.actions";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { RootState } from "store";
import { authSelector } from "aviatickets-submodule/auth/store/auth.selector";
import {
  AuthModulePagePaths,
  TicketsModulePagePaths,
  UserModulePagePaths,
} from "enums/page-paths.enum";
import { enqueueSnackbar } from "notistack";
import { isatty } from "tty";

const TypographyLogo = styled(Typography)({
  cursor: "pointer",
});

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isAuth } = useAppSelector(authSelector);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (isAuth) {
      return setAnchorEl(event.currentTarget);
    }
    navigate(AuthModulePagePaths.SignIn);
  };

  const handleLogoClicked = (event: React.MouseEvent<HTMLElement>) => {
    navigate(TicketsModulePagePaths.SearchTickets);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    handleMenuClose();
    const response = await dispatch(signOut());
    if (response.meta.requestStatus == "fulfilled") {
      enqueueSnackbar("Successfully signed out", { variant: "success" });
      navigate(AuthModulePagePaths.SignIn);
    }
  };

  const hanldePasswordChange = () => {
    handleMenuClose();
    navigate(AuthModulePagePaths.ChangePassword);
  };

  const handleBookings = () => {
    handleMenuClose();
    navigate(UserModulePagePaths.Bookings);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={hanldePasswordChange}>Change password</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <TypographyLogo variant="h6" noWrap onClick={handleLogoClicked}>
            AviaTickets
          </TypographyLogo>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex" }}>
            {isAuth ? (
              <IconButton size="large" color="inherit" onClick={handleBookings}>
                <AirplaneTicketIcon />
              </IconButton>
            ) : null}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Header;
