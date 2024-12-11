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
    placeholder: '(420) 420-1337',
    required: true,
    isValid: true,
    // Allow only numbers spaces and dashes
    validator: ({target}) => target.value.match(/^[0-9\s-]+$/),
    // Remove everything except numbers, ' ' and '-'
    formatter: ({target}) => target.value.replace(/[^\d\s-]/g, ''),
  },
  address: {
    type: 'text',
    label: 'Address',
    placeholder: 'Enter your address',
    required: true,
    isValid: true,
  },
};

const formMetadata = {
  userRequiredPersonalInfo: initializeMetadata({ metadata: userRequiredPersonalInfo }),
}

export {
  formV2,
  formMetadata,
}