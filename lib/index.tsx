import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, LayoutRectangle, ScrollView, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle,} from 'react-native';

interface ItemRectangle {
  rectangle: LayoutRectangle;
  id: string;
}
export const {width: screenWidth, height: screenHeight} =
  Dimensions.get('window');

type routeProps = {
  id: string;
  name: string;
};

export type NavigationTabsProps = {
  id: string;
  name: string;
};

type ScrollingButtonMenuProps = {
  items: Array<NavigationTabsProps>;
  onPress: (route: routeProps) => void;
  upperCase?: boolean;
  textStyle?: StyleProp<TextStyle>;
  activeTextStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  firstButtonStyle?: StyleProp<ViewStyle>;
  lastButtonStyle?: StyleProp<ViewStyle>;
  activeButtonStyle?: StyleProp<ViewStyle>;
  activeColor?: string;
  activeBackgroundColor?: string;
  selected: string;
  selectedOpacity?: number;
  containerStyle?: object;
  keyboardShouldPersistTaps?: boolean | 'always' | 'never' | 'handled';
};

const ScrollingButtonMenu: React.FC<ScrollingButtonMenuProps>
    = ({
         items,
         onPress,
         upperCase = false,
         textStyle,
         activeTextStyle,
         buttonStyle,
         firstButtonStyle,
         lastButtonStyle,
         activeButtonStyle,
         activeColor = '',
         activeBackgroundColor = '#1e1e1e',
         selected = '',
         selectedOpacity = 0.7,
         containerStyle = {},
         keyboardShouldPersistTaps = 'always',
       }) => {
  const [selectedId, setSelectedId] = useState<string>();
  const scrollViewRef = useRef<ScrollView>(null);
  const dataSourceCords = useRef<ItemRectangle[]>([]);

  useEffect(() => {
    if (selected !== selectedId) {
      setSelectedId(selected);
      _scrollTo();
    }

    if (selected) {
      setSelectedId(selected);
      setTimeout(() => {
        _scrollTo();
      }, 600);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const _scrollTo = () => {
    if (dataSourceCords.current.length === 0) {
      return;
    }
    const screen1 = screenWidth / 2;
    const itemRectangle = dataSourceCords.current.find(
      x => x.id === selectedId,
    );
    if (!itemRectangle) {
      return;
    }
    const elementOffset = itemRectangle.rectangle;
    if (
      elementOffset !== undefined &&
      typeof scrollViewRef.current?.scrollTo === 'function'
    ) {
      let x = elementOffset.x - (screen1 - elementOffset.width / 2);
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          y: 0,
          x: x,
          animated: true,
        });
      }
    }
  };

  return (
    <View style={[styles.scrollArea, containerStyle]}>
      <ScrollView
          ref={scrollViewRef}
          horizontal={true}
          pagingEnabled={false}
          showsHorizontalScrollIndicator={false}
          style={styles.scroll}
          contentContainerStyle={styles.scrollContainer}
          scrollEventThrottle={200}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}>
        {
          items.map((route, i) => (
              <TouchableOpacity
                  style={[
                    styles.tabItem,
                    selectedId === route.id && styles.tabItemFocused,
                    buttonStyle ? buttonStyle : styles.buttonStyles,
                    (selectedId === route.id ? activeButtonStyle : {}),
                    selectedId === route.id && activeBackgroundColor ? {backgroundColor: activeBackgroundColor} : false,
                    (i == 0 ? firstButtonStyle : {}),
                    (i == items.length - 1 ? lastButtonStyle : {}),
                  ]}
                  key={(route.id ? route.id : i).toString()}
                  onPress={() => {
                    setSelectedId(route.id);
                    setTimeout(() => {
                      _scrollTo();
                      return onPress(route);
                    }, 50);
                  }}
                  onLayout={event => {
                    const layout = event.nativeEvent.layout;
                    dataSourceCords.current[i] = {
                      id: route.id,
                      rectangle: layout,
                    };
                  }}
                  activeOpacity={selectedOpacity}>
                <Text
                    style={[
                      textStyle ? textStyle : styles.tabItemText,
                      selectedId === route.id && activeTextStyle,
                      selectedId === route.id && styles.tabItemTextFocused,
                      selectedId === route.id && activeColor ? {color: activeColor} : false,
                    ]}>
                  {upperCase ? route.name.toUpperCase() : route.name}
                </Text>
              </TouchableOpacity>
          ))
        }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollArea: {
    paddingLeft: 20,
    paddingTop: 20,
  },
  scroll: {},
  scrollContainer: {},
  tabItem: {
    borderRadius: 18,
    borderColor: '#858585',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 6,
    paddingLeft: 15,
    paddingRight: 15,
    marginRight: 10,
  },
  tabItemText: {
    color: '#5d5d5d',
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    textAlign: 'left',
    lineHeight: 20,
  },
  tabItemFocused: {
    borderWidth: 0,
  },
  tabItemTextFocused: {
    color: '#fff',
  },
  buttonStyles: {
    backgroundColor: '#fff',
  },
});

export default ScrollingButtonMenu;
