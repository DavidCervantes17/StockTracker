import  React, {Component } from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native'

class CoinsScreen extends Component {
    handlePress = () => {
        this.props.navigation.navigate('CoinDetail')
        console.log("Click")
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.tittleText}>
                    Coin Screen
                </Text>
                <Pressable style={styles.btn} onPress={this.handlePress}>
                    <Text style={styles.btnText}>Detail</Text>
                </Pressable>
            </View >
        )
    }
}
export default CoinsScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#333"
    },
    tittleText:{
        color:"#fff",
        textAlign:"center"
    },
    btn:{
        padding:8,
        backgroundColor:"#0000aa",
        borderRadius:8,
        margin:16,
    },
    btnText:{
        color:"#fff",
        textAlign:"center"
    }
})