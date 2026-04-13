import {
  Divider,
  Drawer,
  IconButton,
  List,
  Stack,
  styled,
  Toolbar,
} from "@mui/material";
import {
  Dashboard,
  LogoutOutlined,
  Person,
  ContentPasteOutlined,
  FolderSharedOutlined,
  SchoolOutlined,
  PersonOutlined,
  Close,
} from "@mui/icons-material";
import AvatarStack from "./avatar-stack";
import SidebarButton from "./sidebar-button";
import SidebarMenuWithSubmenu from "./sidebar-menu-with-submenu";
import { useAuth } from "@contexts/auth-context";

const drawerWidth = 280;

const CustomList = styled(List)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  padding: 0,
}));

export type MobileSidebarProps = {
  open: boolean;
  onClose: () => void;
};

const MobileSidebar = ({ open, onClose }: MobileSidebarProps) => {
  const { signOut } = useAuth();

  //const { hasPermission } = useAuthUser();

  const handleNavigation = () => {
    onClose();
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Stack
        sx={{
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
          }}
        >
          <img
            src="/logo.png"
            alt="logo"
            style={{
              width: 50,
              height: "auto",
            }}
          />
          <IconButton onClick={onClose} aria-label="close menu">
            <Close />
          </IconButton>
        </Toolbar>
        <AvatarStack open />
        <CustomList sx={{ px: 2, py: 2 }}>
          <SidebarButton
            label="Dashboard"
            open
            to="/dashboard"
            icon={<Dashboard />}
            onClick={handleNavigation}
          />
          <SidebarButton
            label="Casos clínicos"
            open
            to="/clinic-cases"
            icon={<ContentPasteOutlined />}
            childRoutes={["/clinic-cases/new", "/clinic-cases/"]}
            //canAccess={hasPermission("clinic-case", "read")}
            onClick={handleNavigation}
          />
          <SidebarButton
            label="Pacientes"
            open
            to="/patients"
            icon={<FolderSharedOutlined />}
            childRoutes={["/patients/new", "/patients/"]}
            //canAccess={hasPermission("patient", "read")}
            onClick={handleNavigation}
          />
          <SidebarMenuWithSubmenu
            label="Usuarios"
            icon={<Person />}
            open
            //canAccess={hasPermission("users", "read")}
            subItems={[
              {
                label: "Todos",
                to: "/users",
                icon: <PersonOutlined />,
                childRoutes: ["/users/new", "/users/"],
              },
              {
                label: "Alumnos",
                to: "/users/students",
                icon: <SchoolOutlined />,
                childRoutes: ["/users/students"],
              },
            ]}
          />
        </CustomList>
        <Divider sx={{ my: 2 }} />
        <CustomList sx={{ pb: 2, px: 2 }}>
          <SidebarButton
            label="Log out"
            open
            onClick={() => {
              onClose();
              signOut();
            }}
            icon={<LogoutOutlined />}
          />
          {/* TODO: Habilitar modo oscuro/claro cuando se implemente el toggle en el theme provider */}
          {/* <SidebarButton
            label={colorMode === "light" ? "Dark mode" : "Light mode"}
            open
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <ToggleOff /> : <ToggleOn />}
          /> */}
        </CustomList>
      </Stack>
    </Drawer>
  );
};

export default MobileSidebar;
