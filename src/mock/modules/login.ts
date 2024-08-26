// 获取验证码接口
const kaptcha = {
	url: '/api/auth/captcha', //  或者需要拦截请求的完整url `${api}/login/kaptcha`
	method: 'get',
	template: {
		msg: '获取成功',
		code: 0,
		data: {
			img: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAsMCwxMjAsNDAiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmZmYiLz48cGF0aCBmaWxsPSIjODdlZGVkIiBkPSJNOTEuOTUgMzMuNTlMOTEuODQgMzMuNDlMODkuNzcgMjcuNDRMODkuODEgMjcuNDhRODUuNzcgMTYuMDkgODAuNDcgMTAuMzhMODAuNTggMTAuNTBMODAuNTkgMTAuNTFRODIuNDAgMTEuNDYgODQuNzEgMTIuMDFMODQuNTkgMTEuODhMODQuNzQgMTIuMDRRODkuMzEgMTcuNjMgOTMuMTkgMjkuMDJMOTMuMTkgMjkuMDJMOTMuMDUgMjguODhROTUuNzcgMjEuNjQgOTYuMzggMjAuMjJMOTYuNTcgMjAuNDBMOTYuNDggMjAuMzFROTguNjIgMTUuMzEgMTAxLjEzIDEyLjM1TDEwMS4yMiAxMi40NEwxMDEuMDUgMTIuMjdRMTAzLjA1IDEyLjEwIDEwNS4zOSAxMS4zMUwxMDUuMzQgMTEuMjZMMTA1LjI0IDExLjE1UTEwMS4yMyAxNS4zNCA5OC41MSAyMS43OUw5OC40MyAyMS43MUw5OC41OCAyMS44N1E5Ny4zMiAyNS4xMyA5NC4wMiAzMy42M0w5My45OSAzMy42MEw5NC4wMyAzMy42NFE5My40MSAzMy41MiA5Mi45MCAzMy40OUw5Mi45OSAzMy41OEw5My4wMCAzMy41OVE5Mi40MCAzMy41MCA5MS44OSAzMy41M1pNOTYuMzcgMzUuNzFMOTYuNDIgMzUuNzVMOTYuNDMgMzUuNzZROTguOTIgMjYuODMgMTAwLjMxIDIzLjIyTDEwMC4zOCAyMy4yOUwxMDAuMjYgMjMuMThRMTAyLjkyIDE2LjI5IDEwNi44NiAxMS45M0wxMDYuODYgMTEuOTNMMTA2Ljk0IDEyLjAxUTEwNS45NyAxMi4yOSAxMDQuMTAgMTIuOTRMMTA0LjE5IDEzLjAzTDEwNS4xOSAxMS44MkwxMDUuMTEgMTEuNzRRMTA1LjU5IDExLjEwIDEwNi4xMyAxMC41MkwxMDYuMTMgMTAuNTJMMTA2LjEyIDEwLjUxUTEwMy41OSAxMS4zOCAxMDAuOTAgMTEuODlMMTAwLjk1IDExLjk0TDEwMS4wMSAxMi4wMFE5Ny4wMiAxNi42OCA5My41NiAyNi45MUw5My41NiAyNi45MUw5My43MCAyNy4wNFE5MC40MyAxOC4wMCA4Ny41NyAxNC4wOUw4Ny40NiAxMy45OEw4Ny40MiAxMy45NFE4Ny4xNiAxMy45NSA4Ni4zOCAxMy44Mkw4Ni4zMCAxMy43M0w4Ni4zOSAxMy44MlE4Ni4xMiAxMy40MiA4NC42OSAxMS41OUw4NC42NSAxMS41NUw4NC44NCAxMS43M1E4Mi4wMCAxMC45MCA3OS41OSA5LjY0TDc5LjcwIDkuNzZMNzkuNjEgOS42N1E4NS41NSAxNi4wMSA4OS40NiAyNy40M0w4OS41MiAyNy41MEw4OS40MyAyNy40MFE5MC42MSAzMC43NiA5MS42NiAzMy45NUw5MS41NyAzMy44Nkw5MS42MiAzMy45MVE5MS44OSAzMy45MSA5Mi42NCAzMy44MEw5Mi44MSAzMy45N0w5Mi44MiAzMy45OFE5Mi45NSAzNC40MiA5My41NiAzNS42MUw5My41NyAzNS42Mkw5My42MCAzNS42NVE5NC4zMCAzNS41NCA5NC45NSAzNS42MUw5NC45OSAzNS42NUw5NS4xMiAzNS43OFE5NS43MCAzNS43MSA5Ni4zOCAzNS43MVoiLz48cGF0aCBmaWxsPSIjYjdlNzg3IiBkPSJNNDUuNDkgMjQuOTFMNDUuNTEgMjQuOTRMNDUuMzcgMjQuODBRNDIuMzEgMzAuNTEgMzkuMjYgMzQuMDVMMzkuMjYgMzQuMDVMMzkuMzMgMzQuMTJRMzcuNTQgMzQuMzcgMzUuMzYgMzUuMTVMMzUuNDggMzUuMjdMMzUuNDUgMzUuMjRRMzkuNzMgMzAuMTMgNDMuOTcgMjIuNjJMNDQuMDIgMjIuNjdMNDQuMDMgMjIuNjhRMzkuODMgMTYuMzcgMzQuNDkgMTAuNjZMMzQuNTAgMTAuNjdMMzQuNTIgMTAuNjlRMzcuMjQgMTEuODggMzkuMjggMTIuMzJMMzkuMjggMTIuMzJMMzkuMTUgMTIuMTlRNDMuNDcgMTcuMDIgNDUuNjQgMjAuNTVMNDUuNDcgMjAuMzhMNDUuNjEgMjAuNTJRNDcuODIgMTYuNTUgNTEuMzMgMTIuNjBMNTEuMjMgMTIuNTBMNTEuMzUgMTIuNjJRNTIuNjYgMTIuMjMgNTUuNTEgMTEuNTVMNTUuNjcgMTEuNzJMNTUuNTggMTEuNjJRNTAuMjIgMTcuNDUgNDcuMTMgMjIuNzVMNDcuMDcgMjIuNjlMNDcuMTAgMjIuNzJRNTEuNjMgMzAuMzggNTUuNTQgMzQuNDVMNTUuNjcgMzQuNTlMNTUuNjcgMzQuNThRNTMuMzggMzMuODkgNTEuNTEgMzMuNjlMNTEuMzYgMzMuNTRMNTEuMzUgMzMuNTRRNDguODcgMzAuODggNDUuMzYgMjQuNzlaTTUxLjMwIDMzLjg1TDUxLjQxIDMzLjk3TDUxLjM4IDMzLjkzUTUxLjcyIDM0LjAzIDUyLjEyIDM0LjE0TDUyLjA0IDM0LjA2TDUyLjA2IDM0LjA3UTUyLjY3IDM0LjY1IDU0LjAzIDM2LjA4TDU0LjIwIDM2LjI0TDU0LjE3IDM2LjIyUTU3LjE0IDM2LjkxIDU5Ljg2IDM4LjEzTDU5Ljg3IDM4LjE0TDU5LjgzIDM4LjEwUTUzLjQ3IDMyLjIxIDQ4LjkxIDI0LjQwTDQ4Ljk0IDI0LjQyTDQ4Ljk1IDI0LjQ0UTUyLjE4IDE4LjM5IDU3LjQ1IDEyLjI3TDU3LjQ4IDEyLjMwTDU3LjQyIDEyLjIzUTU2LjI4IDEyLjk3IDU0LjM1IDEzLjQ1TDU0LjI4IDEzLjM4TDU0LjIyIDEzLjMyUTU1LjA5IDEyLjU5IDU2LjY1IDEwLjk5TDU2LjY0IDEwLjk4TDU2LjY1IDEwLjk5UTU0LjQwIDExLjY3IDUxLjExIDEyLjE4TDUxLjIwIDEyLjI4TDUxLjE5IDEyLjI2UTQ4LjEwIDE1LjY0IDQ1Ljc5IDE5LjQ4TDQ1LjczIDE5LjQyTDQ1Ljg5IDE5LjU3UTQ0LjkzIDE4LjAwIDQzLjg4IDE2LjY4TDQzLjk2IDE2Ljc2TDQxLjg0IDE0LjA2TDQxLjY0IDE0LjIwTDQxLjU5IDE0LjE2UTQxLjM3IDE0LjA3IDQxLjE3IDE0LjAwTDQxLjIxIDE0LjA0TDQxLjMxIDE0LjE0UTQwLjYyIDEzLjMyIDM5LjMwIDExLjkzTDM5LjIyIDExLjg1TDM5LjMyIDExLjk1UTM1LjkwIDExLjE1IDMzLjU5IDkuOTNMMzMuNDggOS44MkwzMy42MiA5Ljk1UTM5LjYyIDE2LjQzIDQzLjcwIDIyLjcyTDQzLjU5IDIyLjYxTDQzLjY1IDIyLjY3UTM5Ljc1IDMwLjA5IDM0LjYyIDM1Ljk3TDM0LjU2IDM1LjkxTDM0LjU0IDM1Ljg5UTM1LjYyIDM1LjIxIDM3LjUzIDM0LjcwTDM3LjYwIDM0Ljc3TDM2LjQzIDM2LjA1TDM2LjU0IDM2LjE2UTM2LjM5IDM2LjAxIDM1LjIwIDM3LjE5TDM1LjIxIDM3LjIxTDM1LjIyIDM3LjIyUTM3Ljk5IDM2LjM2IDQwLjgyIDM1LjkxTDQwLjcxIDM1LjgxTDQwLjgzIDM1LjkzUTQ0LjI1IDMxLjczIDQ2LjU2IDI3LjQ4TDQ2LjYyIDI3LjU1TDQ2LjU4IDI3LjUxUTQ5LjAzIDMxLjQ1IDUxLjQ0IDM0LjAwWiIvPjxwYXRoIGZpbGw9IiNmMGQ2ODgiIGQ9Ik0xMy42MiAzMi4zOEwxMy43MCAzMi40NkwxMy43OCAzMi41NVExNS4zOSAzMC4zNCAxOS42MyAyMy44NUwxOS41MiAyMy43NEwxOS40OSAyMy43MVEyMy4zMiAxOC40MCAyNS44NyAxNS40N0wyNS42OSAxNS4yOUwyNS44MyAxNS40M1EyMy45MiAxNS42NiAyMi4wNSAxNS42NkwyMi4xMCAxNS43MUwyMi4wMyAxNS42NVExNy4zOCAxNS42OCAxMy44MSAxNC4wOEwxMy44MyAxNC4xMEwxMy43OSAxNC4wN1ExMy4xOSAxMi4zNCAxMi41OCAxMC45NUwxMi42NCAxMS4wMUwxMi40OSAxMC44NlExNi42MSAxMi44NCAyMS42OCAxMi45NEwyMS43NSAxMy4wMUwyMS43NCAxMy4wMFEyNi4zMSAxMy4wNSAzMC45MyAxMS4zNUwzMC45MCAxMS4zM0wzMC44OCAxMS4zMFEzMC42MiAxMi4xNCAzMC4zNSAxMi44NUwzMC4zMyAxMi44MkwyOS43NCAxNC4xOEwyOS44NiAxNC4zMFEyNy4wMCAxNy40MiAyMy40MyAyMi42MkwyMy4zNyAyMi41NUwyMC40NCAyNi45MEwyMC41OCAyNy4wNFExOS4wMiAyOS4xNSAxNy4zOSAzMS4xOUwxNy4zMSAzMS4xMUwxNy40MiAzMS4yM1EyMC4zMyAzMC42MyAyMy4yOSAzMC43MEwyMy4zNiAzMC43N0wyMy4yOCAzMC42OVEyNi4yNyAzMC43OSAyOS4wOSAzMS42MUwyOS4xMSAzMS42M0wyOS41MyAzMy4wNEwyOS41MiAzMy4wM1EyOS43NyAzMy43OCAzMC4wNyAzNC41M0wzMC4wNSAzNC41MUwzMC4xMCAzNC41NlEyNS44OCAzMy4wOSAyMS4yOSAzMy4yNkwyMS4zNyAzMy4zNEwyMS4zNyAzMy4zNFExNi44MSAzMy41NCAxMi44MCAzNS4zNEwxMi42NSAzNS4xOUwxMi43NiAzNS4zMFExMy4wOSAzNC4zNCAxMy43NCAzMi41MFpNMTIuMjMgMzUuOTJMMTIuMjIgMzUuOTFMMTIuMTcgMzUuODZRMTMuMzAgMzUuMzYgMTQuMDEgMzUuMTJMMTMuOTkgMzUuMTBMMTQuMDYgMzUuMTdRMTMuNzkgMzUuODIgMTMuMTggMzcuMThMMTMuMDMgMzcuMDNMMTMuMDYgMzcuMDZRMTguMjcgMzUuMjcgMjMuNjAgMzUuNDdMMjMuNjUgMzUuNTJMMjMuNTcgMzUuNDNRMjkuMjAgMzUuNjIgMzMuNjggMzguMTBMMzMuNzEgMzguMTRMMzMuNjIgMzguMDRRMzIuNDQgMzUuOTggMzEuNzMgMzQuMDRMMzEuNzYgMzQuMDhMMzEuNjcgMzMuOThRMzEuMzUgMzMuOTAgMjkuOTkgMzMuMzlMMjkuOTkgMzMuMzlMMjkuOTQgMzMuMzVRMjkuODUgMzIuNzQgMjkuNDcgMzEuNDJMMjkuNDAgMzEuMzRMMjkuMzggMzEuMzJRMjUuNjAgMzAuMTkgMjEuMDQgMzAuMzZMMjEuMTEgMzAuNDNMMjEuMDMgMzAuMzVRMjMuMDIgMjcuOTkgMjYuMTkgMjMuMDNMMjYuMjMgMjMuMDdMMjYuMjUgMjMuMDlRMjkuNTAgMTcuOTggMzEuMjAgMTUuNzBMMzEuMTMgMTUuNjNMMzEuMDUgMTUuNTZRMzEuNjcgMTQuNDcgMzIuNTkgMTIuMDZMMzIuNTAgMTEuOTdMMzIuNDQgMTEuOTFRMzEuODMgMTIuMjIgMzAuNTMgMTIuNzZMMzAuNjkgMTIuOTFMMzAuNjUgMTIuODhRMzAuOTAgMTIuMTAgMzEuNTQgMTAuNzRMMzEuNTkgMTAuNzlMMzEuNjQgMTAuODRRMjYuODYgMTIuNzIgMjEuNzYgMTIuNjVMMjEuNjMgMTIuNTJMMjEuNjEgMTIuNTBRMTYuMzkgMTIuNTIgMTEuOTcgMTAuMjdMMTIuMDAgMTAuMzFMMTEuODYgMTAuMTZRMTMuMDEgMTIuNDAgMTMuNjYgMTQuNDFMMTMuNjkgMTQuNDRMMTMuNjEgMTQuMzZRMTQuNTAgMTQuNzQgMTUuMjEgMTQuOTRMMTUuMjQgMTQuOTdMMTUuMzMgMTUuMDZRMTUuNTQgMTUuNjUgMTUuNzggMTYuOTRMMTUuNzkgMTYuOTRMMTUuODAgMTYuOTZRMTkuMDIgMTcuODAgMjMuMzcgMTcuNjNMMjMuMzkgMTcuNjVMMjMuNDQgMTcuNjlRMjEuMjkgMjAuNTQgMTguMzMgMjUuMDBMMTguMzkgMjUuMDZMMTMuMzkgMzIuNDJMMTMuNTMgMzIuNTZRMTMuMTQgMzMuNjQgMTIuMjIgMzUuOTJaIi8+PHBhdGggZmlsbD0iIzVjZGZkZiIgZD0iTTYyLjI2IDExLjgzTDYyLjIwIDExLjc3TDYyLjI3IDExLjg0UTYzLjkxIDE2LjE0IDY0LjQyIDIwLjc2TDY0LjM4IDIwLjcyTDY0LjQzIDIwLjc3UTY3Ljc1IDE3LjA4IDczLjAyIDEyLjc3TDczLjA2IDEyLjgxTDcyLjk1IDEyLjcwUTc1LjkzIDEyLjU1IDc4LjI3IDExLjg0TDc4LjI3IDExLjg0TDcyLjQ1IDE2Ljg5TDcyLjQ2IDE2LjkwUTY5LjI2IDE5LjM4IDY2LjcxIDIxLjkzTDY2LjcxIDIxLjkyTDY2LjgyIDIyLjA0UTczLjk2IDMwLjIzIDc4LjQ4IDM0LjQ0TDc4LjM0IDM0LjMxTDc4LjQzIDM0LjM5UTc1LjY3IDMzLjU3IDczLjU5IDMzLjQzTDczLjU2IDMzLjQwTDczLjY0IDMzLjQ4UTY4LjUyIDI4LjcwIDY0LjY4IDIzLjQ5TDY0LjU5IDIzLjQxTDY0LjUxIDIzLjMzUTY0LjY4IDI5LjMxIDYzLjAxIDM0LjA3TDYzLjAwIDM0LjA1TDYyLjk3IDM0LjAyUTYyLjczIDM0LjAyIDYyLjI5IDM0LjE5TDYyLjM4IDM0LjI5TDYyLjMwIDM0LjM3TDYyLjM2IDM0LjQ0UTYyLjE4IDM0LjQ2IDU5LjkwIDM1LjI3TDU5LjgwIDM1LjE3TDU5Ljk0IDM1LjMxUTYyLjYwIDI5LjQ3IDYyLjI5IDIyLjgxTDYyLjIwIDIyLjcyTDYyLjMwIDIyLjgyUTYxLjkwIDE2LjE2IDU4Ljc0IDEwLjM1TDU4Ljc3IDEwLjM5TDU5LjIxIDEwLjU5TDU5LjY5IDEwLjk3TDU5LjY1IDEwLjg5TDU5LjU5IDEwLjgzUTYwLjM4IDExLjMyIDYyLjM1IDExLjkzWk02Mi42MCAxMS42N0w2Mi40NiAxMS41M0w2Mi42MCAxMS42NlE2MC41NSAxMS4xNCA1OC4yMCA5Ljc4TDU4LjExIDkuNjhMNTguMjAgOS43OFE2Mi4wNCAxNi4zMCA2Mi4wNCAyNC4yOUw2Mi4wMCAyNC4yNUw2Mi4wMiAyNC4yN1E2Mi4wMSAzMC41MSA1OS4zNiAzNS45Mkw1OS4yMiAzNS43OEw2MS4xMyAzNS4xMUw2MS4yMSAzNS4xOVE2MC43MCAzNS45MyA2MC4wOCAzNy4wOUw2MC4xOCAzNy4xOEw2MC4xMyAzNy4xM1E2Mi4xNSAzNi40MyA2My44OCAzNi4wNkw2My44MSAzNS45OUw2My45MSAzNS44OEw2My45MyAzNS45MFE2NC4xNyAzNS44NyA2NC42OCAzNS43M0w2NC43NyAzNS44M0w2NC43MSAzNS43NlE2Ni4yMyAzMC41MyA2Ni4zNCAyNi4yNEw2Ni4yMSAyNi4xMkw2Ni4zNiAyNi4yN1E2OC4wOSAyOC4zNyA2OS43MiAzMC4wNEw2OS43MyAzMC4wNUw2OS43MiAzMC4wNFE3MC43OCAzMS4wMyA3My40NyAzMy42OEw3My41NSAzMy43N0w3My41MiAzMy43NEw3My41OSAzMy44MFE3NC4zNSAzNC40MCA3Ni4wMiAzNS44Mkw3Ni4xNiAzNS45Nkw3Ni4xNSAzNS45NlE3OS41OCAzNi41NiA4Mi42NyAzOC4wOUw4Mi42OSAzOC4xMUw4Mi42NyAzOC4wOVE3NC4zMiAzMC4zOCA2OC43NCAyMy43Nkw2OC43MCAyMy43MUw2OC43MyAyMy43NFE3Mi43MyAxOS45OSA4MC41NSAxMi4zMUw4MC40NiAxMi4yM0w4MC42MSAxMi4zN1E3OC4yNCAxMy4zMCA3Ni40NCAxMy42NEw3Ni40NSAxMy42NUw3Ni40OCAxMy42OFE3Ny41NSAxMi43OCA3OS42MiAxMC45OEw3OS42OSAxMS4wNUw3OS41NiAxMC45MVE3NS45NyAxMi4yNSA3Mi45OCAxMi40Mkw3Mi45OSAxMi40M0w3Mi45OCAxMi40M1E3MC4yOSAxNC4zMyA2NS45NCAxOC41MUw2Ni4wNiAxOC42Mkw2Ni4wNyAxOC42NFE2NS43MiAxNi4zMSA2NS4yMSAxNC4wNEw2NS4wNiAxMy44OUw2NS4xMyAxMy45NVE2NC4xMCAxMy44NCA2My4yMSAxMy41NEw2My4xMyAxMy40Nkw2My4yOCAxMy42MFE2My4wNSAxMi44OSA2Mi41NCAxMS42MFoiLz48cGF0aCBkPSJNNSAzOSBDNDYgMzcsNTIgMTQsMTAzIDMxIiBzdHJva2U9IiNlNzVmZTciIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMTkgMjUgQzc0IDEwLDQyIDM4LDExNCA3IiBzdHJva2U9IiM2MWM3ZTkiIGZpbGw9Im5vbmUiLz48L3N2Zz4=',
			id: 'O7e-VRFF'
		}
	}
};

// 登陆获取用户信息接口

const signIn = {
	url: '/api/auth/login',
	method: 'post',
	// template: loginRes
	template: {
		msg: '获取成功',
		code: 0,
		data: {
			id: 18,
			name: 'baojun',
			token: 'admin_login_token.12345678'
		}
	}
};

const logout = {
	url: '/login/logout',
	method: 'get',
	template: {
		msg: '退出成功',
		code: 0
	}
};

const arrApi = [kaptcha, signIn, logout];

export default arrApi;
