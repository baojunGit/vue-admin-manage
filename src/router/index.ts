import { BASE_URL } from '@/config/envConfig';
import { createRouter, createWebHistory } from 'vue-router';
import publicRoutes from './publicRoutes';
import { useMenuStoreHook } from '@/store/modules/menu';
import { getMenuList } from '@/api/menu';
import { storeToRefs } from 'pinia';
import Cookies from 'js-cookie';
import { formatRoutes } from './util';

/**
 * meta: 除了原生参数外可配置的参数
 * meta: {
 *  title: { String } 显示在侧边栏、面包屑和标签栏的文字
 *  icon: { String } 该页面在左侧菜单、面包屑和标签导航处显示的图标
 *  target: '_blank', 外链
 *  frameSrc { String } 内嵌iframe的地址
 *  hideInBread: { Boolean } 设为true后此级路由将不会出现在面包屑中
 *  noCloseTab: 路由标签是否可以关闭(目前只有首页不可关闭)
 *  hideInMenu: { Boolean }  设为true后在左侧菜单不会显示该页面选项
 *  cache: { Boolean }  设为true后页面在切换标签后缓存，如果不需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 * }
 */

const router = createRouter({
	history: createWebHistory(BASE_URL),
	routes: publicRoutes as any
});

const menuStore = useMenuStoreHook();
const { setMenu } = menuStore;
const { menuList } = storeToRefs(menuStore);

// 注册动态路由的方法
const registerRouter = async () => {
	const { data } = await getMenuList();
	// console.log(formatRoutes(data));
	setMenu(formatRoutes(data));
	for (const item of menuList.value) {
		router.addRoute(item);
	}
};

// 获取动态路由状态的标识，防止多次获取动态路由和栈溢出
let asyncRouterFlag = false;
// 路由白名单
const whiteList = ['/login', '/page-loading'];

/**
 * next可以传递参数
 * next({
 *	path: '/page-loading',
 *  query: { nextUrl: to.path }
 * });
 */
router.beforeEach(async (to, from, next) => {
	// 用户登录的token, 登陆后才存在数据
	const token: string = Cookies.get('token');
	// 在白名单内的页面，任何人可以进入
	if (whiteList.includes(to.path)) {
		next();
		return;
	}
	// 不在白名单中且已登录
	if (token) {
		/**
		 * 在使用 router.addRoutes动态添加路由后，
		 * ...to设置如果不能找到对应的路由的话，就再执行一次beforeEach((to, from, next)，直到能识别新路由为止
		 * 由于当中to的解构，会导致当前路由和前一个路由不一致，vue会抛出重定向的错误
		 * replace: true只是一个设置信息，告诉VUE本次操作后，不能通过浏览器后退按钮，返回前一个路由
		 */
		if (!asyncRouterFlag) {
			asyncRouterFlag = !asyncRouterFlag;
			await registerRouter();
			next({ ...to, replace: true });
		} else {
			if (to.matched.length) next();
		}
	} else {
		next({ name: 'login' });
	}
});

// router的onError函数捕获路由懒加载找不到对应的moudle
router.onError(error => {
	const pattern = /Loading chunk (\d)+ failed/g;
	const isChunkLoadFailed = error.message.match(pattern);
	console.log(
		isChunkLoadFailed,
		'/Loading chunk (d)+ failed/g',
		'路由懒加载找不到对应的moudle'
	);
	if (isChunkLoadFailed) {
		window.location.reload();
	} else {
		console.log(error);
	}
});

export default router;
