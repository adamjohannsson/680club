const buildQueryParams = (object) => {
  const parameterNamesList = Object.entries(object);
  const keyValuePairList = parameterNamesList.map(([key, value]) => `${key}=${value}`);
  const queryParamsString = keyValuePairList.join('&');

  return queryParamsString ? `?${queryParamsString}` : '';
};

export { buildQueryParams };
