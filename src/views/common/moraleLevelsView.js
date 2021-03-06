import React from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {SpinSelect} from 'react-native-nub';
import SelectableHeader from './selectableHeader';
import Icons from '../../res';
import {setMoraleLevel} from '../../actions/current';
import Style from '../../services/style';

var MoraleLevelView = React.createClass({
    getInitialState() {
        return {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            viewHeight: 100
        };
    },
    onLayout(e) {
        if (this.state.width != e.nativeEvent.layout.width /*||
            this.state.height != e.nativeEvent.layout.height*/) {
            this.setState({
                x: e.nativeEvent.layout.x,
                y: e.nativeEvent.layout.y,
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height
            });
        }
    },    
    render() {    
        let iconsize = Style.Scaling.scale(40);//(Math.min(this.state.height, this.state.width) * 0.75) || 16;    
        let curlevel = this.currentLevel(this.props.level);

        return (
            <View style={{flex:1, flexDirection:'row', paddingTop:2,paddingBottom:2,borderBottomWidth:this.props.final?0:2,borderBottomColor:'gray'}}>
                <View style={{flex:1, justifyContent:'center',alignItems:'center'}} onLayout={this.onLayout}>
                    <Image style={{width: iconsize,height: iconsize,resizeMode: 'contain'}} source={Icons[this.props.level.image]}/>
                </View>
                <View style={{flex:3, justifyContent:'center'}}>
                    <Text style={{fontSize:Style.Font.mediumlarge(),fontWeight:'bold',textAlign:'left'}}>{this.props.level.name}</Text>
                </View>         
                <View style={{flex:1, justifyContent:'center'}}>
                    <Text style={{fontSize:Style.Font.medium(),fontWeight:'bold',textAlign:'left'}}>{curlevel.level.toString()}</Text>
                </View>                         
                <View style={{flex:1, justifyContent:'center'}}>
                    <Text style={{fontSize:Style.Font.medium(),fontWeight:'bold',textAlign:'center'}}>{'('+curlevel.mod.toString()+')'}</Text>
                </View>                                        
                <View style={{flex:3, justifyContent:'center'}}>
                    <SpinSelect value={curlevel.desc} fontSize={Style.Font.mediumlarge()}
                        onPrev={() =>this.props.onPress && this.props.onPress(this.props.level.formation, curlevel.level-1)} 
                        onNext={() =>this.props.onPress && this.props.onPress(this.props.level.formation, curlevel.level+1)} 
                    />
                </View>
            </View>
        );
    },
    currentLevel(l) {
        var i = l.levels.findIndex((lvl) => lvl.level == this.props.currentlevels[l.formation]);
        if (i < 0) { i = 0; }
        return l.levels[i];
    }
});


var MoraleLevelsView = React.createClass({
    getInitialState() {
        return {
            selected: null
        };
    },    
    onSelectArmy(a) {
        this.setState({selected:a});
    },
    onChangeLevel(formation, level) {        
        if (level < 0) {
            level = 0;
        } else if (level > 3) {
            level = 3;
        }        
        this.props.setMoraleLevel(formation, level);
    },
    render() {    
        let badges = this.badges();
        let selected = this.state.selected || (badges && badges.length > 0 ? badges[0] : null);
        let levels = this.levels(selected);
        return (
            <View style={{flex:1}}>
                <Text style={{fontSize: Style.Font.mediumlarge(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Levels</Text>
                <View style={{flex:1}}>
                <SelectableHeader items={badges}  selected={selected} onSelected={this.onSelectArmy} />
                </View>
                <View style={{flex:6}}>
                <ScrollView contentContainerStyle={{marginLeft:5, marginRight:5}}
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={200}>
                    {levels.map((l,i) => 
                        <MoraleLevelView key={i} currentlevels={this.props.currentlevels} level={l} final={i+1==levels.length} onPress={this.onChangeLevel} />
                    )}
                </ScrollView>                
                </View>
            </View>
        );
    },
    sides() {        
        if (this.props.battle.rules.maneuver) {
            return this.props.battle.rules.maneuver.sides;
        }
        return this.props.battle.players;
    },    
    badges() {
        /*
        return this.props.levels.reduce((a,v,i) => {
            if (!a.find((e,i,a) => e.image == v.image)) {
                a.push({image: v.image});
            }
            return a;
        }, []);
        */
        return this.sides().map((s) => ({image: s, name: s.toLowerCase()}));
    },
    levels(selected) {        
        return this.props.levels.filter((l) => l.army == selected.name);
    }
});


const mapStateToProps = (state) => ({    
    currentlevels: state.current.moralelevels || {}
});

const mapDispatchToProps =  ({setMoraleLevel});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(MoraleLevelsView);


