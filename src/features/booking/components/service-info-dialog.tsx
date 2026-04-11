import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ResponsiveDialog from "@components/responsive-dialog";
import { useScreenSize } from "@theme/useScreenSize";
import type { UseModalReturn } from "@hooks/use-modal";
import type { ServiceItem } from "../types/services.types";
import { ArrowBack } from "@mui/icons-material";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ServiceInfoDialogProps {
  modal: UseModalReturn<ServiceItem>;
}

// ─── Component ────────────────────────────────────────────────────────────────

const ServiceInfoDialog = ({ modal }: ServiceInfoDialogProps) => {
  const { isOpen, data: service, close } = modal;
  const { isMobile } = useScreenSize();

  if (!service) return null;

  return (
    <ResponsiveDialog
      open={isOpen}
      onClose={close}
      variant="dialog"
      maxWidth="xs"
      fullWidth
    >
      <Box sx={{ px: 3, py: 2 }}>
        {isMobile && (
          <Box
            sx={{
              width: 40,
              height: 4,
              borderRadius: 2,
              bgcolor: "grey.300",
              mx: "auto",
              mb: 2,
            }}
          />
        )}

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: 3,
                bgcolor: "red",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <ArrowBack />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {service.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {service.durationMinutes} min · ${65}
              </Typography>
            </Box>
          </Stack>
          <IconButton
            size="small"
            onClick={close}
            sx={{ color: "text.disabled" }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
          {"No tiene"}
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ color: "text.disabled", mb: 3 }}
        >
          <ChevronRightIcon fontSize="small" />
          <Typography variant="caption">
            Duration: {service.durationMinutes} minutes
          </Typography>
        </Stack>

        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={close}
          sx={{ borderRadius: 3, py: 1.5, fontWeight: 600 }}
        >
          Got it
        </Button>
      </Box>
    </ResponsiveDialog>
  );
};

export default ServiceInfoDialog;
