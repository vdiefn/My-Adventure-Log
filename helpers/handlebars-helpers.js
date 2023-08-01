const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
require('dayjs/locale/zh-tw')
dayjs.locale('zh-tw')
dayjs.extend(relativeTime)

module.exports = {
  currentYear: () => dayjs().year(),
  recordDate: (date) => dayjs(date).format('YYYY/MM/DD'),
  valueDate: (date) => dayjs(date).format('YYYY-MM-DD'),
  filterYear: (date) =>dayjs(date).format('YYYY'),
  ifCond: function( a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this)
  },
  relativeTimeFromNow: a => dayjs(a).fromNow()
}