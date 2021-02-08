import  React, {Component } from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native'
import Http from '../../libs/http'

class CoinsScreen extends Component {

    componentDidMount = async () => {
        const coins = await Http.instance.get("https://api.coinlore.net/api/tickers/")
        console.log("coins",coins)
    }
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