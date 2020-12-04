import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet,TextInput,Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
        scannedBookId: '',
        buttonState: 'normal',
        scannedStudentId:''
      }
    }

    getCameraPermissions = async (ID) =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      
      this.setState({
        /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
        hasCameraPermissions: status === "granted",
        buttonState: ID,
        scanned: false
      });
    }

    handleBarCodeScanned = async({type, data})=>{
      const {buttonState}=this.state
      if (buttonState==="bookID") {
        this.setState({
          scanned: true,
          scannedBookId: data,
          buttonState: 'normal'
        });
      } else if (buttonState==="studentID"){
        this.setState({
          scanned: true,
          scannedStudentId: data,
          buttonState: 'normal'
        });
      }
     
    }

    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;

      if (buttonState !== "normal" && hasCameraPermissions){
        return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        );
      }

      else if (buttonState === "normal"){
        return(
          <View style={styles.container}>
            <View>
              <Image source={require ("../assets/booklogo.jpg")} style={{width:200,height:200}}></Image>
              <Text style={{textAlign:"center",fontSize:30}}></Text>
            </View>
            <View style={styles.inputView}>
              <TextInput style={styles.inputBox} placeholder="bookID" value={this.state.scannedBookId} onChangeText={(text) => {
                this.setState({scannedBookId:text})
              }}></TextInput>
              <TouchableOpacity
            onPress={()=>{this.getCameraPermissions("bookID")}}
            style={styles.scanButton}>
            <Text style={styles.buttonText}>Scan</Text>
          </TouchableOpacity>
            </View>
            <View style={styles.inputView}>
              <TextInput style={styles.inputBox} placeholder="studentID" value={this.state.scannedStudentId} onChangeText={(text) => {
                this.setState({scannedStudentId:text})
              }}></TextInput>
              <TouchableOpacity
            onPress={()=>{this.getCameraPermissions("studentID")}}
            style={styles.scanButton}>
            <Text style={styles.buttonText}>Scan</Text>
          </TouchableOpacity>
            </View>
        </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      width:100,
      borderWidth:1.5,
      borderLeftWidth:0
    },
    buttonText:{
      fontSize: 20,
      textAlign:"center",
      marginTop:10
    },
    inputView:{
      flexDirection:"row",
      margin:20
    },
    inputBox:{
      width:200,
      height:40,
      borderWidth:1.5,
      borderRightWidth:0,
      fontSize:20
    }
  });