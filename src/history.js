import React, {useEffect} from 'react';
import {View, Text, Pressable, ScrollView, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const History = (props) => {

  const hist = JSON.parse(props.hist);

  var histElems;
  if (hist){
    histElems = hist.exp.map((elem, ind)=>
      <Hist key={ind} exp={elem} res={hist.res[ind]}/>
    );
  } else {
    histElems = <></>;
  }

  return (
    <>
      <ScrollView style={{marginBottom:10, width:'100%'}}>
        {histElems}
      </ScrollView>
      <Pressable style={styles.button} onPress={props.clearHistory}>
        <Text style={{color: 'white'}}> Clear History </Text>
      </Pressable>
    </>
  );
};

const Hist = props => {
  return (
    <View style={{margin:5}}>
      <Text style={[styles.histElem, {fontSize:15,color:'green'}]}>{props.exp}</Text>
      <Text style={styles.histElem}>={props.res}</Text>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  button:{
    backgroundColor:'#3dc',
    borderRadius:20,
    paddingHorizontal:50,
    paddingVertical:10,
    marginBottom:10,
  },

  histElem:{
    fontSize:22,
    color:'#3dc',
    marginLeft:'auto',
    marginRight:15,
  }
})
