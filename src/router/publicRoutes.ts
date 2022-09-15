// vite不再默认忽略.vue扩展名，所以要写全路径
// 这样类似vscode这种编辑器可以更好的识别，js和ts相关文件还是默认忽略
import Login from '@/views/Login/index.vue';

const publicRoutes = [
	{
		path: '/login',
		name: 'login',
		component: Login,
		meta: {
			title: '登陆页'
		}
	}
];

export default publicRoutes;
