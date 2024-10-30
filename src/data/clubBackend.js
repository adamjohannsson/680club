import { buildQueryParams } from "../utils/urls";

const getDataFromEndpoint = async ({ endpoint, queryParams }) => {
  // TODO: Handle post requests and not only get requests
  const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${endpoint}${buildQueryParams(queryParams)}`);
  const data = await response.json();

  return data;
};

const getOrCreateCustomer = async ({ clubUserId, email }) => {
  const customer = await getDataFromEndpoint({
    endpoint: 'get-or-create-customer',
    queryParams: { clubUserId, email },
  });

  return customer;
};

const clubBackend = {
  getOrCreateCustomer,
}

export { clubBackend };
