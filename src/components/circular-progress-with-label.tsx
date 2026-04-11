import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  type CircularProgressProps,
} from "@mui/material";

interface CircularProgressWithLabelProps extends CircularProgressProps {
  value: number;
  label: string;
  title?: string;
}

const CircularProgressWithLabel = (props: CircularProgressWithLabelProps) => {
  const { sx, title, ...restProps } = props;

  return (
    <Stack
      direction="row"
      gap={2}
      alignItems="center"
      justifyContent="flex-start"
    >
      <Box
        sx={{
          position: "relative",
          display: "inline-flex",
          width: "min-content",
        }}
      >
        <CircularProgress
          enableTrackSlot
          sx={{
            height: "70px !important",
            width: "70px !important",
            ...sx,
          }}
          variant="determinate"
          {...restProps}
        />
        <Typography
          sx={{
            top: "50%",
            left: "50%",
            position: "absolute",
            transform: "translate(-50%, -50%)",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
          variant="caption"
          component="div"
          color="text.secondary"
        >
          {props.label}
        </Typography>
      </Box>
      {title && (
        <Typography
          sx={{
            color: "text.primary",
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          {title}
        </Typography>
      )}
    </Stack>
  );
};

export default CircularProgressWithLabel;
