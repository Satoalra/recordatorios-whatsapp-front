import {
  Dialog,
  type DialogProps,
  Drawer,
  type DrawerProps,
} from "@mui/material";
import SwipeableDrawer from "@components/swipeable-drawer";
import { useScreenSize } from "@theme/useScreenSize";

type ResponsiveDialogVariant = "drawer" | "dialog";

interface BaseResponsiveDialogProps {
  open: boolean;
  onClose: () => void;
  onOpen?: () => void;
  children: React.ReactNode;
  variant?: ResponsiveDialogVariant;
}

interface DrawerVariantProps extends BaseResponsiveDialogProps {
  variant?: "drawer";
  anchor?: DrawerProps["anchor"];
  drawerSlotProps?: DrawerProps["slotProps"];
}

interface DialogVariantProps extends BaseResponsiveDialogProps {
  variant: "dialog";
  maxWidth?: DialogProps["maxWidth"];
  fullWidth?: boolean;
  dialogSlotProps?: DialogProps["slotProps"];
}

type ResponsiveDialogProps = DrawerVariantProps | DialogVariantProps;

const ResponsiveDialog = ({
  open,
  onClose,
  onOpen = () => {},
  children,
  variant = "dialog",
  ...variantProps
}: ResponsiveDialogProps) => {
  const { isMobile } = useScreenSize();

  if (isMobile) {
    return (
      <SwipeableDrawer open={open} onClose={onClose} onOpen={onOpen}>
        {children}
      </SwipeableDrawer>
    );
  }

  if (variant === "dialog") {
    const {
      maxWidth = "md",
      fullWidth = false,
      dialogSlotProps,
    } = variantProps as DialogVariantProps;

    return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        slotProps={dialogSlotProps}
      >
        {children}
      </Dialog>
    );
  }

  const { anchor = "right", drawerSlotProps } =
    variantProps as DrawerVariantProps;

  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      slotProps={drawerSlotProps}
    >
      {children}
    </Drawer>
  );
};

export default ResponsiveDialog;
