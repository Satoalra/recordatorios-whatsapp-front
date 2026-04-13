import type { ReactNode } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  useTheme,
} from "@mui/material";
import { useLocation } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

const CustomListItem = styled(ListItem)(() => ({
  margin: 0,
  padding: 0,
  display: "flex",
  justifyContent: "center",
}));

const CustomListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: "auto",
  padding: theme.spacing(0.5),
}));

const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  margin: 0,
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  borderRadius: 8,
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(2),

  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
  },
  "&.Mui-selected:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const SidebarButton = ({
  to,
  label,
  icon,
  open,
  onClick,
  childRoutes,
  canAccess,
}: {
  label: string;
  open: boolean;
  to?: string;
  icon?: ReactNode;

  onClick?: () => void;
  childRoutes?: string[];
  canAccess?: boolean;
}) => {
  const { palette } = useTheme();
  const { pathname } = useLocation();
  const active =
    pathname === to ||
    (childRoutes?.some((route) => pathname.startsWith(route)) ?? false);

  if (canAccess === false) {
    return null;
  }

  return (
    <CustomListItem>
      <Link to={to} style={{ textDecoration: "none", width: "100%" }}>
        <CustomListItemButton
          onClick={() => {
            onClick?.();
          }}
          selected={active}
        >
          <CustomListItemIcon
            sx={{
              color: active ? palette.common.white : palette.text.disabled,
              transition: "color .2s ease",
            }}
          >
            {!!icon && icon}
          </CustomListItemIcon>
          {open && (
            <ListItemText
              slotProps={{
                primary: {
                  sx: {
                    color: active
                      ? palette.common.white
                      : palette.text.disabled,
                    fontWeight: 700,
                  },
                },
              }}
              primary={label}
            />
          )}
        </CustomListItemButton>
      </Link>
    </CustomListItem>
  );
};

export default SidebarButton;
