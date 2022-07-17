import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, ScrollView, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle,} from 'react-native';

export const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

type routeProps = {
    id: string;
    name: string;
};

type NavigationTabsProps = {
    id: string;
    name: string;
};

type ScrollingButtonMenuProps = {
    items: Array<NavigationTabsProps>;
    onPress: (route: routeProps) => void;
    upperCase?: boolean;
    textStyle?: StyleProp<TextStyle>;
    buttonStyle?: StyleProp<ViewStyle>;
    activeColor: string;
    activeBackgroundColor?: string;
    selected: string;
    selectedOpacity?: number;
    containerStyle?: object;
    keyboardShouldPersistTaps?: boolean | 'always' | 'never' | 'handled';
};

const ScrollingButtonMenu: React.FC<ScrollingButtonMenuProps> = (
    {
        items,
        onPress,
        upperCase = false,
        textStyle,
        buttonStyle,
        activeColor = '',
        activeBackgroundColor = '#1e1e1e',
        selected = '',
        selectedOpacity = 0.7,
        containerStyle = {},
        keyboardShouldPersistTaps = 'always',
    }
) => {
    const [index, setIndex] = useState<number>();

    const scrollViewRef = useRef<ScrollView>(null);
    const dataSourceCords: [] = [];

    useEffect(() => {
        if (selected != index) {
            setIndex(selected);
            _scrollTo();
        }

        if (selected) {
            setIndex(selected);
            setTimeout(() => {
                _scrollTo();
            }, 200);
        }
    }, [selected]);

    const _scrollTo = () => {
        const screen1 = screenWidth / 2;
        const elementOffset = dataSourceCords[index];
        if (elementOffset !== undefined && typeof scrollViewRef.current?.scrollTo === 'function') {
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
                keyboardShouldPersistTaps={keyboardShouldPersistTaps}
            >
                {items.map((route, i) => (
                    <TouchableOpacity
                        style={[
                            styles.tabItem,
                            index === route.id && styles.tabItemFocused,
                            buttonStyle ? buttonStyle : styles.buttonStyles,
                            index === route.id && activeBackgroundColor ? {backgroundColor: activeBackgroundColor} : false,
                        ]}
                        key={(route.id ? route.id : i).toString()}
                        onPress={() => {
                            setIndex(route.id);
                            setTimeout(() => {
                                _scrollTo();
                                return onPress(route);
                            }, 50);
                        }}
                        onLayout={(event) => {
                            const layout = event.nativeEvent.layout;
                            dataSourceCords[route.id] = layout;
                        }}
                        activeOpacity={selectedOpacity}
                    >
                        <Text
                            style={[
                                textStyle ? textStyle : styles.tabItemText,
                                index == route.id && styles.tabItemTextFocused,
                                index == route.id && activeColor ? {color: activeColor} : false,
                            ]}
                        >
                            {upperCase ? route.name.toUpperCase() : route.name}
                        </Text>
                    </TouchableOpacity>
                ))}
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
        fontFamily: 'AvenirNext-Medium',
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
});

export default ScrollingButtonMenu;
