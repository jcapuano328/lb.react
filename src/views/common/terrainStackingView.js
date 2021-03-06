import React from 'react';
import { View, Image, ScrollView, Text } from 'react-native';
import Style from '../../services/style';
import Icons from '../../res';

var TerrainEffectView = React.createClass({
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
    render() {        
        let iconSize = (Math.min(this.state.height, this.state.width)) || 32;
        let effects = this.props.effects;
        return (
            <View style={{flex:1, flexDirection:'row', paddingTop:2,paddingBottom:2,borderBottomWidth:2,borderBottomColor:'lightgray'}}>
                <View style={{flex:1.5}}>
                    <Text style={{fontSize: Style.Font.mediumlarge(), fontWeight: 'bold', fontStyle: 'italic', textAlign: 'center'}}>{this.props.terrain}</Text>
                </View>
                <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}} onLayout={this.onLayout}>
                    <Image source={Icons[effects.img]} style={{flex: 1, width:iconSize, height:iconSize}} resizeMode='stretch' />
                </View>
                <View style={{flex:1}}>
                    <Text style={{fontSize: Style.Font.large(), fontWeight: 'bold', textAlign: 'center'}}>{effects['Inf']}</Text>
                </View>
                <View style={{flex:1}}>
                    <Text style={{fontSize: Style.Font.large(), fontWeight: 'bold', textAlign: 'center'}}>{effects['Cav']}</Text>
                </View>
                <View style={{flex:1}}>
                    <Text style={{fontSize: Style.Font.large(), fontWeight: 'bold', textAlign: 'center'}}>{effects['Art']}</Text>
                </View>
                <View style={{flex:1}}>
                    <Text style={{fontSize: Style.Font.large(), fontWeight: 'bold', textAlign: 'center'}}>{effects['Cmb']}</Text>
                </View>
            </View>
        );
    }
});

var TerrainStackingView = React.createClass({
    render() {
        /*
        [Terrain]  [Inf]   [Cav]   [Art]  [Combined]
        */
        return (
            <View style={{flex:1, justifyContent: 'flex-start'}}>
                <View style={{flex:1, flexDirection: 'row'}}>
                    <View style={{flex:1.5}}>
                        <Text style={{fontSize: Style.Font.mediumlarge(), backgroundColor: 'silver', textAlign: 'center'}}>{' '}</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: Style.Font.mediumlarge(), backgroundColor: 'silver', textAlign: 'center'}}>{' '}</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: Style.Font.mediumlarge(), backgroundColor: 'silver', textAlign: 'center'}}>Inf</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: Style.Font.mediumlarge(), backgroundColor: 'silver', textAlign: 'center'}}>Cav</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: Style.Font.mediumlarge(), backgroundColor: 'silver', textAlign: 'center'}}>Art</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: Style.Font.mediumlarge(), backgroundColor: 'silver', textAlign: 'center'}}>Cmb</Text>
                    </View>
                </View>
                <View style={{flex:10}}>
                    <ScrollView                    
                        automaticallyAdjustContentInsets={false}
                        scrollEventThrottle={200}>
                        {Object.keys(this.props.stacking).map((t,i) => <TerrainEffectView key={i} terrain={t} effects={this.props.stacking[t]} />)}
                    </ScrollView>                
                </View>
            </View>
        );
    }
});


module.exports = TerrainStackingView;
