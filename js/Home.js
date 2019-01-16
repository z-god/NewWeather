import React, { Component } from 'react'
import { Modal, FlatList, StyleSheet, Text, View } from "react-native";
import { Card,SearchBar,Button} from 'react-native-elements'

const baseUrl = 'http://api.map.baidu.com/telematics/v3/weather?output=json&ak=mVi9engqrpdgj9FIn9IltY02mGIAvoov&location=';
export default class MainScreen extends React.Component{

    constructor(props){
        super(props);
        this.state={
            data: [],
            index:[],
            location:'乌鲁木齐',
            modalVisible: false,
        }
        this.fetchData = this.fetchData.bind(this)
    }

      fetchData(){
          fetch(baseUrl+this.state.location).then(response => response.json())
          .then(responseData => {
            this.setState({
                data: this.state.data.concat(responseData.results[0].weather_data),
                index: this.state.data.concat(responseData.results[0].index),
              });
          })
          .catch(error => {
            console.error(error);
          });
      }

      setModalVisible(visible) {
        this.setState({ modalVisible: visible });
      }

      componentDidMount() {
        this.fetchData();
      }

    render(){
        return(
       <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >               
            <Button
            raised
            title='关闭'
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}/>
            <FlatList
                data={this.state.index}
                renderItem={this.renderindex}
            />
 
        </Modal>     
        <View style={styles.btncontainer}>
        <SearchBar
            lightTheme
            inputStyle={{width:230}}
            onChangeText={(location) => this.setState({location})}
            icon={{ type: 'font-awesome', name: 'search' }}
            placeholder={this.state.location} />
         <Button
          title='查询'
          width= '40'
          onPress={() => {
            this.setState({
                data: [],
                index: [],
              });
            this.fetchData();
          }}
        />
        <Button
          title='指数'
          width= '40'
          onPress={() => {
            this.setModalVisible(true);
          }}
        />
        </View>
          <View style={styles.flatList}>
               <FlatList
                  data={this.state.data}
                  renderItem={this.renderItem}
              /> 
          </View>
        </View>
        )
    }

    renderindex({ item,i }){
        return(
          <Card  key={i} title={item.title}>
              <Text style={styles.list}>{item.tipt} : {item.zs}</Text>
              <Text style={styles.list}>{item.des}</Text>
          </Card>

        )
    }

    renderItem({ item,i }){
        return(
            <Card key={i} title={item.date}>
                <Text style={styles.list}>{item.weather}</Text>
                <Text style={styles.list}>{item.wind}</Text>
                <Text style={styles.list}>{item.temperature}</Text>
            </Card>
        )
    }
}

var styles = StyleSheet.create({
    btncontainer:{
       flexDirection: 'row',
       justifyContent: 'space-around',
       alignItems: "center",
    },
    list: {
        fontSize: 15,
        paddingTop: 10,
      },
    flatList:{
        paddingBottom: 120,
      }
})