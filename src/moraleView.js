'use strict'
var React = require('react');
import { View, Text, Image } from 'react-native';
var SpinNumeric = require('./widgets/spinNumeric');
var QuickValuesView = require('./quickValuesView');
var DiceModifiersView = require('./diceModifiersView');
var DiceRoll = require('./widgets/diceRoll');
var Base6 = require('./services/base6');
var Morale = require('./services/morale');
var Icons = require('./res/icons');

var dice = [
    {num: 1, low: 1, high: 6, color: 'red'},
    {num: 1, low: 1, high: 6, color: 'white'}
];

var MoraleView = React.createClass({
    getInitialState() {
        return {
            morale: '11',
            die1: 1,
            die2: 1,
            result: 'Fail'
        };
    },
    onMoraleChanged(v) {
        this.state.morale = v;
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
        this.onResolve();
    },
    onResolve(e) {
        let b = Morale.check(+this.state.morale,0,this.state.die1,this.state.die2);
        this.state.result = b ? 'Pass' : 'Fail';
        this.setState(this.state);
    },
    render() {
        //console.log(this.props);
        let icon = this.state.result == 'Fail' ? Icons['fail'] : Icons['pass'];
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 25}} />
                    <View style={{flex: 50}}>
                        <SpinNumeric value={this.state.morale} values={Base6.values} integer={true} onChanged={this.onMoraleChanged} />
                    </View>
                    <View style={{flex: 25}} />
                </View>
                <View style={{flex: 1}}>
                    <QuickValuesView values={[16,26,36,46,56,66]} height={38} onChanged={this.onMoraleChanged}/>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Image style={{height: 64, width: 64, resizeMode: 'stretch'}}
                            source={icon}
                        />
                    </View>
                    <View style={{flex: 1}}>
                        <DiceRoll dice={dice} values={[this.state.die1,this.state.die2]}
                                onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                    </View>
                </View>
                <View style={{flex: 5}}>
                    <DiceModifiersView onChange={this.onDiceModifierChanged} />
                </View>
            </View>
        );
    }
});

module.exports = MoraleView;
