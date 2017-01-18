'use strict'

import {Store,Log} from 'react-native-app-nub';
var store = Store('lb.app.current');
var Battles = require('./battles');
var Phases = require('./phases');
var log = Log;
var moment = require('moment');
var TURN_MINS = 20;

var _current = {};

let maxTurns = () => {
	let gamedata = Battles.scenario(_current.scenario);
	let sd = new Date(gamedata.scenario.start.year, gamedata.scenario.start.month-1, gamedata.scenario.start.day, gamedata.scenario.start.hour, gamedata.scenario.start.minute);
	let ed = new Date(gamedata.scenario.end.year, gamedata.scenario.end.month-1, gamedata.scenario.end.day, gamedata.scenario.end.hour, gamedata.scenario.end.minute);
	let diff = moment.duration(ed.getTime() - sd.getTime());
	let mins = (diff.hours()*60) + diff.minutes();
	return (mins / TURN_MINS) + 1;
}

module.exports = {
	load() {
		return store.load()
		.then((current) => {
        	_current = current || {};
			_current.player = _current.player || 0;
			if (_current.player == 'imperial') { _current.player = 0;}
			else if (_current.player == 'coalition') { _current.player = 1;}
            return _current;
		});
	},
	save() {
		return store.save(_current);
	},
	remove() {
		return store.remove()
		.then(() => {
			_current = null;
		});
	},
	reset(data) {
		let current = {};
		current.battle = data.id;
		current.scenario = data.scenario.id;
		current.turn = 1;
		current.phase = 0;
		current.player = 0;
		current.victory = {
			"0": 0,
			"1": 0
		};
		
		return store.save(current)
		.then(() => {
			_current = current;
			return _current;
		});
	},
	turn() {
		var gamedata = Battles.scenario(_current.scenario);
		var d = moment(new Date(gamedata.scenario.start.year, gamedata.scenario.start.month-1, gamedata.scenario.start.day, gamedata.scenario.start.hour, gamedata.scenario.start.minute));
		var o = (_current.turn - 1) * TURN_MINS;
		d.add(o, 'minutes');
		let str = d.format("MMM DD, YYYY HH:mm");
		//log.debug('turn: ' + str);
		return str;
	},
	prevTurn(dosave) {
		//log.debug('prev turn: ' + _current.turn);
		if (--_current.turn < 1) {
			_current.turn = 1;
		}
        let turn = this.turn();
		if (dosave) {
        	return this.save()
            .then(() => {
            	return turn;
			});
		}
        return new Promise((resolve, reject) => {
        	resolve(turn);
        });
	},
	nextTurn(dosave) {
		//log.debug('next turn: ' + _current.turn);
		var maxturns = maxTurns();
		//log.debug('max turns: ' + maxturns);
		if (++_current.turn >= maxturns) {
			_current.turn = maxturns;
		}
        let turn = this.turn();
		if (dosave) {
        	return this.save()
            .then(() => {
            	return turn;
			});
		}
        return new Promise((resolve, reject) => {
        	resolve(turn);
        });
	},
	phase() {
		let phase = Phases.get(_current.phase);
		//log.debug('phase: ' + phase);
		return phase;
	},
	prevPhase() {
		if (--_current.phase < 0) {
			_current.phase = Phases.count - 1;
			if (_current.player == 0) {
				this.prevTurn(false);
				_current.player = 1;
			} else {
				_current.player = 0;
			}
		}
    	return this.save()
        .then(() => {
        	return this.phase();
		});
	},
	nextPhase() {
		if (++_current.phase >= Phases.count) {
			_current.phase = 0;
			if (_current.player == 1) {
				this.nextTurn(false);
				_current.player = 0;
			} else {
				_current.player = 1;
			}
		}
    	return this.save()
        .then(() => {
        	return this.phase();
		});
	},
	nextPlayer() {
		if (_current.player == 1) {
			_current.player = 0;
		} else {
			_current.player = 1;
		}
		return this.save()
        .then(() => {
        	return this.player();
		});
	},
	player() {
		return _current.player;
	},
	victory(plyr, vp) {
		if (typeof vp != 'undefined') {
			_current.victory[plyr.toString()] = vp;
		}
		return _current.victory[plyr.toString()];
	},
	victoryLevel() {
		let vp = _current.victory['0'] - _current.victory['1'];
		let s = this.scenario();
		if (s.scenario.hasOwnProperty('victory')) {
			let v = s.scenario.victory.find((v) => vp >= v.low && vp <= vp.high) || {level:''};
			return v.level;
		}
		return vp.toString();
	},
	
	battle() {
		return Battles.battle(_current.battle);
	},
	scenario() {
		return Battles.scenario(_current.scenario);		
	}
};
