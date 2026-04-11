import type { Components, Theme } from "@mui/material/styles";

export const MuiPagination: Components<Theme>["MuiPagination"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      display: "flex",
      justifyContent: "flex-end",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    }),

    ul: ({ theme }) => ({
      gap: theme.spacing(1),
      "& .MuiPaginationItem-root": {
        fontWeight: 900,
        minWidth: 32,
        height: 32,
        borderRadius: theme.spacing(1),
        color: theme.palette.text.secondary,
      },
      "& .MuiPaginationItem-root.Mui-selected": {
        backgroundColor: `${theme.palette.primary.main} !important`,
        color: theme.palette.primary.contrastText,
      },

      "& .MuiPaginationItem-previousNext": {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.contrastText,
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },
      },
    }),
  },
};
