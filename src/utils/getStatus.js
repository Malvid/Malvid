module.exports = (statuses, component) => {

	if (component==null) return null
	if (component.data==null) return null
	if (component.data.config==null) return null
	if (component.data.config.status==null) return null

	return statuses[component.data.config.status]

}