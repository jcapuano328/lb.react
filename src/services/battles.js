'use strict';

var battles = require('../stores/battles.json');
var rules = {
    "aspern_essling": require('../stores/aspern_essling.json'),
    "friedland": require('../stores/friedland.json'),
    "halle": require('../stores/halle.json'),
    "leipzig": require('../stores/leipzig.json'),
    "neumarkt": require('../stores/neumarkt.json'),
    "raszyn": require('../stores/raszyn.json'),
    "schoengrabern": require('../stores/schoengrabern.json'),
	"austerlitz": require('../stores/austerlitz.json')
};


module.exports = {
    battles: battles,
    battle(battleid) {
        return battles.find((b,i) => b.id == battleid) || {scenarios:[]};
    },
    scenario(scenarioid) {
        var data = {};
        let battle = battles.find((b,i) => {
            data.scenario = b.scenarios.find((s,i) => s.id === scenarioid);
            return !!data.scenario;
        });
        if (battle) {
            data.id = battle.id;
            data.name = battle.name;
            data.image = battle.image;
            data.sides = battle.sides || ['imperial','coalition'];

            return data;
        }
    },
    rules(battleid) {
        let battle = this.battle(battleid);
        if (battle && battle.image && rules[battle.image]) {
            return rules[battle.image];
        }
        return {};
    }    
};
