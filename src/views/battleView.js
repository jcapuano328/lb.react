import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Style from '../services/style';
import BasicView from './basic/battleView';
import PremierView from './premier/battleView';
import FifthEdView from './fifth/battleView';
import getGame from '../selectors/game';

var BattleView = React.createClass({
    getInitialState() {
        return {
            initialPage: 0
        };
    },    
    render() {        
        return (
            <View style={{flex: 1, marginTop: Style.Scaling.titleBarHeight,backgroundColor: 'rgba(0,0,0,0.01)'}}>            
                {this.renderBattleView()}
            </View>
        );
    },
    renderBattleView() {        
        if (this.props.battle.rules) {
            if (this.props.ruleset == 1) {
                return <PremierView initialPage={this.state.initialPage} battle={this.props.battle}/>            
            } else if (this.props.ruleset == 5) {
                return <FifthEdView initialPage={this.state.initialPage} battle={this.props.battle} />
            }
        }
        return <BasicView initialPage={this.state.initialPage} battle={this.props.battle} />
    }
});

const mapStateToProps = (state) => ({
    battle: getGame(state),
    ruleset: +state.current.ruleset    
});

module.exports = connect(
  mapStateToProps
)(BattleView);
