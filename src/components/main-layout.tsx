import { useState, type ReactNode } from "react";
import { Box, Container, styled } from "@mui/material";
import Sidebar from "./sidebar/sidebar";
import MobileSidebar from "./sidebar/mobile-sidebar";
import { useScreenSize } from "@theme/useScreenSize";
import { useMobileSidebar } from "@contexts/mobile-sidebar";

const CustomContainer = styled(
  Container,
  {},
)(({ theme }) => ({
  padding: `${0} ${theme.spacing(3)}`,
  minHeight: "100vh",
  flexGrow: 1,

  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(12),
  },
}));

export type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const { isDesktop, isMobile } = useScreenSize();
  const [open, setOpen] = useState(() => isDesktop);
  const { isOpen: mobileOpen, close: closeMobileSidebar } = useMobileSidebar();

  return (
    <Box sx={{ display: "flex", xs: 12, sm: 0, paddingBottom: 4 }}>
      {!isMobile ? (
        <Sidebar open={open} onCollapse={() => setOpen((s) => !s)} />
      ) : (
        <MobileSidebar open={mobileOpen} onClose={closeMobileSidebar} />
      )}
      {/* Main content */}
      <CustomContainer>{children}</CustomContainer>
    </Box>
  );
};

export default MainLayout;
