import { useAuth } from "@contexts/auth-context";
import { Avatar, Fade, Skeleton, Stack, Typography } from "@mui/material";

const AvatarStack = ({ open }: { open: boolean }) => {
  const { user, loading } = useAuth();

  return (
    <Stack
      direction="row"
      gap={1}
      alignItems="center"
      justifyContent={open ? "flex-start" : "center"}
      sx={{
        bgcolor: (theme) =>
          open ? theme.palette.background.default : "transparent",
        borderRadius: 2,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: (theme) =>
          open ? theme.palette.primary?.["200"] : "transparent",
        width: "100%",
        padding: 1,
        transition: "all .3s ease",
        mb: 4,
      }}
    >
      <Avatar
        alt="User"
        src="/avatar.png"
        sx={{
          width: 42,
          height: 42,
          flexShrink: 0,
        }}
      >
        {"U"}
      </Avatar>
      {!loading && open ? (
        <Fade in={open}>
          <Stack
            direction="column"
            sx={{
              overflow: "hidden",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {user?.email}
            </Typography>
            <Typography
              sx={{
                fontWeight: 300,
                fontSize: 14,
                color: "text.secondary",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {user?.email}
            </Typography>
          </Stack>
        </Fade>
      ) : loading ? (
        <>
          <Skeleton width={"80%"} sx={{ height: 16 }} />
          <Skeleton width={"100%"} sx={{ height: 16 }} />
        </>
      ) : null}
    </Stack>
  );
};

export default AvatarStack;
