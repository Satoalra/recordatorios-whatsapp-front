import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

import { Box, Card, CardActionArea, Stack, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import type { EmployeeItem } from "../../types/employees.types";

interface EmployeeCardProps {
  employee: EmployeeItem;
  selected: boolean;
  onSelect: (id: string) => void;
}

const EmployeeCard = ({ employee, selected, onSelect }: EmployeeCardProps) => {
  return (
    <Card
      elevation={0}
      sx={{
        p: 0,
        border: "1.5px solid",
        borderColor: selected ? "primary.main" : "grey.200",
        borderRadius: 3,
        bgcolor: selected ? "primary.100" : "background.paper",
        transition: "border-color 0.2s, background-color 0.2s",
      }}
    >
      <CardActionArea
        disableRipple
        onClick={() => onSelect(employee.id)}
        sx={{ p: 4 }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2.5,
              bgcolor: "red",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <ArrowBack />
          </Box>

          {/* Info */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              {employee.fullName}
            </Typography>
          </Box>

          {/* Actions */}
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {selected ? (
              <CheckCircleIcon sx={{ color: "primary.main", fontSize: 24 }} />
            ) : (
              <RadioButtonUncheckedIcon
                sx={{ color: "text.disabled", fontSize: 24 }}
              />
            )}
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  );
};

export default EmployeeCard;
