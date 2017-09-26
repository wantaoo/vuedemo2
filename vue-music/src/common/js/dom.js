export function addClass(el, className){
	if(hasClass(el, className)){
		return
	}

	let newClass = el.className.split(' ')
	newClass.push(className)
	el.className = newClass.join(' ')
}

export function hasClass(el, className){
	let reg = new RegExp('(^|\\s)'+className+'(\\s|$)')
	return reg.test(el.className)
}


export function getData(el, name, val){
	const prefix = 'data-'
	if(val){
		return el.setAttribute(prefix + name,val)
	}
	return el.getAttribute(prefix + name)
}

//利用浏览器能力检测，为CSS自动添加前缀
let elementStyle = document.createElement('div').style
let vendor = (() => {
	let tranformNames = {
		webkit: 'webkitTransform',
		Moz: 'MozTransform',
		O: 'oTransform',
		ms: 'msTransform',
		standard: 'transform'
	}

	for(let key in tranformNames){
		if(elementStyle[tranformNames[key]] !== undefined){
			return key
		}
	}
	return false
})()

export function prefixStyle(style){
	if(vendor === false){
		return false
	}

	if(vendor === 'standard'){
		return style
	}

	return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}