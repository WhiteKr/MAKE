import Discord from 'discord.js'
const client = new Discord.Client()
import fs from 'fs'

const DISCORDKEY = require('../option.json').KEYS.DISCORD
const PREFIX = require('../option.json').PREFIX
const ALLOWSERVER = require('../option.json').ALLOWSERVER

function requireUncached(module: any) {
	delete require.cache[require.resolve(module)]
	return require(module)
}

const commands: any = new Discord.Collection()
commands.load = (dir: any) => {
	for (const file of fs.readdirSync(dir)) {
		requireUncached(`./commands/${file}`)
		const cmd = require(`./commands/${file}`)
		commands.set(cmd.name, cmd)
	}
	// console.log(commands.map((c: any) => c.name).join(', ') + ' 명령어가 로드됨.')
}

// on message
client.on('message', (message: any) => {
	if (message.author.bot) return
	if (!message.content.startsWith(PREFIX)) return
	if (ALLOWSERVER.indexOf(message.guild.id.toString()) == -1) return;

	commands.load(__dirname + "/commands")

	const args = message.content.slice(PREFIX.length).trim().split(/ +/g); // !명령어 어쩌구 저쩌구 
	const command = args[0]

	let cmd = commands.get(command)
	//get는 컬렉션 내에 해당 key 값을 가진 데이터가 없으면 false 값을 반환하므로 부분적으로 Collection#has처럼 사용할수 있습니다.

	if (cmd) {
		const date = new Date()
		const month = date.getMonth() + 1
		const day = date.getDate()
		const hour = date.getHours()
		const minute = date.getMinutes()
		const second = date.getSeconds()
		const timeInfo = `${month}.${day}. ${hour}:${minute}:${second}`
		if (message.channel.type == 'dm') {
			console.log(`\n${message.author.tag} (DM) (${timeInfo})\n  ${message.content}\n`)
		} else {
			console.log(`\n${message.author.tag} in ${message.channel.name} of ${message.guild.name} (${timeInfo})\n  ${message.content}\n`)
		}
		cmd.run(client, message, args)
	}
})

// login
client.login(DISCORDKEY).then(() => {
	console.log('봇이 준비되었습니다')
	console.log('Logging in...')
	client.user?.setActivity('전원 켜지는 중...', { type: 'PLAYING' })
})

// on ready
client.on('ready', () => {
	const activities_list = [
		`${client.user?.username}봇의 접두사는 ${PREFIX} 입니다`,
		`오류나 건의 사항은 White_Choco#9170으로.`
	]
	let index = 0
	console.log(`Logged in as ${client.user?.tag}!`)
	setInterval(() => {
		client.user?.setActivity(activities_list[index])
		if (index == activities_list.length - 1)
			index = 0
		else
			index++
	}, 6000)
})

// on messageReactionAdd
client.on("messageReactionAdd", function (reaction, user) {
	if (!user.bot) messageReaction[reaction.message.id] != null ?
		messageReaction[reaction.message.id].onClick(reaction, user, messageReaction[reaction.message.id].message) : null
})
// on messageReactionRemove
client.on("messageReactionRemove", function (reaction, user) {
	if (!user.bot) messageReaction[reaction.message.id] != null ?
		messageReaction[reaction.message.id].onClick(reaction, user, messageReaction[reaction.message.id].message) : null
})
// messageReaction.send
let messageReaction: any = {}
module.exports.send = function (str: any, arr: any, callback: any, message: any) {
	try {
		if (typeof callback != "function") return "It is not a function."
		if (!Array.isArray(arr)) return "It is not an array."
		message.channel.send(str).then((message: any) => {
			arr.forEach((val) => {
				message.react(val).catch((e: any) => { })
			})
			if (callback != null) {
				messageReaction[message.id] == null ? messageReaction[message.id] = {} : null
				messageReaction[message.id].message = message
				messageReaction[message.id].onClick = callback
			}
		}).catch((e: any) => { })
	} catch (e) {
		console.error(e)
	}
}