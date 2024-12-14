import jcb from '../../assets/logos/rounded-corners/SVG/jcb.svg';
import visa from '../../assets/logos/rounded-corners/SVG/visa.svg';
import maestro from '../../assets/logos/rounded-corners/SVG/maestro.svg';
import discover from '../../assets/logos/rounded-corners/SVG/discover.svg';
import amex from '../../assets/logos/rounded-corners/SVG/american-express.svg';
import mastercard from '../../assets/logos/rounded-corners/SVG/mastercard.svg';
import { creditCardProviders } from '../../utils/enums';

const logos = {
  [creditCardProviders.jcb]: jcb,
  [creditCardProviders.visa]: visa,
  [creditCardProviders.amex]: amex,
  [creditCardProviders.maestro]: maestro,
  [creditCardProviders.discover]: discover,
  [creditCardProviders.mastercard]: mastercard,
  // [creditCardProviders.unknown]: unknown,
};

const CreditCardLogo = ({ provider, size = 'width-xl' }) => {
  if (!logos[provider]) {
    return null;
  }

  return (
    <img src={logos[provider]} className={`size-${size}`} alt={provider} />
  );
};

export default CreditCardLogo;
