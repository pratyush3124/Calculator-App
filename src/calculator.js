import React, {useEffect, useState} from 'react';
import styles from '../static/styles/style.js';
import {Text, View, Image, Pressable, BackHandler} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonPanel from './buttons.js';
import History from './history.js';

const Calculator = () => {
  const [value, setVal] = useState('');
  const [brack, setBrack] = useState(0);
  const [result, setRes] = useState('');
  const [final, setFinal] = useState(false);
  const [histToggle, setHistToggle] = useState(false);
  const [history, setHistory] = useState(0);

  useEffect(()=>{
    setRes(preProcess(value));
  }, [value])

  const preProcess = (expr) => {
    var a = '';
    var nums = [];
    var ops = [];
    for (let i=0; i<expr.length; i++){
      if(expr[i].match(/[0-9]/g)!==null){
        a += expr[i]; //if number append together
      } else { // as soon as operator comes push number.
        nums.push(a);
        ops.push(expr[i]);
        a = '';
      }
    }
    nums.push(a)
    if (nums.length===1){
      return '';
    }
    var b = evalArr(nums, ops)
    if (b==false){
      return '';
    } else {
      return b;
    }
  }

  const evalArr = function(nums, ops){
    while (ops.length>0){
      let max = 0;
      ops.map((elem, ind) => {
        if (precedence(ops[ind])>precedence(ops[max])){
          max = ind;
        }
      }); //finding max.
      nums[max] = evalOps(nums[max], ops[max], nums[max+1]); //operation and store in place
      nums.splice(max+1,1); //rem past operand
      ops.splice(max,1); //rem past operator.
      // console.log(max, nums,ops,a,o,b)
    }
    return nums[0];
  }

  const evalOps = (a,o,b) => {
    if (b=='' || b==undefined){
      return false;
    }
    switch(o){
      case '^':
        return Math.pow(a,b);
      case '/':
        return a/b;
      case 'x':
        return a*b;
      case '+':
        return (Number(a)+Number(b)).toString();
      case '-':
        return a-b;
      default:
        return false;
    }
  }

  const precedence = function(operator){
    switch(operator){
      case '^':
        return 3;
      case '/':
        return 2;
      case 'x':
        return 1;
      case '+':
      case '-':
        return 0;
    }
  }

  const remVal = () => {
    console.log("rem")
    setVal(prev => prev.slice(0,-1))
    setBrack(0);
  }

  const addVal = (a) => {
    if (final){
      setFinal(false);
      setVal('');
    }
    if (a==='='){
      showFinal();
    } else if (a===''){
      setVal('');
    } else if (a==='()'){
      setVal(prev=>{
        if (prev.slice(-1).match(/^[0-9]+$/)){
          if (brack==0){
            setBrack(prev=>prev+1);
            return prev+'x('
          } else {
            setBrack(prev=>prev+1);
            return prev+')'
          }
        } else {
          setBrack(prev=>prev+1)
          return prev+'('
        }
      })
    } else if (a.match(/[x\/\-\+\^]/g)!==null) {
      setVal(prev=>{
        if (prev==''){
          return prev
        } else if (prev.slice(-1).match(/[0-9]/g)){
          return prev+a.toString()
        }
        return prev.slice(0,-1)+a.toString()
      });
    } else {
      setVal(prev=>prev+a.toString())
    }
  };

  const showFinal = ()=>{
    if (result.toString()==='80085'){
      setVal("Pratyush zindabad!");
      setRes('');
      setFinal(true);
    } else if (result!==''){
      storeData();
      setVal(result);
      setRes('');
      setFinal(true);
    }
  }

  storeData = async () => {
    try {
      var hist = await AsyncStorage.getItem('hist');
      if (hist === null){
        hist = {'exp':[value.toString(),], 'res':[result.toString(),]}
      } else {
        hist = JSON.parse(hist);
        hist['exp'].push(value.toString())
        hist['res'].push(result.toString())
      }
      await AsyncStorage.setItem(
        'hist',
        JSON.stringify(hist)
      )
    } catch (error) {
      console.log(error)
    }
  };

  const seeHist = ()=>{
    (async () => {
      const hist = await AsyncStorage.getItem('hist');
      if (hist !== null) {
        setHistory(hist);
      }
    })().then(
      setHistToggle(prev=>!prev)
    );
  }

  BackHandler.addEventListener("hardwareBackPress",()=>{
    console.log("asdf");
    if (histToggle){
      setHistToggle(prev=>!prev)
    }
    return true;
  })

  const clearHistory = ()=>{
    const empty = JSON.stringify({'exp':[], 'res':[]});
    (async () => {
      await AsyncStorage.setItem('hist',
      empty,
    )})().then(setHistory(empty))
  }

  return (
    <View style={styles.container}>
      <View style={styles.work}>
        <Text style={final?styles.final:styles.value}> {value} </Text>
      </View>
      <View style={styles.work}>
        <Text style={styles.resVal}> {result} </Text>
      </View>
      <View style={styles.utils}>
        <View style={styles.histB}>
          <Pressable style={{width:35,height:35}} onPress={seeHist}>
            <Image style={{width:35,height:35}} source={require('../static/images/history512.png')}/>
          </Pressable>
        </View>
        <View style={styles.backB}>
        <Pressable style={{width:40,height:40}} onPress={remVal}>
          <Image style={{width:40,height:40}} source={require('../static/images/p512.png')}/>
        </Pressable>
        </View>
      </View>
      <View
        style={{
          width:370,
          borderBottomColor: 'gray',
          borderBottomWidth: 1,
          marginVertical: 15,
          opacity: 0.35,
        }}
      />
      {!histToggle && <ButtonPanel handKey={addVal} />}
      {histToggle && <History hist={history} clearHistory={clearHistory}/>}
    </View>
  );
};

export default Calculator;