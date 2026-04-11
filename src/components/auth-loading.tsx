import { useState, useEffect } from "react";
import { Box, keyframes } from "@mui/material";
import {
  LocalHospital,
  Healing,
  MonitorHeart,
  MedicalServices,
} from "@mui/icons-material";

const pulse = keyframes`
  0%   { transform: scale(0.92); opacity: 0.6; }
  50%  { transform: scale(1.08); opacity: 1; }
  100% { transform: scale(0.92); opacity: 0.6; }
`;

const VARIANTS = [
  { icon: LocalHospital },
  { icon: Healing },
  { icon: MonitorHeart },
  { icon: MedicalServices },
];

const AuthLoading = () => {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * 4));

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const Icon = VARIANTS[index].icon;

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Outer circle — primary.light, slow pulse */}
        <Box
          sx={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            border: "3px solid",
            borderColor: "primary.light",
            opacity: 0.3,
            position: "absolute",
            animation: `${pulse} 3s infinite ease-in-out`,
            animationFillMode: "both",
          }}
        />

        {/* Middle circle — primary.main, slight delay */}
        <Box
          sx={{
            width: 130,
            height: 130,
            borderRadius: "50%",
            border: "3px solid",
            borderColor: "primary.main",
            opacity: 0.6,
            position: "absolute",
            animation: `${pulse} 3s infinite ease-in-out`,
            animationDelay: "0.4s",
            animationFillMode: "both",
          }}
        />

        {/* Inner circle + icon — primary.dark */}
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            border: "3px solid",
            borderColor: "primary.dark",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "primary.dark",
            animation: `${pulse} 3s infinite ease-in-out`,
            animationDelay: "0.8s",
            animationFillMode: "both",
          }}
        >
          <Icon sx={{ fontSize: 36 }} />
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLoading;
