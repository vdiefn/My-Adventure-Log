function divingCountCalculator(records) {
  let total = 0
  records.map((record) => {
    total = total + 1
  })
  return total
}

module.exports = divingCountCalculator