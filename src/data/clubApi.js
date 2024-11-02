const buildQueryParams = (object) => {
  const parameterNamesList = Object.entries(object);
  const keyValuePairList = parameterNamesList.map(([key, value]) => `${key}=${value}`);
  const queryParamsString = keyValuePairList.join('&');

  return queryParamsString ? `?${queryParamsString}` : '';
};

const utils = {
  buildQueryParams,
}

const getDataFromEndpoint = async ({ endpoint, queryParams }) => {
  // TODO: Handle post requests and not only get requests
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${endpoint}${utils.buildQueryParams(queryParams)}`)
    const data = await response.json();

    return data;
  } catch (error) {
    // TODO: handle this
    console.error(error);

    return null;
  }
};

const data = {
  getDataFromEndpoint,
}

const getOrCreate = async ({clubUserId, email}) => {
  const customer = await data.getDataFromEndpoint({
    endpoint: 'customer-get-or-create',
    queryParams: { clubUserId, email },
  });

  return customer;
}

const customer = {
  getOrCreate,
}

const clubApi = {
  customer,
}

export { clubApi };