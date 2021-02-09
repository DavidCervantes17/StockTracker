import  React, {Component } from 'react';
import {View, Image, Text, StyleSheet, SectionList} from 'react-native'
import Colors from '../../res/color'
import Http from '../../libs/http'
import CoinMarketItem from '../coinDetail/CoinMarketItem'
import { FlatList } from 'react-native-gesture-handler';

class CoinDetailScreen extends Component {

    state = {
        coin:{},
        markets:[]
    }
    getSymbolIcon = (name) => {
        if (name) {
            const symbol = name.toLowerCase().replace(" ","-")
          return `https://c1.coinlore.com/img/16x16/${symbol}.png`;
        }
    };
    getSections = (coin) => {

        const sections = [
          {
            title: "Market cap",
            data: [coin.market_cap_usd]
          },
          {
            title: "Volume 24h",
            data: [coin.volume24]
          },
          {
            title: "Change 24h",
            data: [coin.percent_change_24h]
          }
        ];
    
        return sections;
    }

    getMarkets = async (coinId) => {

      const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`
  
      const markets = await Http.instance.get(url);
  
      this.setState({ markets });
    }

    componentDidMount() {
        const {coin} = this.props.route.params;
        this.props.navigation.setOptions({title: coin.symbol})
        this.getMarkets(coin.id)
        this.setState({coin})
    } 

    render(){
        const {coin,markets} = this.state;
        return(
            <View style={styles.container}>
                <View style={styles.subHeader}>
                    <Image style={styles.iconImg} source={{uri: this.getSymbolIcon(coin.name)}}></Image>
                    <Text style={styles.titleText}>
                        {coin.name}
                    </Text>
                </View >
                <SectionList 
                    style={styles.section}
                    sections={this.getSections(coin)} 
                    keyExtractor={(item,index) => item+index} 
                    renderItem={({item}) => 
                    <View style={styles.sectionItem}>
                        <Text style={styles.itemText}>{item}</Text>
                    </View>
                    } 
                    renderSectionHeader={({section: {title}}) =>
                    <View style={styles.sectionHeader}> 
                        <Text style={styles.sectionText}>{title}</Text>
                    </View>
                    } 
                    />
                    <Text style={styles.marketsTitle}>Markets</Text>

                    <FlatList
                      style={styles.list}
                      horizontal={true}
                      data={markets}
                      renderItem={({ item }) => <CoinMarketItem item={item} />}
                    />
            </View>
        )
    }
}
export default CoinDetailScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.charade,
    },
    subHeader: {
      backgroundColor: 'rgba(0,0,0,0.1)',
      padding: 16,
      flexDirection: 'row',
    },
    titleText: {
      fontSize: 16,
      color: '#fff',
      fontWeight: 'bold',
      marginLeft: 8,
    },
    iconImg: {
      height: 25,
      width: 25,
    },
    sectionHeader: {
      backgroundColor: 'rgba(0,0,0,0.2)',
      padding: 8,
    },
    sectionItem: {
      padding: 8,
    },
    itemText: {
      color: '#fff',
      fontSize: 14,
    },
    sectionText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
    },
    section:{
        maxHeight:220
    },
    list:{
      maxHeight:70,
      paddingLeft:16,    
    },
    marketsTitle:{
      color:"#fff",
      fontSize:16,
      marginBottom:20,
      marginLeft:16,
      fontWeight:"bold"
    }
  });