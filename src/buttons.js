import React from 'react';
import {StyleSheet, View, Text, Pressable, Animated} from 'react-native';

const ButtonPanel = props => {
  return (
    <View style={styles.Pane}>
      <Butt name="C" onp={()=>{props.handKey('')}} st={styles.colR} />
      <Butt name="( )" onp={()=>{props.handKey('()')}} st={styles.colP} />
      <Butt name="%" onp={()=>{}} st={styles.colP} />
      <Butt name="/" onp={()=>{props.handKey('/')}} st={styles.colP} />
      <Butt name="7" onp={()=>{props.handKey('7')}} />
      <Butt name="8" onp={()=>{props.handKey('8')}} />
      <Butt name="9" onp={()=>{props.handKey('9')}} />
      <Butt name="x" onp={()=>{props.handKey('x')}} st={styles.colP} />
      <Butt name="4" onp={()=>{props.handKey('4')}} />
      <Butt name="5" onp={()=>{props.handKey('5')}} />
      <Butt name="6" onp={()=>{props.handKey('6')}} />
      <Butt name="-" onp={()=>{props.handKey('-')}} st={styles.colP} />
      <Butt name="1" onp={()=>{props.handKey('1')}} />
      <Butt name="2" onp={()=>{props.handKey('2')}} />
      <Butt name="3" onp={()=>{props.handKey('3')}} />
      <Butt name="+" onp={()=>{props.handKey('+')}} st={styles.colP} />
      <Butt name="." onp={()=>{props.handKey('.')}} />
      <Butt name="0" onp={()=>{props.handKey('0')}} />
      <Butt name="^" onp={()=>{props.handKey('^')}} st={styles.colP} />
      <Butt name="=" onp={()=>{props.handKey('=')}} />
    </View>
  );
};

const Butt = props => {

  const opVal = new Animated.Value(1);
  const tsmal = new Animated.Value(1)
  var tstyle, pstyle;

  const pressIn = ()=>{
    Animated.timing(opVal, {
      toValue: 0.5,
      duration: 5,
      useNativeDriver: true
    }).start();
    Animated.timing(tsmal, {
      toValue: 0.8,
      duration: 5,
      useNativeDriver: true
    }).start();
  }

  const pressOut = ()=>{
    Animated.timing(opVal, {
      toValue: 1,
      duration: 5,
      useNativeDriver: true
    }).start();
    Animated.timing(tsmal, {
      toValue: 1,
      duration: 5,
      useNativeDriver:true
    }).start();
  }
  
  if (props.name == '=') {
    tstyle = [styles.text, styles.colB]
    pstyle = [styles.button, styles.cP]
  } else {
    tstyle = [styles.text, props.st]
    pstyle = [styles.button, styles.lB]
  }

  return (
    <Animated.View style={{opacity: opVal}}>
      <Pressable style={pstyle} onPress={props.onp} onPressIn={pressIn} onPressOut={pressOut}>
        <Animated.Text style={[...tstyle,{transform: [{scale:tsmal}]}]}> {props.name} </Animated.Text>
      </Pressable>
    </Animated.View>
  );
};

export default ButtonPanel;

const width = 390;

const styles = StyleSheet.create({
  lB: {
    backgroundColor: '#222',
  },

  cP: {
    backgroundColor: '#e99',
  },

  Pane: {
    flex: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width,
    height: width,
    backgroundColor: '#111',
  },

  button: {
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 11,
    width: (width - 11 * 4 * 2) / 4,
    height: (width - 11 * 4 * 2) / 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },

  text: {
    color: '#3dc',
    fontSize: 30,
    textAlign: 'center',
  },
  colM: {
    color: '#3dc',
  },
  colR: {
    color: '#d22',
  },
  colP: {
    color: '#e99',
  },
  colB: {
    color: '#222',
  },
});

