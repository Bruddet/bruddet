import { queryStore } from "./loader";
import { client } from "./clientConfig";

export const { loadQuery } = queryStore;

const clientWithToken = client.withConfig({
  token: process.env.SANITY_API_READ_TOKEN,
});

queryStore.setServerClient(clientWithToken);
