// -- FORMATTERS
export const formatPriceWithDecimals = (value?: number): string => {
  if (value === undefined) {
    return '0';
  }

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 6,
  }).format(value);
};

export const formatPriceWithoutDecimals = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatPriceWithCommas = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formattedBalance = (value: number) => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const isValidNumericInput = (value: string) => {
  return /^[0-9.,]*$/.test(value);
};

export const parseNumericInput = (value: string) => {
  return parseFloat(value);
};

// -- CLASSES
export const getDynamicFontSize = (priceLength: number): string => {
  if (priceLength > 5 && priceLength <= 8) {
    return 'text-[13px]';
  } else if (priceLength > 8) {
    return 'text-[12.5px]';
  } else {
    return 'text-[13px]';
  }
};

export const getMarketCapChangeClass = (marketCapChange24h: number) => {
  if (marketCapChange24h === null) return 'text-neutral-02';
  return marketCapChange24h < 0
    ? 'text-specials-danger'
    : 'text-specials-success';
};

export const getClassedBasedOnValue = (value: number) => {
  if (value === 0) return 'text-muted';
  return value < 0 ? 'text-specials-danger' : 'text-specials-success';
};

export const getClassesBalance = (
  totalBalance: number,
  totalInvestedUSD: number,
) => {
  if (totalBalance > totalInvestedUSD) {
    return 'text-specials-success';
  } else {
    return 'text-specials-danger';
  }
};
