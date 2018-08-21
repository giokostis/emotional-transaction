export function getFormattedAmountForCurrency(amount, currency) {
  switch (currency) {
    case 'GBP':
      return `${amount}£`;
    default:
      return `${amount}${currency}`;
  }
}