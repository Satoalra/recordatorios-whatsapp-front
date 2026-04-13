import {
  Box,
  Divider,
  List,
  Stack,
  Toolbar,
  styled,
  type CSSObject,
  type Theme,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import {
  Dashboard,
  LogoutOutlined,
  Person,
  ContentPasteOutlined,
  FolderSharedOutlined,
  SchoolOutlined,
  PersonOutlined,
  KeyboardArrowLeftOutlined,
  KeyboardArrowRightOutlined,
} from "@mui/icons-material";
import AvatarStack from "./avatar-stack";
import SidebarButton from "./sidebar-button";
import SidebarMenuWithSubmenu from "./sidebar-menu-with-submenu";
import { useAuth } from "@contexts/auth-context";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: 80,
});

const CustomList = styled(List)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

const CustomDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export type SidebarProps = {
  open: boolean;
  onCollapse: () => void;
};

const Sidebar = ({ open, onCollapse }: SidebarProps) => {
  const { signOut } = useAuth();
  //const { hasPermission } = useAuthUser();

  return (
    <CustomDrawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: open ? "flex-start" : "center",
          alignItems: "center",
          padding: 2,
          gap: 1.5,
        }}
      >
        <Box
          component="img"
          src="/logo-mobile.png"
          alt="logo"
          sx={{
            width: open ? 40 : 40,
            height: "auto",
            transition: "width 0.3s ease",
            flexShrink: 0,
          }}
        />
        {open && (
          <Box
            sx={{
              fontSize: 24,
              fontWeight: 600,
              color: "text.primary",
              letterSpacing: 0.5,
            }}
          >
            IDEE
          </Box>
        )}
      </Toolbar>
      <Divider sx={{ mb: 2 }} />
      <AvatarStack open={open} />
      <CustomList>
        <SidebarButton
          label="Dashboard"
          open={open}
          to="/dashboard"
          icon={<Dashboard />}
        />
        <SidebarButton
          label="Clientes"
          open={open}
          to="/clinic-cases"
          icon={<ContentPasteOutlined />}
          childRoutes={["/clinic-cases/new", "/clinic-cases/"]}
          //canAccess={hasPermission("clinic-case", "read")}
        />
        <SidebarButton
          label="Servicios"
          open={open}
          to="/patients"
          icon={<FolderSharedOutlined />}
          childRoutes={["/patients/new", "/patients/"]}
          //canAccess={hasPermission("patient", "read")}
        />
        <SidebarButton
          label="Citas"
          open={open}
          to="/patients"
          icon={<FolderSharedOutlined />}
          childRoutes={["/patients/new", "/patients/"]}
          //canAccess={hasPermission("patient", "read")}
        />
        <SidebarButton
          label="Colaboradores"
          open={open}
          to="/patients"
          icon={<FolderSharedOutlined />}
          childRoutes={["/patients/new", "/patients/"]}
          //canAccess={hasPermission("patient", "read")}
        />
        <SidebarMenuWithSubmenu
          label="Usuarios"
          icon={<Person />}
          open={open}
          //canAccess={hasPermission("users", "read")}
          subItems={[
            {
              label: "Alumnos",
              to: "/users/students",
              icon: <SchoolOutlined />,
              childRoutes: ["/users/students"],
            },
            {
              label: "Todos",
              to: "/users",
              icon: <PersonOutlined />,
              childRoutes: ["/users/new", "/users/"],
            },
          ]}
        />
      </CustomList>
      <Divider sx={{ marginTop: "auto" }} />
      <Stack>
        <SidebarButton
          label={open ? "Contraer" : "Expandir"}
          open={open}
          onClick={onCollapse}
          icon={
            open ? (
              <KeyboardArrowLeftOutlined />
            ) : (
              <KeyboardArrowRightOutlined />
            )
          }
        />
        {/* TODO: Habilitar modo oscuro/claro cuando se implemente el toggle en el theme provider */}
        {/* <SidebarButton
          label={colorMode === "light" ? "Modo oscuro" : "Modo claro"}
          open={open}
          onClick={toggleColorMode}
          icon={
            colorMode === "light" ? <DarkModeOutlined /> : <LightModeOutlined />
          }
        /> */}
        <SidebarButton
          label="Cerrar sesión"
          open={open}
          onClick={() => signOut()}
          icon={<LogoutOutlined />}
        />
      </Stack>
    </CustomDrawer>
  );
};

export default Sidebar;
