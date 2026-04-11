import type { SvgIconComponent } from "@mui/icons-material";

export interface Service {
  id: string;
  name: string;
  duration: number; // minutes
  price: number;
  icon: SvgIconComponent;
  iconBg: string;
  description: string;
}
