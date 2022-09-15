/**
 * @descrition [通过参数名获取url中的参数值]
 * @param  {[string]} url [链接]
 * @param  {[string]} queryName [获取参数名]
 * @return {[string]}           [参数值]
 */
// 使用浏览器提供的方法URLSearchParams也可以实现
// const urlSearchParams = new URLSearchParams(window.location.search);
// const params = Object.fromEntries(urlSearchParams.entries());
// console.log(params) // {id: '2', isShare: 'true'}
// console.log(params.id) // 2

const getQueryValue = (link: string, queryName: string) => {
	const url = decodeURIComponent(link);
	const res = new RegExp('(?:&|/?)' + queryName + '=([^&$]+)').exec(url);
	return res ? res[1] : '';
};

export { getQueryValue };
