import { useState, useEffect, type ReactNode } from "react";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  useTheme,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useLocation, useNavigate } from "@tanstack/react-router";
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

const SubMenuItem = styled(ListItemButton)(({ theme }) => ({
  margin: 0,
  paddingTop: theme.spacing(0.8),
  paddingBottom: theme.spacing(0.8),
  paddingRight: 0,
  paddingLeft: theme.spacing(1),
  borderRadius: 8,
  display: "flex",
  gap: theme.spacing(2),

  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
  },
  "&.Mui-selected:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export type SubMenuItem = {
  label: string;
  to: string;
  icon?: ReactNode;
  childRoutes?: string[];
};

type SidebarMenuWithSubmenuProps = {
  label: string;
  icon?: ReactNode;
  open: boolean;
  subItems: SubMenuItem[];
  canAccess?: boolean;
};

const SidebarMenuWithSubmenu = ({
  label,
  icon,
  open,
  subItems,
  canAccess,
}: SidebarMenuWithSubmenuProps) => {
  const { palette } = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isItemActive = (item: SubMenuItem, otherItems: SubMenuItem[]) => {
    if (pathname === item.to) return true;

    const matchesOtherItem = otherItems.some(
      (other) => other.to !== item.to && pathname === other.to,
    );
    if (matchesOtherItem) return false;

    const isUnderOtherItem = otherItems.some(
      (other) => other.to !== item.to && pathname.startsWith(other.to),
    );
    if (isUnderOtherItem) return false;

    return (
      item.childRoutes?.some((route) => pathname.startsWith(route)) ?? false
    );
  };

  const hasActiveChild = subItems.some((item) => isItemActive(item, subItems));

  const [expanded, setExpanded] = useState(hasActiveChild);

  useEffect(() => {
    setExpanded(hasActiveChild);
  }, [hasActiveChild]);

  const handleToggle = () => {
    if (!expanded) {
      if (!hasActiveChild && subItems.length > 0) {
        navigate({ to: subItems[0].to });
      }
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  };

  if (canAccess === false) {
    return null;
  }

  return (
    <>
      <CustomListItem>
        <CustomListItemButton onClick={handleToggle} selected={hasActiveChild}>
          <CustomListItemIcon
            sx={{
              color: hasActiveChild
                ? palette.common.white
                : palette.text.disabled,
              transition: "color .2s ease",
            }}
          >
            {!!icon && icon}
          </CustomListItemIcon>
          {open && (
            <>
              <ListItemText
                slotProps={{
                  primary: {
                    sx: {
                      color: hasActiveChild
                        ? palette.common.white
                        : palette.text.disabled,
                      fontWeight: 700,
                    },
                  },
                }}
                primary={label}
              />
              {expanded ? (
                <ExpandLess
                  sx={{
                    color: hasActiveChild
                      ? "primary.contrastText"
                      : palette.text.disabled,
                  }}
                />
              ) : (
                <ExpandMore
                  sx={{
                    color: hasActiveChild
                      ? "primary.contrastText"
                      : palette.text.disabled,
                  }}
                />
              )}
            </>
          )}
        </CustomListItemButton>
      </CustomListItem>
      {open && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
            disablePadding
          >
            {subItems.map((item) => {
              const isActive = isItemActive(item, subItems);

              return (
                <ListItem
                  key={item.to}
                  sx={{
                    padding: 0,
                    paddingLeft: 2,
                  }}
                >
                  <Link
                    to={item.to}
                    style={{ textDecoration: "none", width: "100%" }}
                  >
                    <SubMenuItem selected={isActive}>
                      {item.icon && (
                        <CustomListItemIcon
                          sx={{
                            color: isActive
                              ? palette.common.white
                              : palette.text.disabled,
                            transition: "color .2s ease",
                          }}
                        >
                          {item.icon}
                        </CustomListItemIcon>
                      )}
                      <ListItemText
                        slotProps={{
                          primary: {
                            sx: {
                              color: isActive
                                ? palette.common.white
                                : palette.text.disabled,
                              fontWeight: 600,
                            },
                          },
                        }}
                        primary={item.label}
                      />
                    </SubMenuItem>
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default SidebarMenuWithSubmenu;
