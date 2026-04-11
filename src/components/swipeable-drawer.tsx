import { SwipeableDrawer as _SwipleableDrawer } from "@mui/material";

interface SwipeableDrawerProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  onOpen?: () => void;
}

const SwipeableDrawer = ({
  children,
  open = false,
  onClose,
  onOpen = () => {},
}: SwipeableDrawerProps) => {
  return (
    <_SwipleableDrawer
      anchor="bottom"
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      disableBackdropTransition={false}
      disableDiscovery={false}
      slotProps={{
        paper: {
          sx: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderEndEndRadius: 0,
            borderEndStartRadius: 0,
            zIndex: (theme) => theme.zIndex.drawer + 1,
            height: "90%",
          },
        },
      }}
    >
      {children}
    </_SwipleableDrawer>
  );
};

export default SwipeableDrawer;
