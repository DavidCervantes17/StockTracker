import  React, {Component } from 'react';
import {View, TextInput, Platform, StyleSheet} from 'react-native'
import Colors from '../../res/color'

class CoinSearch extends Component {

    state = {
        query: ''
    }

    handleText = (query) => {
        this.setState({query})

        if(this.props.onChange){
            this.props.onChange(query)
        }
    }

    render(){
        const query = this.state
        return(
            <View>
                <TextInput
                    style={[
                        styles.textInput,
                        Platform.OS == 'ios' ?
                        styles.textInputiOS :
                        styles.textInputAndroid
                    ]}
                    onChangeText={this.handleText}
                    value={query}
                    placeholder="Buscar critpomoneda"
                    placeholderTextColor="#fff"
                />
            </View>
           
        )
    }
}
export default CoinSearch

const styles = StyleSheet.create({
    textInput:{
        height:46,
        backgroundColor:Colors.charade,
        paddingLeft:16,
        color:"#fff"
    },
    textInputAndroid:{
        borderBottomWidth:2,
        borderBottomColor:Colors.zircon,
    },
    textInputiOS:{
        margin:8,
        borderRadius:8
    }
    
  });