import React from 'react';
import PropTypes from 'prop-types';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';

class ScrollingButtonMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    _onPress(data) {
        this.props.onPress(data);
    }

    _renderRow(data) {
        console.log(data.item.id, this.props.selected);
        let activeColor = {};
        let activeBackgroundColor = {};

        if (data.item.id == this.props.selected) {
            activeColor = {color: this.props.activeColor};
        }

        if (data.item.id == this.props.selected) {
            activeBackgroundColor = {backgroundColor: this.props.activeBackgroundColor};
        }

        return (
            <TouchableOpacity style={[this.props.buttonStyle, activeBackgroundColor]} activeOpacity={this.props.selectedOpacity} onPress={() => this._onPress(data)} key={data.index}>
                <Text style={[this.props.textStyle, activeColor]}>{this.props.upperCase ? data.item.name.toUpperCase() : data.item.name}</Text>
            </TouchableOpacity>
        );
    }

    render() {

        return (
            <View>
                <FlatList
                    data={this.props.items}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    style={this.props.style}
                    ListFooterComponent={() => {
                        return (<View style={{padding: this.props.paddingListEnd}}/>);
                    }}
                    renderItem={({item, index, separators}) => this._renderRow({item, index, separators})}
                    {...this.props}
                />
            </View>
        );
    }
}

ScrollingButtonMenu.propTypes = {
    items: PropTypes.array.isRequired,
    onPress: PropTypes.func.isRequired,
    upperCase: PropTypes.bool,
    textStyle: PropTypes.object,
    buttonStyle: PropTypes.object,
    activeColor: PropTypes.string,
    activeBackgroundColor: PropTypes.string,
    selected: PropTypes.string,
};

ScrollingButtonMenu.defaultProps = {
    selectedOpacity: 0.7,
    upperCase: true,
    textStyle: {
        padding: 10,
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '500',
    },
    buttonStyle: {
        borderRadius: 4,
        backgroundColor: '#df0c36',
        marginRight: 10,
    },
    activeColor: '',
    activeBackgroundColor: '',
    selected: '',
};

module.exports = ScrollingButtonMenu;
