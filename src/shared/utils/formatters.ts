export const formatPrice = (price?: number): string => {
  if (price === undefined) {
    return ''
  }

  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 6,
  }).format(price)
}

export const getDynamicFontSize = (priceLength: number): string => {
  if (priceLength > 5 && priceLength <= 8) {
    return 'text-[13px]'
  } else if (priceLength > 8) {
    return 'text-[12.5px]'
  } else {
    return 'text-[13px]'
  }
}

export const formatPriceWithoutDecimals = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

export const formatNumber = (value: string) => {

  let cleanedValue = value.replace(/,/g, '.')

  cleanedValue = cleanedValue.replace(/\s/g, '')

  const [integerPart, decimalPart] = cleanedValue.split('.')

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')


  return decimalPart !== undefined ? `${formattedInteger}.${decimalPart}` : formattedInteger
}

export const formatWitDecimals = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}