import { Typography } from "@mui/material";
import { useGetClientsPaginated } from "../services/get-clients";
import Protected from "@components/protected";

const ClientsPage = () => {
  const { data } = useGetClientsPaginated({
    page: 1,
    pageSize: 10,
  });

  return (
    <Protected resource="clients" action="read">
      <Typography>Clientes</Typography>
    </Protected>
  );
};

export default ClientsPage;
