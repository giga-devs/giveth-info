import numbro from 'numbro'

// using a currency library here in case we want to add more in future
export const formatDollarAmount = (
  num: number | undefined,
  digits = 2,
  round = true
) => {
  if (num === 0) return '$0.00'
  if (!num) return '-'
  if (num < 0.001 && digits <= 3) {
    return '<$0.001'
  }

  return numbro(num).formatCurrency({
    average: round,
    mantissa: num > 1000 ? 2 : digits,
    abbreviations: {
      million: 'M',
      billion: 'B',
    },
  })
}

// using a currency library here in case we want to add more in future
export const formatAmount = (num: number | undefined, digits = 2) => {
  if (num === 0) return '0'
  if (!num) return '-'
  if (num < 0.001) {
    return '<0.001'
  }
  return numbro(num).format({
    average: true,
    mantissa: num > 1000 ? 2 : digits,
    abbreviations: {
      million: 'M',
      billion: 'B',
    },
  })
}

export const formatDate = (dateString) => {
  const year = dateString.slice(0, 4)
  let month = dateString.slice(4, 6)
  let day = dateString.slice(6, 8)
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  if (month.slice(0, 1) === '0') {
    month = month.slice(-1)
  }
  if (day.slice(0, 1) === '0') {
    day = day.slice(-1)
  }
  return `${months[month - 1]} ${day}, ${year}`
}

export const formatLabelDate = (dateString) => {
  let month = dateString.slice(5, 7)
  let day = dateString.slice(8, 10)
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  if (month.slice(0, 1) === '0') {
    month = month.slice(-1)
  }
  if (day.slice(0, 1) === '0') {
    day = day.slice(-1)
  }

  if (day) {
    return `${month}/${day}`
  }
  return months[month - 1]
}
