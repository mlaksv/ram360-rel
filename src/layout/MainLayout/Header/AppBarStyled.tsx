// material-ui
import { styled, Theme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";

// project import
import { drawerWidth } from "config";

// ==============================|| HEADER - APP BAR STYLED ||============================== //
interface AppBarStyledProps extends Partial<typeof AppBar> {
  open?: boolean;
}
const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarStyledProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default AppBarStyled;
