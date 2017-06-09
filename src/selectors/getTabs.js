const ignored = [
	'config'
]

const excludeIgnored = (tabId) => ignored.includes(tabId)===false

module.exports = (component) => {

	if (component==null) return null
	if (component.data==null) return null

	return Object.keys(component.data).filter(excludeIgnored)

}