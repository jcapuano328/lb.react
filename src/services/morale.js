'use strict'
var Base6 = require('./base6');

module.exports = {
    check(morale,mod,die1,die2) {
        let moraleDice = Base6.add((die1 * 10) + die2, mod);
        return (moraleDice > morale);
    },
    resolvePossible(dice) {
        return [
            {morale: '<='+Base6.add(dice, -1), modifier: '', result: true},
            //{morale: '', modifier: '', result: false},            
            {morale: '>='+dice, modifier: '0', result: false},
            {morale: '>='+Base6.add(dice, -3), modifier: '-3', result: false},            
            {morale: '>='+Base6.add(dice, -6), modifier: '-6', result: false},
            {morale: '>='+Base6.add(dice, -9), modifier: '-9', result: false}            
        ];
    },
    range(dice) {
        return [
            {morale: '>'+Base6.add(dice, -12), modifier: '-12', result: true},
            {morale: '>'+Base6.add(dice, -9), modifier: '-9', result: true},
            {morale: '>'+Base6.add(dice, -6), modifier: '-6', result: true},
            {morale: '>'+Base6.add(dice, -3), modifier: '-3', result: true},
            {morale: '>'+dice,               modifier: '0', result: true},
            {morale: '>'+Base6.add(dice, 3), modifier: '3', result: true},            
            {morale: '>'+Base6.add(dice, 6), modifier: '6', result: true},
            {morale: '>'+Base6.add(dice, 9), modifier: '9', result: true},
            {morale: '>'+Base6.add(dice, 12), modifier: '12', result: true}
        ];
    }    
    
};
