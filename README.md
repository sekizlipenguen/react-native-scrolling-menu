![platforms](https://img.shields.io/badge/platforms-Android%20%7C%20iOS-brightgreen.svg?style=flat-square&colorB=191A17)
[![npm](https://img.shields.io/npm/v/react-native-scroll-menu.svg?style=flat-square)](https://www.npmjs.com/package/react-native-scroll-menu)
[![npm](https://img.shields.io/npm/dm/react-native-scroll-menu.svg?style=flat-square&colorB=007ec6)](https://www.npmjs.com/package/react-native-scroll-menu)


# react-native-scroll-menu

React native scrolling button horizontal

## Installation

```bash
npm i react-native-scroll-menu
```

```bash
yarn add react-native-scroll-menu
```

## Example

|                          Example                              |
| :-----------------------------------------------------------: |
| ![](assets/1.gif) | 
| ![](assets/2.gif) | 

## Usage

```JavaScript
import React, {Component} from 'react';
import {
    View
} from 'react-native';

//import this
import ScrollingButtonMenu from 'react-native-scroll-menu';


export default class Example extends Component
{

  render()
  {
    return (
        <ScrollingButtonMenu
            items={[
              {
                id: "1",
                name: 'Yaşam',
              },
              {
                id: "2",
                name: 'Zaman',
              },
              {
                id: "3",
                name: 'İnanç',
              },
              {
                id: "4",
                name: 'Cosmos',
              },
              {
                id: "5",
                name: 'Düşüş',
              },
            ]}
            onPress={(e) => {
              console.log(e);
            }}
            selected={"1"}
        />
    );
  }
}

//define menu
let menus = [
  {
    name: 'Sekiz',
    id: 1,
    backgroundColor: '#388E3C',
    borderColor: '#388E3C',
  },
  {
    text: 'Penguen',
    id: 2,
  }
];

```

## Props

| Key                         | Type           | Description                                                 |
|-----------------------------|----------------|-------------------------------------------------------------|
| `items`                     | Array          | Array for button menu is required                           |
| `onPress`                   | Function(menu) | Function when press button is required                      |
| `upperCase`                 | Boolean        | Uppercase text (optional) default value => false            |
| `selectedOpacity`           | Number         | Opacity when pressed button (optional) default value => 0.7 |
| `containerStyle`            | Object         | {}                                                          |
| `contentContainerStyle`     | Object         | {}                                                          |
| `scrollStyle`               | Object         | {}                                                          |
| `textStyle`                 | Object         | {}                                                          |
| `buttonStyle`               | Object         | {}                                                          |
| `activeButtonStyle`         | Object         | {}                                                          |
| `firstButtonStyle`          | Object         | {}                                                          |
| `lastButtonStyle`           | Object         | {}                                                          |
| `textStyle`                 | Object         | {}                                                          |
| `activeTextStyle`           | Object         | {}                                                          |
| `activeColor`               | string         | "#fffff"                                                    |
| `activeBackgroundColor`     | string         | "#fffff"                                                    |
| `selected`                  | number         | item id => 1                                                |
| `keyboardShouldPersistTaps` | string         | default => always                                           |
