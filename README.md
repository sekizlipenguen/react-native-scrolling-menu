# react-native-scrolling-button-menu
React native scrolling button horizontal

## Installation

## Usage
```JavaScript
import React, { Component } from 'react';
import {
  View
} from 'react-native';

//import this
import ScrollingMenu from 'react-native-scrolling-menu';

//define menu
let menus = [
    {
       name:'Sekiz',
       id:1,
       backgroundColor:'#388E3C',
       borderColor:'#388E3C',
    },
    {
       text:'Penguen',
       id:2,
    }
];

export default class Example extends Component {

  onPressButtonMenu(menu) {
    console.log(menu.text);
  }

  render() {
    return (
      //render this
      <ScrollingMenu 
        items={menus}
        style={{padding:15}}
        onPress={this.onPressButtonMenu.bind(this)}
      />
    );
  }
}

```

## Props
|Key |Type |Description |
|--- |--- |--- |
|`items`|Array|Array for button menu is required|
|`onPress`|Function(menu)|Function when press button is required|
|`upperCase`|Boolean|Uppercase text (optional) default value => true|
|`selectedOpacity`|Number|Opacity when pressed button (optional) default value => 0.7|
|`buttonStyle`| Object| {borderRadius: 4,backgroundColor: '#df0c36', marginRight:10}
|`textStyle`| Object| {padding:10,color: '#ffffff',fontSize: 14,fontWeight: '500',}
