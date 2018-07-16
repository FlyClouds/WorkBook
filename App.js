/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View,SectionList} from 'react-native';

const ITEM_HEIGHT = 44; //item的高度
const HEADER_HEIGHT = 24;  //分组头部的高度

export default class App extends Component {

  constructor(props) {
		super(props);
		this.state = {
			list: [],
		}
	}

	_getData() {
    const list = [{"title":"A","data":["a sad dog","accept or reject","adapt to","after meals","Aquarius","astonishing","at school"]},
    {"title":"B","data":["based on","be aware of","beach party","blood clot","bottom line","breakdown"]},
    {"title":"C","data":["care","censor","cheetah","coloring","colour","compatibility","comprtently","cook (v.)","courtesy"]},
    {"title":"D","data":["definite answer","dentist","Depreciation","desktop","drain","dry out"]},
    {"title":"E","data":["engineer","enterprise","exchange (v.)","explorers"]},
    {"title":"F","data":["fierce","Firm Grip","flight attendant","frozen"]},
    {"title":"G","data":["get down to","get to","Give-and-take","go dark","go to parties"]},
    {"title":"H","data":["hacker","have an effect on","Hollywood celebrity","Hungary"]},
    {"title":"I","data":["imaginary","in response to","intensive","Internal","intricacy"]},{"title":"K","data":["Kettlebells","Korean"]},
    {"title":"L","data":["late","liquid","literature","love"]},
    {"title":"M","data":["marketing method","Metrics","mobilepayment","moderate drinking","museum","musician"]},
    {"title":"N","data":["neutral"]},
    {"title":"P","data":["package","perfect","pills","plant","pound","prefer","proud"]},
    {"title":"R","data":["radio","reporters","resort","ridiculous"]},
    {"title":"S","data":["safety instruction card","second-hand","sex","singing tour","sliver","smooth","snowflake","soy sauce","start a rock band","street vendor"]},
    {"title":"T","data":["take a helicopter ride","Taurean","Thanks-giving Day","tip (n.)","tracking&tracing","training courses"]},
    {"title":"U","data":["up and down the hill","user-friendly"]},
    {"title":"V","data":["visually"]},
    {"title":"W","data":["weight-lifting","window-shopping","worthwhile"]}];

    this._setItemLayout(list);

    this.setState({
      list:list
    });
	}

	 //计算每个index的length和offset
  _setItemLayout(list) {

		let [itemHeight, headerHeight] = [ITEM_HEIGHT, HEADER_HEIGHT];
		let layoutList = [];
		let layoutIndex = 0;
		let layoutOffset = 0;
		list.forEach(section => {
			layoutList.push({
				index: layoutIndex,
				length: headerHeight,
				offset: layoutOffset,
			});
			layoutIndex += 1;
			layoutOffset += headerHeight;
			section.data.forEach(() => {
				layoutList.push({
					index: layoutIndex,
					length: itemHeight,
					offset: layoutOffset,
				});
				layoutIndex += 1;
				layoutOffset += itemHeight;
			});
			layoutList.push({
				index: layoutIndex,
				length: 0,
				offset: layoutOffset,
			});
			layoutIndex += 1;
		});

		this.layoutList = layoutList;
	}

	_getItemLayout(data, index) {
		let layout = this.layoutList.filter(n => n.index == index)[0];
		return layout;
	}


	_keyExtractor = (item, index) => index;

  _onSectionselect = (k) => {
		this.sectionList.scrollToLocation(
			{
				sectionIndex: k,
				itemIndex: 0,
				viewOffset: HEADER_HEIGHT,
			}
		);
  }
  
  componentDidMount(){
		this._getData();
	}

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}>
              <Text style={styles.headerTitle}>单词本</Text>
          </View>
          <SectionList
            ref={(ref) => { this.sectionList = ref }}
            showsVerticalScrollIndicator={false}
            getItemLayout={this._getItemLayout.bind(this)}
            keyExtractor={this._keyExtractor}
            sections={this.state.list}
            renderItem={ ({item }) => <View style={styles.sectionItem}><Text>{item}</Text></View>}
            renderSectionHeader={({ section }) => <View style={styles.sectionHeader}><Text style={styles.sectionHeaderTxt}>{section.title}</Text></View>}
          />
          <View style={styles.sectionTitleList}>
            {
              this.state.list.map((v, k) => {
                return (
                  <Text style={styles.titleText} key={k} onPress={() => { this._onSectionselect(k) }}>{v.title}</Text>
                )
              })
            })
          </View>
			</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header:{
    paddingTop: 20,
    backgroundColor: '#009887',
    height: 64,
    justifyContent: 'center',
    alignItems:'center',
  },
  headerTitle:{
    fontSize: 18,
    color:'#fff',
  },
  sectionHeader: {
		height: HEADER_HEIGHT,
		paddingLeft: 10,
		justifyContent: 'center',
		backgroundColor: 'rgba(247,247,247,1.0)',
	},
	sectionHeaderTxt: {
		fontSize: 14,
		fontWeight: 'bold',
	},
	sectionItem: {
		height: ITEM_HEIGHT,
		paddingLeft: 10,
		justifyContent: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
		backgroundColor: '#fff',
	},
	//右侧标题
	sectionTitleList: {
		position: 'absolute',
		right: 10,
		top: 10,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
		justifyContent:'center',
	},
	titleText: {
		color: '#666',
		textAlign: 'center',
		paddingVertical: 1,
		width: 20,
	},
});
