const { Command } = require('klasa');
const sim = require('string-similarity');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'playing',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 0,
      botPerms: [],
      requiredConfigs: [],
      description: 'Find games guild members are playing.',
      quotedStringSupport: true,
      usage: '<game:str>',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg, [...game]) {
    const stat = [];
    const pad = [];
    let ctr = 1;
    let str = game.join(' ');

    for (let i = 0; i < msg.guild.members.array().length; i++) { if (sim.compareTwoStrings(mem.user.presence.activity.name, str) >= 0.65) stat.push(mem.user.tag); }
    const pctr = pad.sort((a, b) => a.length < b.length)[0].length;

    stat.push(`== ${msg.guild.name} :: '${game}' ==\n`);
    await msg.guild.members.array().forEach(mem => {
      if (!mem.user.presence.activity || !mem.user.presence.activity.name) return;
      if (sim.compareTwoStrings(mem.user.presence.activity.name, str) >= 0.65) stat.push(`${ctr <= 9 ? ' ' + ctr++ : ctr++}. :: ${String(mem.user.tag).padEnd(pctr)} is playing ${mem.user.presence.activity.name}\n`);
    });
    if (stat.length <= 1) return msg.send(`I could not find any guild members playing \`${game}\``);
    else return msg.send(stat, { code: 'asciidoc', split: true });
  }
};