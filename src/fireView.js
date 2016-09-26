'use strict'
var React = require('react');
import { View, Text, Switch } from 'react-native';
var FireAttackerView = require('./fireAttackerView');
var FireDefenderView = require('./fireDefenderView');
var OddsView = require('./oddsView');
var ResultsView = require('./fireResultsView');
var DiceModifiersView = require('./diceModifiersView');
var DiceRoll = require('./widgets/diceRoll');
var Fire = require('./services/fire');
var LeaderLoss = require('./services/leaderloss');
var Base6 = require('./services/base6');

var dice = [
    {num: 1, low: 1, high: 6, color: 'red'},
    {num: 1, low: 1, high: 6, color: 'white'},
    {num: 1, low: 1, high: 6, color: 'blue'},
    {num: 1, low: 1, high: 6, color: 'blackw'},
    {num: 1, low: 1, high: 6, color: 'blackr'}
];

var FireView = React.createClass({
    getInitialState() {
        return {
            attack: '1',
            defend: '1',
            incr: '0',
            odds: Fire.defaultOdds,
            cannister: false,
            die1: 1,
            die2: 1,
            die3: 1,
            die4: 1,
            die5: 1,
            result: '',
            leader: '',
            loss: '',
            mortal: false
        };
    },
    calcOdds(attack, defend, cannister) {
        // calc odds
        var odds = Fire.calculate(+attack, +defend, cannister);
        return odds;
    },
    onAttackerAdd(v) {
        v = +this.state.attack + (+v);
        this.state.odds = this.calcOdds(v, this.state.defend, this.state.cannister);
        this.state.attack = v.toString();
        this.onResolve();
    },
    onAttackerChanged(v) {
        this.state.odds = this.calcOdds(v, this.state.defend, this.state.cannister);
        this.state.attack = v.toString();
        this.onResolve();
    },
    onDefenderAdd(v) {
        v = +this.state.defend + (+v);
        this.state.odds = this.calcOdds(this.state.attack, v, this.state.cannister);
        this.state.defend = v.toString();
        this.onResolve();
    },
    onDefenderChanged(v) {
        this.state.odds = this.calcOdds(this.state.attack, v, this.state.cannister);
        this.state.defend = v.toString();
        this.onResolve();
    },
    onDefenderIncrementsChanged(v) {
        //console.log('defender increments changed: ' + v);
        this.state.incr = v;
        this.onResolve();
    },
    onCannisterChanged(v) {
        this.state.cannister = v;
        this.state.odds = this.calcOdds(this.state.attack, this.state.defend, this.state.cannister);
        this.onResolve();
    },
    onOddsChanged(v) {
        this.state.odds = v;
        this.onResolve();
    },
    onDiceModifierChanged(v) {
        let d = Base6.add((this.state.die1 * 10) + this.state.die2, +v);
        this.state.die1 = Math.floor(d / 10);
        this.state.die2 = d % 10;
        this.onResolve();
    },
    onDieChanged(d,v) {
        this.state['die'+d] = v;
        this.onResolve();
    },
    onDiceRoll(d) {
        this.state.die1 = d[0].value;
        this.state.die2 = d[1].value;
        this.state.die3 = d[2].value;
        this.state.die4 = d[3].value;
        this.state.die5 = d[4].value;
        this.onResolve();
    },
    onResolve() {
        // resolve fire
		let fireDice = (this.state.die1*10) + this.state.die2;
        this.state.result = Fire.resolve(this.state.odds, fireDice, +this.state.incr);
		let lloss = LeaderLoss.resolve(fireDice, this.state.die3, this.state.die4, this.state.die5) || {};
        this.state.leader = lloss.leader;
        this.state.loss = lloss.result;
        this.state.mortal = lloss.mortal;
        this.setState(this.state);
    },
    render() {
        //console.log(this.props);
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 4, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <FireAttackerView value={this.state.attack} mods={[this.state.mod13,this.state.mod12,this.state.mod32,this.state.cannister]} onAdd={this.onAttackerAdd} onChanged={this.onAttackerChanged} onModifierChanged={this.onAttackerModifierChanged} />
                    </View>
                    <View style={{flex: 1}}>
    					<FireDefenderView value={this.state.defend} incr={this.state.incr} onAdd={this.onDefenderAdd} onChanged={this.onDefenderChanged} onIncrementsChanged={this.onDefenderIncrementsChanged} />
    				</View>
                </View>
                <View style={{flex: .5, flexDirection: 'row', backgroundColor: 'whitesmoke'}}>
                    <View style={{flex: 1}}>
                        <OddsView odds={Fire.odds} value={this.state.odds} onChanged={this.onOddsChanged} />
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <Text>Cannister</Text>
                        <Switch value={this.state.cannister} onValueChange={this.onCannisterChanged} />
                    </View>
                    <View style={{flex: 2}}>
                        <ResultsView value={this.state.result} leader={this.state.leader} loss={this.state.loss} mortal={this.state.mortal} />
                    </View>
                </View>
                <View style={{flex: .75, backgroundColor: 'whitesmoke'}}>
                    <DiceRoll dice={dice} values={[this.state.die1,this.state.die2,this.state.die3,this.state.die4,this.state.die5]}
                            onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                </View>
                <View style={{flex: 1, backgroundColor: 'whitesmoke'}}>
                    <DiceModifiersView onChange={this.onDiceModifierChanged} />
                </View>
            </View>
        );
    }
});

module.exports = FireView;
