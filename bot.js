//
// GET UR BOT SETUP ON THE DISCORD OFFICAL TUTORIAL AND CHANGE THE TOKEN ON THE SETTINGS BEFORE RUNNING
//
const botSettings = require("./settings.json");
const Discord = require("discord.js");

// Creates a new instance of discord so we can log in with our token
const client = new Discord.Client({disableEveryone: true});

// Adds a listener to the ready event
client.on("ready", async () => {
    console.log(`Mayushii is ready! ${client.user.username}`)

    // Generates an auto invite to the bot and gives it ADMINISTRATOR rights
    try{
        let link = await client.generateInvite(["ADMINISTRATOR"]);
        console.log(link);
    } catch(e){
        console.log(e.stack);
    }
});

client.on("message", async message => {
    // Checks if the message wrote was from a bot and if the user is messaging in a dm
    if(message.author.bot)  return;
    if(message.channel.type  === "dm") return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    console.log("Command + args:" +command + args);

    if(!command.startsWith(botSettings.prefix)) return;

    if(command === `${botSettings.prefix}?`){
        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.username)
            .setDescription("Hey " + message.author.username + " Tuuuuturuuuuuu!!!!");
        
            message.channel.sendEmbed(embed);
    }

    if(command === `${botSettings.prefix}okarin`){
        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.username)
            .setDescription(message.author.username + "  you are not Okarin!!!! Mayushii is sad now :(");
        
            message.channel.sendEmbed(embed);
    }
    
    if(command === `${botSettings.prefix}tuturu`){
        // Voice only works in guilds, if the message does not come from a guild,
    // we ignore it
    console.log("tuturu on!");
    if (!message.guild) return;
  
    if (message.content === '!tuturu') {
      // Only try to join the sender's voice channel if they are in one themselves
      if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
          .then(connection => { // Connection is an instance of VoiceConnection
            message.reply('Mayushii has successfully connected to the channel!');

            const dispatcher = connection.playFile('./tuturu.mp3');
            dispatcher.setVolume(2);
            // Play an mp3 from a URL
            //connection.playArbitraryInput('https://www.youtube.com/watch?v=IaauFCfPdKs');
          })
          .catch(console.log);
      } else {
        message.reply('You need to join a voice channel first!');
      }
    }
    }
});

client.login(botSettings.token);
