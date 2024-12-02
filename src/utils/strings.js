import { creditCardProviders } from "./enums";

// Return text in lowercase, with no diacritics, and with no leading or trailing whitespace
const getNormalizedText = (text) => {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

// Taken from https://www.regular-expressions.info/creditcard.html
const getCreditCardProvider = ({ number }) => {
  // Remove all non-digits
  const digitsOnly = number.toString().replace(/\D/g, '');

  const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
  const mastercardRegex =
    /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/;
  const amexRegex = /^3[47][0-9]{13}$/;
  const dinersClubRegex = /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/;
  const discoverRegex = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
  const jcbRegex = /^(?:2131|1800|35\d{3})\d{11}$/;

  if (visaRegex.test(digitsOnly)) {
    return creditCardProviders.visa;
  } else if (mastercardRegex.test(digitsOnly)) {
    return creditCardProviders.mastercard;
  } else if (amexRegex.test(digitsOnly)) {
    return creditCardProviders.amex;
  } else if (dinersClubRegex.test(digitsOnly)) {
    return creditCardProviders.diners;
  } else if (discoverRegex.test(digitsOnly)) {
    return creditCardProviders.discover;
  } else if (jcbRegex.test(digitsOnly)) {
    return creditCardProviders.jcb;
  }

  return creditCardProviders.unknown;
};

export { getNormalizedText, getCreditCardProvider };
