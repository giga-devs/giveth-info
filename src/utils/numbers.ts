import numbro from 'numbro'

// using a currency library here in case we want to add more in future
export const formatDollarAmount = (num: number | undefined, digits = 2, round = true) => {
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
  const Year = dateString.slice(0,4)
  const Month = dateString.slice(4,6)
  const Date = dateString.slice(6,8)
  return `${Month}/${Date}/${Year}`
}

export const formatLabelDate = (dateString) => {
  const Year = dateString.slice(0,4)
  const Month = dateString.slice(5,7)
  const Date = dateString.slice(8,10)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  if (Date){
    return `${Date}/${Month}`
  }
  else {
    if(Month.slice(0,1)==='0'){
      return months[Month.slice(-1)-1]
    }else {
      return months[Month-1]
    }
  }
}