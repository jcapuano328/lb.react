'use strict'

var React = require('react-native');
var { View, StyleSheet, } = React;
var EventEmitter = require('EventEmitter');
var icons = require('../../../icons');
var TitleBar = require('../titleBar');
var ScrollableTabView = require('react-native-scrollable-tab-view');
var TurnView = require('./turnView');
var FireView = require('./fireView');
var MeleeView = require('./meleeView');
var MoraleView = require('./moraleView');
var GeneralView = require('./generalView');
var Current = require('../../core/current');

var styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: 30,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  turn: {
    height: 50,
  },
});

var BattleView = React.createClass({
  getInitialState() {
    return {
      battle: this.props.battle
    };
  },
  componentWillMount: function() {
      this.eventEmitter = new EventEmitter();
  },
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  },
  menuHandler() {
    this.props.onMenu && this.props.onMenu();
  },
  refreshHandler() {
    console.log('Reset ' + this.props.battle.name);
    Current.reset(this.props.battle)
    .then((current) => {
        // update the views?
        this.eventEmitter.emit('reset');
    })
    .done();
  },
  onChangeTab({i, ref}) {
  },
  render() {
    let battle = this.state.battle || {scenario: {}};
    return (
      <View style={styles.container}>
        <TitleBar
          logo={icons[battle.image+'-sm']}
          title={battle.name}
          subtitle={battle.scenario.name}
          onMenu={this.menuHandler}
          onRefresh={this.refreshHandler} />
        <TurnView style={styles.turn} events={this.eventEmitter} />
        <ScrollableTabView
          style={{backgroundColor: '#fff'}}
          onChangeTab={this.onChangeTab}>
          <FireView tabLabel="Fire" events={this.eventEmitter} />
          <MeleeView tabLabel="Melee" events={this.eventEmitter} />
          <MoraleView tabLabel="Morale" events={this.eventEmitter} />
          <GeneralView tabLabel="General" events={this.eventEmitter} />
        </ScrollableTabView>
      </View>
    );
  }
});

module.exports = BattleView;
