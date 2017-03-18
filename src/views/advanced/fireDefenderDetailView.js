import React from 'react';
import { View } from 'react-native';
import {SpinNumeric,RadioButtonGroup} from 'react-native-nub';

var FireDefenderDetailView = React.createClass({
    getInitialState() {
        let terrains = this.terrains();
        let formations = this.formations(terrains[0]);
        return {
            terrain: terrains[0],
            formation: formations[0]
        };
    },
    componentDidMount() {
        this.updateValue();
    },
    onTerrainChanged(v) {
        this.state.terrain = v || this.state.terrain;   // don't allow an uncheck
        let formations = this.formations(this.state.terrain);
        if (formations.indexOf(this.state.formation) < 0) {
            this.state.formation = formations[0];
        }
        this.updateValue();
        this.setState(this.state);
    },
    onFormationChanged(v) {
        this.state.formation = v || this.state.formation; // don't allow an uncheck
        this.updateValue();
        this.setState(this.state);
    },
    updateValue(state) {
        state = state || this.state;        
        let value = this.rules().terrain[state.terrain][state.formation].value;
        this.props.onSet && this.props.onSet(value);
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex:2, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <View style={{flex:4}}>
                        <RadioButtonGroup title={'Terrain'} direction={'vertical'}
                            buttons={this.terrains().map((t) => {return {label:t,value:t};})}
                            state={this.state.terrain}
                            onSelected={this.onTerrainChanged}/>
                    </View>
                    <View style={{flex:3}}>
                        <RadioButtonGroup title={'Formation'} direction={'vertical'}
                            buttons={this.formations(this.state.terrain).map((f) => {return {label:f,value:f};})}
                            state={this.state.formation}
                            onSelected={this.onFormationChanged}/>
                    </View>
                </View>
                {/*View style={{flex: 6}} />*/}
            </View>
        );
    },
    rules() {
        return this.props.battle.rules.fire.defense;
    },
    terrains() {        
        return Object.keys(this.rules().terrain);
    },
    formations(terrain) {        
        let t = this.rules().terrain[terrain];
        if (t) {
            return Object.keys(t).filter((f) => this.rules().terrain[terrain][f].label != '');
        }
        return [];
    }
});

module.exports = FireDefenderDetailView;