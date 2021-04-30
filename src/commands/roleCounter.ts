const PREFIX = require('../../option.json').PREFIX

const name = 'countrole'
const usage = `${PREFIX}${name}`

exports.run = async (client: any, message: any, args: any) => {
	let roleNames = ["3학년", "2학년", "1학년", "SW개발", "디자인", "영상", "사물인터넷"]
	let roleInfos: any = {}
	for (let i = 0; i < roleNames.length; i++) {
		let roleID = message.guild.roles.cache.find((role: any) => role.name === roleNames[i])
		roleInfos.roleNames[i].count = message.guild.roles.cache.get(roleID).members.map((m: any) => m.user.id)
	}
	console.log(roleInfos.roleNames[0])

	// let tYear = message.guild.roles.cache.find((role: any) => role.name === "3학년"),
	// 	sYear = message.guild.roles.cache.find((role: any) => role.name === "2학년"),
	// 	fYear = message.guild.roles.cache.find((role: any) => role.name === "1학년")

	// let software = message.guild.roles.cache.find((role: any) => role.name === "SW개발"),
	// 	design = message.guild.roles.cache.find((role: any) => role.name === "디자인"),
	// 	vedio = message.guild.roles.cache.find((role: any) => role.name === "영상"),
	// 	IoT = message.guild.roles.cache.find((role: any) => role.name === "사물인터넷")

	// message.guild.roles.cache.get('ROLE-ID').members.map((m: any) => m.user.id)
}

exports.name = name
exports.usage = usage