import React from 'react';
import { View, Text } from 'react-native';
import {SpinNumeric} from 'react-native-nub';
import Style from '../../services/style';

var FireDefenderView = React.createClass({
    render() {
        let DetailView = this.props.detailView || View;
        return (
            <View style={{flex:1}}>
                <Text style={{fontSize: Style.Font.mediumlarge(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Defender</Text>
                <View style={{flex: 1}}>
                    <SpinNumeric fontSize={Style.Font.xlarge()} value={this.props.value} min={0} onChanged={this.props.onChanged} />
                </View>
                <View style={{flex: 3}}>
                    <DetailView battle={this.props.battle} onSet={this.props.onChanged} onChanged={this.props.onChanged}/>                
                </View>
            </View>
        );
    }
});

module.exports = FireDefenderView;
