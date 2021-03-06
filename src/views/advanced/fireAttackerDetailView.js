import React from 'react';
import { View, Text, Switch } from 'react-native';
import {SpinNumeric,SelectList,IconButton} from 'react-native-nub';
import QuickValuesView from '../common/quickValuesView';
import Style from '../../services/style';
import Icons from '../../res';

var FireAttackerDetailView = React.createClass({
    getInitialState() {
        return {
            mods: {},
            value: '1',
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            viewHeight: 100            
        };
    },
    onLayout(e) {
        if (this.state.width != e.nativeEvent.layout.width ||
            this.state.height != e.nativeEvent.layout.height) {
            this.setState({
                x: e.nativeEvent.layout.x,
                y: e.nativeEvent.layout.y,
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height
            });
        }
    },        
    onValueChanged(v) {
        this.state.value = v;
        this.state.mods = {};
        this.setState(this.state);
    },
    onModifier(m) {
        return (v) => {
            this.state.mods[m] = v;

            let value = +this.state.value;
            if (m == '1/3') {                
                if (v) {
                    value /= 3.0;
                } else {
                    value *= 3.0;
                }                
            } else if (m == '2/3') {
                if (v) {
                    value *= 0.6667;
                } else {
                    value /= 0.6667;
                }
            } else if (m == '1/2') {
                if (v) {
                    value /= 2.0;
                } else {
                    value *= 2.0;
                }
            } else if (m == '3/2') {
                if (v) {
                    value *= 1.5;
                } else {
                    value /= 1.5;
                }
            }
            this.state.value = value.toFixed(1);
            this.setState(this.state);
        }
    },
    onSet() {
        this.props.onSet && this.props.onSet(+this.state.value);
    },
    onAdd() {
        this.props.onAdd && this.props.onAdd(+this.state.value);
    },
    render() {
        let iconSize = (Math.min(this.state.height, this.state.width)) || 32;
        return (
            <View style={{flex:1}}>
                <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', margin: 10}} onLayout={this.onLayout}>
                        <IconButton image={Icons['equal']} height={iconSize} width={iconSize} resizeMode='stretch' onPress={this.onSet} />
                    </View>
                    <View style={{flex: 4, alignSelf: 'stretch', justifyContent: 'flex-start'}}>
                        <SpinNumeric fontSize={Style.Font.large()} value={this.state.value} min={0} max={100} onChanged={this.onValueChanged} />
                    </View>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', margin: 10}}>
                        <IconButton image={Icons['add']} height={iconSize} width={iconSize} resizeMode='stretch' onPress={this.onAdd} />
                    </View>
                </View>
                <View style={{flex: .75, flexDirection: 'row'}}>
                    {['1/3','1/2','2/3','3/2'].map((v, i) => {
                        return (
                            <View key={i} style={{flex: 1,flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: Style.Size.Label}}>{v}</Text>
                                <Switch value={this.state.mods[v]} onValueChange={this.onModifier(v)} />
                            </View>
                        );
                    })}
                </View>
                <View style={{flex:1.5}}>
                    <QuickValuesView values={[4,6,9,12,16,18]} onChanged={this.onValueChanged}/>
                </View>
            </View>
        );
    }
});

module.exports = FireAttackerDetailView;
