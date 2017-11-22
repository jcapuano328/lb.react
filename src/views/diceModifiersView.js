import React from 'react';
import { View,TouchableOpacity,Text } from 'react-native';
import {Style} from 'react-native-nub';

var DiceModifiersView = React.createClass({
    onModifier(v) {
        return () => {
            this.props.onChange && this.props.onChange(+v);
        }
    },
    render() {        
        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            {
                ['-6','-3','-1','+1','+3','+6'].map((v, i) => {
                    return (
                        <TouchableOpacity key={i} onPress={this.onModifier(v)}
                            style={{
                                flex: 1,
                                //width: 16,
                                //height: 54,
                                padding: Style.Padding.pad(5),
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: i == 0 ? 2 : 0,                                
                                marginRight: 2,
                                backgroundColor: 'blue',
                                //backgroundColor: '#3F51B5'
                                borderColor: 'black',
                                borderWidth: 1,
                                borderRadius:5
                            }}>
                            <Text style={{color: 'white', fontSize: Style.Font.xtralarge(), textAlign: 'center', alignSelf:'center'}}>{v}</Text>
                        </TouchableOpacity>
                    )
                })
            }
            </View>
        );
    }
});

module.exports = DiceModifiersView;
