// vite不再默认忽略.vue扩展名，所以要写全路径
// 这样类似vscode这种编辑器可以更好的识别，js和ts相关文件还是默认忽略
import Login from '@/views/Login/index.vue';
import Layout from '@/layout/index.vue';
import Error from '@/views/Error/index.vue';
import Error401 from '@/views/Error/401/index.vue';
import Error404 from '@/views/Error/404/index.vue';
import Redirect from '@/views/Redirect/index.vue';

const publicRoutes = [
	{
		path: '/login',
		name: 'login',
		component: Login,
		meta: {
			title: '登陆页'
		}
	},
	// 重定向刷新路由
	{
		path: '/redirect',
		name: 'redirect',
		component: Layout,
		meta: {
			title: ''
		},
		children: [
			{
				path: '/redirect/:path(.*)',
				component: Redirect
			}
		]
	},
	{
		path: '/error',
		name: 'error',
		component: Error,
		redirect: '/error/401', 
		meta: {
			title: '错误提示页面'
		},
		children: [
			{
				path: '/401',
				name: '401',
				component: Error401,
				meta: {
					title: '401'
				}
			},
			{
				path: '/404',
				name: '404',
				component: Error404,
				meta: {
					title: '404'
				}
			}
		]
	}
];

export default publicRoutes;
