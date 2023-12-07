// requerimiento
const Discord = require('discord.js');

//definir cliente 
const Client = new Discord.Client({
    intents: 32769,
});

//contenido
//**************** */
Client.on('ready', async ( client ) => {
    console.log('Estoy listo!')
});

Client.on('messageCreate', async ( message ) => {
    //si el autor del mensaje es un bot paramos la funcion.
    if(message.author.bot) return;
    //si el contenido del mensaje no comienza con '!' paramos la funcion.
    if(!message.content.startsWith('!')) return;

    //HANDLER
    try{
        const command = message.content.toLowerCase().slice(1).split(' ')[0];
        console.log(command)
        const executeCommand = require(`./commands/${command}.js`);
        executeCommand( message );
    } catch (error) {
        console.log(`${message.content} no es un comando válido.`)
    }
});

Client.on('guildMemberAdd',async ( member) =>{
    const {user} = member;
    const embed = {
        title: `${user.username} se ha unido al servidor!`,
        description: 'Bienvenid@ seas al servidor, sercuerda verificarte en el canal de #verificacion para tener acceso a todos los canales',
        color: 0x5BFF8A,
        thumbnail: {url: user.avatarURL()}
    };

    // Id del canal de bienvenidas
    const channelId = '1181106261681524756';
    Client.channels.fetch(channelId)
        .then(channel => channel.setDefaultAutoArchiveDuration({embeds: [embed]}));
});
//****************** */

//conectar
Client.login('')