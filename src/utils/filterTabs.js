const ignored = [
	'config'
]

module.exports = (tabId) => ignored.includes(tabId)===false