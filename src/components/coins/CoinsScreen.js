import  React, {Component } from 'react';
import {View, Text, Pressable, StyleSheet, FlatList, ActivityIndicator} from 'react-native'
import Http from '../../libs/http'
import CoinsItem from './CoinsItem'
import Colors from '../../res/color'
import CoinSearch from './CoinSearch'

class CoinsScreen extends Component {

    state = {
        coins:[],
        allCoins:[],
        loading:false
    }

    componentDidMount =  () => {
        this.getCoins()
    }

    getCoins = async () => {
        this.setState({loading:true})
        const res = await Http.instance.get("https://api.coinlore.net/api/tickers/")
        //console.log("coins",coins)
        this.setState({coins:res.data, allCoins:res.data})
        this.setState({loading:false})
    }
    handlePress = (coin) => {
        this.props.navigation.navigate('CoinDetail', {coin})
        console.log("Click")
    }
    handleSearch = (query) => {
        const {allCoins} = this.state
        const coinsFiltered = allCoins.filter((coin) =>{
            return coin.name.toLowerCase().includes(query.toLowerCase()) || 
            coin.symbol.toLowerCase().includes(query.toLowerCase())
        })

        this.setState({coins:coinsFiltered})
    }

    render(){
        const {coins, loading} = this.state;
        return(
            <View style={styles.container}>
                <CoinSearch onChange={this.handleSearch}/>
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
                    <CoinsItem item = {item} onPress={() => this.handlePress(item)} />
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
        backgroundColor:Colors.charade
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