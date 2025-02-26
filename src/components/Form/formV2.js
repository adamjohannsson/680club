import { getAsPhoneNumber } from "../../utils/strings";

const initializeMetadata = ({metadata = {}}) => {
  /** @TODO Add validations or completions to metadata */
  return metadata;
};

const formV2 = {
  get: ({metadata, setMetadata}) => {
    return {
      metadata,
      setMetadata,
      isValid: () => {
        return Object.keys(metadata).every(key => metadata[key].isValid);
      }
    }
  },
}

const userRequiredPersonalInfo = {
  fullName: {
    type: 'text',
    label: 'Full Name',
    placeholder: 'Enter your name',
    required: true,
    isValid: true,
  },
  phone: {
    type: 'tel',
    label: 'Phone',
    placeholder: '(120) 432-1337',
    required: true,
    isValid: true,
    // Allow only numbers
    validator: ({value}) => value.replace(/[^\d]/g, '').length === 10,
    // Remove everything except numbers and format as phone number with this pattern: (123) 123-1234
    formatter: ({value}) => getAsPhoneNumber({value}),
  },
  address: {
    type: 'text',
    label: 'Address',
    placeholder: 'Enter your address',
    required: true,
    isValid: true,
  },
};

const connectedAccount = {
  cardNickname: {
    type: 'text',
    label: 'Card\'s nickname',
    placeholder: 'Enter a phrase to easily identify your card',
    required: true,
    isValid: true,
  },
  fullNameOnCard: {
    type: 'text',
    label: 'Full name on card',
    placeholder: 'Hal Finney',
    required: true,
    isValid: true,
  },
  cardNumber: {
    type: 'text',
    label: 'Card number',
    placeholder: '8234 9234 9234 1202',
    required: true,
    isValid: false,
    // Value has at least 15 digits
    validator: ({value}) => value.replace(/[^\d]/g, '').length >= 15,
    // Remove everything except numbers, then add a space every 4 digits
    formatter: ({value}) => value.replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 '),
  },
}

const formMetadata = {
  userRequiredPersonalInfo: initializeMetadata({ metadata: userRequiredPersonalInfo }),
  connectedAccount: initializeMetadata({ metadata: connectedAccount }),
}

export {
  formV2,
  formMetadata,
}