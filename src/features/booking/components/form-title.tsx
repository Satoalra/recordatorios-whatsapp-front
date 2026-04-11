import { Box, Typography } from "@mui/material";

interface FormTitleProps {
  title: string;
  subtitle?: string;
}

const FormTitle = ({ title, subtitle }: FormTitleProps) => (
  <Box>
    <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
      {title}
    </Typography>
    {subtitle && (
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {subtitle}
      </Typography>
    )}
  </Box>
);

export default FormTitle;
