const Discord = require('discord.js-selfbot');
//const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();
var guildId = "none";

client.on('ready', m=>{
    console.log("Le self-bot bot est prêt Dimzou#0001");
    send(guildId, data);
});

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

if (!fs.existsSync('./message.txt')) fs.writeFileSync('./message.txt', "ENTREZ VOTRE MESSAGE");
const data = fs.readFileSync('./message.txt', 'utf8');
if (data == "ENTREZ VOTRE MESSAGE") {
    console.info('Fichier message.txt crée. Écrivez votre message dedans.');
    rl.question("Appuyez sur entrer pour fermer", function() {
        rl.close();
        process.exit();
    });
} else {
    rl.question("Entrez le token : ", function(token) {
        rl.question("Entrez l'id du serveur : ", function(guildIdb) {
            guildId = guildIdb;
            console.log('Connexion en cours...');
            client.login(token);
            rl.close();
        });
    });
}

async function send(guildId, data) {
    var members = await client.guilds.cache.get(guildId).members.fetch();
    var membersId = members.map(member=>member.id);
    var max = membersId.length, i = 0;
    function inter() {
        if (i>=max) return console.log('Terminé');
        setTimeout(() => {
            var member = members.get(membersId[i])
            console.log('Message envoyé a ' + member.user.tag);
            if (member.id != client.user.id) {
                member.send(data).catch(()=>{});
            }
            i++;
            return inter();
        }, 5000);
    };
    inter();
}

//const ctl = new Discord.Client();

process.on('unhandledRejection', error => {
	console.error(error);
});