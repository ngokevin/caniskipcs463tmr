var irc = require("irc");


var config = {
    channels: ["#caniskipcs463tmr"],
    server: "irc.freenode.net",
    botName: "caniskipcs463tmr"
    password: "password"
};
var bot = new irc.Client(config.server, config.botName, {
    channels: config.channels
});


bot.say('NickServ', 'identify ' + config.password);
bot.say('ChanServ', 'invite ' + config.channels[0]);


bot.addListener("message", function(from, to, text, message) {
    var dates = {
        // Define day before classes (0-11 month).
        '20130309': 'Walk-throughs',
        '20130330': 'Speaker: Credit Scores',
        '20130407': 'Elevator Talks',
        '20130428': 'Speaker: Parallel Computing',
    }

    if (text.indexOf('caniskipcs463tmr') !== -1) {
        var currentDate = calcTime(-7);  // Pacific Daylight Time.
        var prettyDate = (currentDate.getFullYear() + ("0" + currentDate.getMonth()).substr(-2) +
                          ("0" + currentDate.getDate()).substr(-2));

        if (prettyDate in dates) {
            bot.say(config.channels[0], "Get your ass to class tomorrow. " + dates[prettyDate]);
        } else {
            bot.say(config.channels[0], "Skip, ain't nobody got time for that.");
        }
    }
});


function calcTime(offset) {
    d = new Date();
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000*offset));
}
