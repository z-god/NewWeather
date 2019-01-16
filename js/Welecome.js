import React, { Component } from 'react'
import { ImageBackground } from "react-native";

export default class WelecomeScreen extends React.Component{
   static navigationOptions = {
    header:null,
    }
    constructor(props){
    super(props);
    this.Time = this.Time.bind(this)
    }

    componentDidMount(){
    this.Time()
    }
    
    Time(){
    setTimeout(()=>{
        this.props.navigation.navigate('Home')
    },2000)
    }

    componentWillUnmount(){
    clearTimeout();
    }

    render(){
        return(
            <ImageBackground style={{width: '100%', height: '100%'}} source={require('./img/1.jpg')} resizeMode='stretch'>
      </ImageBackground>
        )
    }
}

