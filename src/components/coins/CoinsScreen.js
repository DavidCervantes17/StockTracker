import  React, {Component } from 'react';
import {View, Text, Pressable, StyleSheet, FlatList, ActivityIndicator} from 'react-native'
import Http from '../../libs/http'
import CoinsItem from './CoinsItem'

class CoinsScreen extends Component {

    state = {
        coins:[],
        loading:false
    }

    componentDidMount = async () => {
        this.setState({loading:true})
        const res = await Http.instance.get("https://api.coinlore.net/api/tickers/")
        //console.log("coins",coins)
        this.setState({coins:res.data})
        this.setState({loading:false})
    }
    handlePress = () => {
        this.props.navigation.navigate('CoinDetail')
        console.log("Click")
    }

    render(){
        const {coins, loading} = this.state;
        return(
            <View style={styles.container}>
                { loading ? 
                    <ActivityIndicator 
                    style={styles.loader}
                    color="#fff" 
                    size="large"/>
                    :null
                }
                <FlatList
                data={coins}
                renderItem={({item}) => 
                    <CoinsItem item = {item}/>
                }
                />
                
            </View >
        )
    }
}
export default CoinsScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff"
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
    },
    loader:{
        marginTop:60
    }
})


{/*<Text style={styles.tittleText}>
                    Coin Screen
                </Text>
                <Pressable style={styles.btn} onPress={this.handlePress}>
                    <Text style={styles.btnText}>Detail</Text>
        </Pressable>*/}