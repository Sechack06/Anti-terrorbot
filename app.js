const Discord = require('discord.js')
const client = new Discord.Client()
let contents = []
let samechannelidcount = []
let channelidlist = []

function givemute(list, server){
    let i = 0
    while(list[i]){
        server.members.cache.forEach((member) => {
            if(member.id === list[i].id){
                server.roles.cache.forEach((role) => {
                    if(role.name === "mute"){
                        member.edit({roles: null}).then(() => {
                            member.roles.add(role)
                        })
                    }
                })
            }
        })
        i++
    }
}

function terrorproc(msg, msglist, server){
    let i = 0
    let userlist = []
    while(msglist[i]){
        if(userlist.includes(msglist[i].user)){
            i++
            continue
        }else if(msglist[i].channelid != msg.channel.id){
            i++
            continue
        }else{
            userlist.push(msglist[i].user)
            i++
        }
    }
    givemute(userlist, server)
    i = 0
    while(userlist[i]){
        userlist[i].send("당신은 DFIC서버의 ``" + msg.channel.name + "`` 채널에서 서버 테러(여러명이서 도배)가 의심되는 구간에서 메시지를 보냈으므로 뮤트처리 되었습니다. 이의 있으시면 관리자에게 문의하세요.")
        i++
    }
    i = 0
    sendstring = ""
    while(userlist[i]){
        sendstring += "<@" + userlist[i].id + "> "
        i++
    }
    sendstring += "언급된 사람들은 서버 테러(여러명이서 도배)가 의심되어 뮤트시켰습니다."
    msg.channel.send(sendstring)
    contents = []; samechannelidcount = []; channelidlist = []; useridlist = []
}

client.on('ready', () => {
  console.log("ready")
})

client.on('message', (msg) => {
    if(msg.channel.type == 'dm'){
        return
    }if(msg.channel.name === "반성의-방"){
        return
    }if(msg.author.bot && msg.author.id === "786901377087307776"){
        return
    }if(msg.channel.name === "반성의-방"){
        return
    }
    let server = msg.guild
    let user = msg.author

    contents.push({user: user, content: msg.content, channelid: msg.channel.id})
    channelidlist.push(msg.channel.id)
    samechannelidcount = channelidlist.reduce((t, a) => { t[a] = (t[a] || 0)+1; return t }, {})
    if(samechannelidcount[msg.channel.id] >= 16){
        terrorproc(msg, contents, server)
    }
})

setInterval(() => {contents = []; samechannelidcount = []; channelidlist = []; useridlist = []}, 10000)

client.login(process.env.token)