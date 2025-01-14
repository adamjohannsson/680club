const logger = { log: false, };

/* Utils */

const utils = {
  buildQueryParams: (object) => {
    const parameterNamesList = Object.entries(object);
    const keyValuePairList = parameterNamesList.map(([key, value]) => `${key}=${value}`);
    const queryParamsString = keyValuePairList.join('&');

    return queryParamsString ? `?${queryParamsString}` : '';
  }
}

/* Helpers */

const helpers = {
  getDataFromEndpoint: async ({ endpoint, queryParams }) => {
    // Normalize backend url at method call to ensure ENV variables are set
    const normalized680ClubBackendUrl = process.env.REACT_APP_BACKEND_URL || process.env.BACKEND_URL;

    try {
      const url = `${normalized680ClubBackendUrl}/${endpoint}${utils.buildQueryParams(queryParams)}`;

      if(clubApi.logger.log) {
        console.log({url});
      }

      const response = await fetch(url);

      if(clubApi.logger.log) {
        console.log({response});

        if(!response.ok) {
          console.log({ responseText: await response.text() });
        }
      }

      const data = await response.json();

      if(clubApi.logger.log) {
        console.log({data});
      }

      return data;
    } catch (error) {
      /** @TODO handle this */
      console.log({ error });

      return;
    }
  },
  getDataFromPostEndpoint: async ({ endpoint, queryParams }) => {
    // Normalize backend url at method call to ensure ENV variables are set
    const normalized680ClubBackendUrl = process.env.REACT_APP_BACKEND_URL || process.env.BACKEND_URL;

    try {
      const url = `${normalized680ClubBackendUrl}/${endpoint}`;
      const requestBody = JSON.stringify(queryParams);

      if(clubApi.logger.log) {
        console.log({url, requestBody});
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });

      if(clubApi.logger.log) {
        console.log({response});

        if(!response.ok) {
          console.log({ responseText: await response.text() });
        }
      }

      const data = await response.json();

      if(clubApi.logger.log) {
        console.log({data});
      }

      return data;
    } catch (error) {
      /** @TODO handle this */
      console.error(error);

      return;
    }
  }
}

/* Credit Card */

const creditCard = {
  update: async ({ clubUserId, cardNumber, currentToken }) => {
    return await helpers.getDataFromPostEndpoint({
      endpoint: 'credit-card-update',
      queryParams: { clubUserId, cardNumber, currentToken },
    });
  }
}

/* Payout */

const payout = {
  create: async ({ authToken, userId, connectedAccountId, amountCents }) => {
    return await helpers.getDataFromEndpoint({
      endpoint: 'payout-create',
      queryParams: { authToken, userId, connectedAccountId, amountCents },
    });
  }
}

/* Connected Account To Payout */

const connectedAccountToPayout = {
  get: async ({ authToken, date }) => {
    return await helpers.getDataFromEndpoint({
      endpoint: 'connected-account-to-payout-get-list',
      queryParams: { authToken, date },
    });
  },
  create: async ({ authToken, date, connectedAccountsToPayout }) => {
    return await helpers.getDataFromPostEndpoint({
      endpoint: 'connected-account-to-payout-create',
      queryParams: { authToken, date, connectedAccountsToPayout },
    });
  }
}

/* Connected Account */

const connectedAccount = {
  getList: async ({ authToken, clubUserIds = [] }) => {
    return await helpers.getDataFromPostEndpoint({
      endpoint: 'connected-account-get-list',
      queryParams: { authToken, clubUserIds },
    });
  }
}

/* User */

const user = {
  getList: async ({ authToken, active = true }) => {
    return await helpers.getDataFromEndpoint({
      endpoint: 'user-get-list',
      queryParams: { authToken, active },
    });
  }
}

/* Customer */

const customer = {
  getList: async ({ authToken }) => {
    return await helpers.getDataFromEndpoint({
      endpoint: 'customer-get-list',
      queryParams: { authToken },
    });
  },
  getOrCreate: async ({ clubUserId, email }) => {
    return await helpers.getDataFromEndpoint({
      endpoint: 'customer-get-or-create',
      queryParams: { clubUserId, email },
    });
  }
}

const clubApi = {
  user,
  payout,
  logger,
  customer,
  creditCard,
  connectedAccount,
  connectedAccountToPayout,
}

export default clubApi;
