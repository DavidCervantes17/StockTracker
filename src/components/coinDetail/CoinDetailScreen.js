import  React, {Component } from 'react';
import {View, Image, Text, StyleSheet, SectionList, Pressable, Alert} from 'react-native'
import Colors from '../../res/color'
import Http from '../../libs/http'
import CoinMarketItem from '../coinDetail/CoinMarketItem'
import Storage from '../../libs/storage'

import { FlatList } from 'react-native-gesture-handler';

class CoinDetailScreen extends Component {

    state = {
        coin:{},
        markets:[],
        isFavorite:false,
    }

    toggleFavorite = () =>{
      if(this.state.isFavorite){
        this.removeFavorite()
      }else{
        this.addFavorite()
      }
    }

    addFavorite = async () => {
      const coin = JSON.stringify(this.state.coin)
      const key = `favorite-${this.state.coin.id}`

      const stored = await Storage.instance.store(key,coin)

      console.log("stored",stored)

      if(stored){
        this.setState({isFavorite:true})
      }
    }
    removeFavorite = async() => {

      Alert.alert("Eliminar de favoritos", "¿Estas seguro?",[{
        text:'Cancelar',
        onPress: () => {},
        style:"cancel"
      },
      {
        text:'Eliminar ',
        onPress: async () => {
          const key = `favorite-${this.state.coin.id}`

          const stored = await Storage.instance.remove(key)
    
          console.log("remove",stored)
    
          if(stored){
            this.setState({isFavorite:false})
          }
        },
        style:"destructive"
      }
    ])
      

    }
    getFavorite = async () => {
      try {
        const key = `favorite-${this.state.coin.id}`
        const favStr = await Storage.instance.get(key)
        console.log("getFavorite",favStr)

        if(favStr != null){
          this.setState({isFavorite:true})
        }
      } catch (error) {
        console.log("get favorite error",error)
      }



      if(stored){
        this.setState({isFavorite:true})
      }
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
        //Como se asincrono se tiene que hacer de esta forma, despues de que estado de coin se seteo, con el callback de this.setState
        this.setState({coin},() => {
          this.getFavorite()
        })
    } 

    render(){
        const {coin,markets,isFavorite} = this.state;
        return(
            <View style={styles.container}>
                <View style={styles.subHeader}>
                  <View >
                    <Image style={styles.iconImg} source={{uri: this.getSymbolIcon(coin.name)}}></Image>
                    <Text style={styles.titleText}>
                        {coin.name}
                    </Text>
                  </View>
                    
                    <Pressable
                    onPress={this.toggleFavorite}
                    style={[
                      styles.btnFavorite,
                      isFavorite?
                      styles.btnFavoriteRemove :
                      styles.btnFavoriteAdd
                    ]}>
                      <Text style={styles.btnFavoriteText}>
                        {isFavorite ? "Eliminar favorito":"Agregar favorito"}
                      </Text>
                    </Pressable>
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
    backgroundColor: Colors.charade
  },
  row: {
    flexDirection: "row"
  },
  subHeader: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 8
  },
  iconImg: {
    width: 25,
    height: 25
  },
  section: {
    maxHeight: 220
  },
  list: {
    maxHeight: 100,
    paddingLeft: 16
  },
  sectionHeader: {
    backgroundColor: "rgba(0,0,0, 0.2)",
    padding: 8
  },
  sectionItem: {
    padding: 8
  },
  itemText: {
    color: Colors.white,
    fontSize: 14
  },
  sectionText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "bold"
  },
  marketsTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
    marginLeft: 16
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8
  },
  btnFavoriteText: {
    color: Colors.white
  },
  btnFavoriteAdd: {
    backgroundColor: Colors.picton
  },
  btnFavoriteRemove: {
    backgroundColor: Colors.carmine
  }
});
