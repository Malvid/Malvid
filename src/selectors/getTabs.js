const ignored = [
	'config'
]

module.exports = (component) => {

	if (component==null) return null
	if (component.data==null) return null

	return component.data.filter((tab) => ignored.includes(tab.id)===false)

}