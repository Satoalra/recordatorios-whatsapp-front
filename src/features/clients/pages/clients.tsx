import { useGetClientsPaginated } from "../services/get-clients";

const ClientsPage = () => {
  const { data } = useGetClientsPaginated({
    page: 1,
    pageSize: 10,
  });

  console.log(data?.total);

  return <></>;
};

export default ClientsPage;
