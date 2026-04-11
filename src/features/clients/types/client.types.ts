export interface Client {
  name: string;
  lastName: string;
  phone: string;
}

export interface ClientPaginatedResponse {
  data: Client[];
}
