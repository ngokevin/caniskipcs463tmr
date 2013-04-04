var irc = require('irc');


var config = {
    channel: '#osu-cs463',
    server: 'irc.freenode.net',
    botName: 'caniskipcs463tmr',
    password: 'password'
};
var bot = new irc.Client(config.server, config.botName);


bot.addListener('error', function(message) {
    console.log(message);
});


bot.addListener('registered', function(message) {
    console.log('Identifying and inviting.');
    bot.send('/msg nickserv identify ' + config.password);
    bot.send('/msg chanserv invite ' + config.channel);
    setTimeout(function() {
        bot.join(config.channel);
    }, 20000);
});

bot.addListener('message', function(from, to, text, message) {
    var dates = {
        // Define day before classes (0-11 month).
        '20130309': 'Walk-throughs',
        '20130330': 'Speaker: Credit Scores',
        '20130407': 'Elevator Talks',
        '20130428': 'Speaker: Parallel Computing',
    }

    if (text.indexOf('caniskipcs463tmr') !== -1) {
        var currentDate = calcTime(-7);  // Pacific Daylight Time.

        if ([1, 3].indexOf(currentDate.getDay()) === -1) {
            bot.say(config.channel, "Son be trippin'. You don't have CS463 tomorrow.");
            return;
        }

        var prettyDate = (currentDate.getFullYear() + ('0' + currentDate.getMonth()).substr(-2) +
                          ('0' + currentDate.getDate()).substr(-2));

        if (prettyDate in dates) {
            bot.say(config.channel, 'Get your ass to class tomorrow. ' + dates[prettyDate]);
        } else {
            bot.say(config.channel, "Skip, ain't nobody got time for that.");
        }
    }
});


function calcTime(offset) {
    d = new Date();
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000*offset));
}
