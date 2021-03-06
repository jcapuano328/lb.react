import React from 'react';
import { View, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import Style from '../../services/style';
import Icons from '../../res';

var NationalityView = React.createClass({
    onSelect(v) {
        return () => {
            if (v.label) {                                        
                this.props.onSelect && this.props.onSelect(v.density * v.factor);
            }
        }
    },
    render() {
        return (
            <View style={{flex:1}}>
                <Image source={Icons[this.props.nationality]} opacity={0.20} style={{flex: 1, width:null, height:null}} resizeMode='stretch'>
                    <View style={{flex: 1}}>
                        {this.props.units.map((unit,i) => {
                            let column = unit['Column'] || {};
                            let line = unit['Line'] || {};
                            let carre = unit['Carre'] || {};
                            let skirmish = unit['Skirmish'] || {};
                            let general = unit['General'] || {};
                            return (
                                <View key={i} style={{flex:1, flexDirection: 'row'}}>
                                    <View style={{flex:1}}>
                                        <Text style={{fontSize: Style.Font.medium(), fontWeight: 'bold', fontStyle: 'italic', textAlign: 'center'}}>{unit.unittype}</Text>
                                    </View>
                                    <View style={{flex:1}}>
                                        <TouchableOpacity onPress={this.onSelect(column)}>
                                            <Text style={{fontSize: Style.Scaling.fontScale(14), fontWeight: 'bold', textAlign: 'center'}}>{column.label}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flex:1}}>
                                        <TouchableOpacity onPress={this.onSelect(line)}>
                                            <Text style={{fontSize: Style.Scaling.fontScale(14), fontWeight: 'bold', textAlign: 'center'}}>{line.label}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flex:1}}>
                                        <TouchableOpacity onPress={this.onSelect(carre)}>
                                            <Text style={{fontSize: Style.Scaling.fontScale(14), fontWeight: 'bold', textAlign: 'center'}}>{carre.label}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flex:1}}>
                                        <TouchableOpacity onPress={this.onSelect(skirmish)}>
                                            <Text style={{fontSize: Style.Scaling.fontScale(14), fontWeight: 'bold', textAlign: 'center'}}>{skirmish.label}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flex:1}}>
                                        <TouchableOpacity onPress={this.onSelect(general)}>
                                            <Text style={{fontSize: Style.Scaling.fontScale(14), fontWeight: 'bold', textAlign: 'center'}}>{general.label}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </Image>
            </View>
        );
    }
});

var FireAttackerValuesView = React.createClass({
    render() {
        /*
        [National flag

        [Unit]   [Col]   [Line]  [Carre] [Skirm] [Gen]

        ]
        */
        return (
            <View style={{flex:1, justifyContent: 'flex-start'}}>
                <View style={{flex:1, flexDirection: 'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: Style.Font.medium(), backgroundColor: 'silver', textAlign: 'center'}}>{' '}</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: Style.Font.medium(), backgroundColor: 'silver', textAlign: 'center'}}>Col</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: Style.Font.medium(), backgroundColor: 'silver', textAlign: 'center'}}>Line</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: Style.Font.medium(), backgroundColor: 'silver', textAlign: 'center'}}>Carre</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: Style.Font.medium(), backgroundColor: 'silver', textAlign: 'center'}}>Skirm</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: Style.Font.medium(), backgroundColor: 'silver', textAlign: 'center'}}>Gen</Text>
                    </View>
                </View>
                <View style={{flex:10}}>
                    <ScrollView                    
                        automaticallyAdjustContentInsets={false}
                        scrollEventThrottle={200}>
                        {this.nationalities().map((n,i) => <NationalityView key={i} nationality={n} units={this.units(n)} onSelect={this.props.onSet} /> )}
                    </ScrollView>                
                </View>
            </View>
        );
    },
    nationalities() {        
        return Object.keys(this.props.battle.rules.fire.attack);
    },
    unittypes(nationality) {    
        return Object.keys(this.props.battle.rules.fire.attack[nationality]);
    },
    formations(nationality,unittype) {        
        return Object.keys(this.props.battle.rules.fire.attack[nationality][unittype]);
    },
    size(nationality, unittype, formation) {        
        return this.props.battle.rules.fire.attack[nationality][unittype][formation];
    },
    units(nationality) {
        var l = [];
        this.unittypes(nationality).filter((u) => u!='Artillery').forEach((u) => {
            let o = {
                nationality: nationality,
                unittype: u
            };
            this.formations(nationality,u).forEach((f) => {
                o[f] = this.size(nationality,u,f);
            });
            l.push(o);
        });
        return l;
    },
});

module.exports = FireAttackerValuesView;