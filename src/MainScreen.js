import * as React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FilterScreen} from './FilterScreen';
import {MealDetail} from './MealDetail';
import {
  getAreas,
  searchByFirstLetter,
  searchMealById,
  searchMealByName,
  viewRandomMeal,
} from './services';

const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

export const MainScreen = () => {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [list, setList] = React.useState([]);
  const [detailVisible, setDetailVisible] = React.useState(false);
  const [detail, setDetail] = React.useState({});
  const [filterVisible, setFilterVisible] = React.useState(false);
  const [areas, setAreas] = React.useState([]);

  const searchMeal = async () => {
    setLoading(true);
    const meals = await searchMealByName(search);
    setList(meals.meals);
    setLoading(false);
  };

  const onDetailPress = async item => {
    setLoading(true);
    const result = await searchMealById(item.idMeal);
    setDetail(result.meals[0]);
    setLoading(false);
    setDetailVisible(true);
  };

  const onRandomPress = async () => {
    setLoading(true);
    const result = await viewRandomMeal();
    setList(result.meals);
    setLoading(false);
  };

  const onLetterPress = async letter => {
    setLoading(true);
    const result = await searchByFirstLetter(letter);
    setList(result.meals);
    setLoading(false);
  };

  const onFilterPress = async () => {
    setLoading(true);
    const result = await getAreas();
    setAreas(result.meals);
    setLoading(false);
    setFilterVisible(true);
  };

  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.mealItem}
        onPress={() => onDetailPress(item)}>
        <View style={{alignItems: 'center', marginRight: 16}}>
          <Image
            source={{uri: item.strMealThumb}}
            style={{width: 150, height: 115}}
          />
          <Text style={{marginTop: 8}}>{item.strMeal}</Text>
        </View>
        <View>
          <Text>Category: {item.strCategory}</Text>
          <Text style={{marginTop: 8}}>Area: {item.strArea}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <ScrollView>
        <View
          style={[
            styles.container,
            {paddingTop: insets.top, paddingBottom: insets.bottom},
          ]}>
          <Text style={styles.title}>Meal Finder</Text>
          <View style={styles.searchRow}>
            <TextInput
              placeholder="Enter meal name"
              style={styles.textInput}
              value={search}
              onChangeText={value => setSearch(value)}
            />
            <TouchableOpacity style={styles.btnSearch} onPress={searchMeal}>
              <Text style={{fontWeight: 'bold', color: 'white'}}>Search</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.btnSearch, styles.otherBtn]}
            onPress={onFilterPress}>
            <Text style={{fontWeight: 'bold', color: 'white'}}>
              Filter Meals
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnSearch, styles.otherBtn]}
            onPress={onRandomPress}>
            <Text style={{fontWeight: 'bold', color: 'white'}}>
              View A Random Meal
            </Text>
          </TouchableOpacity>
          <View style={{marginTop: 24}}>
            <ActivityIndicator animating={loading} />
            <View style={{width: '80%', alignItems: 'center'}}>
              {list.map((item, index) => renderItem(item, index))}
            </View>
          </View>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>Browse by Name</Text>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {alphabet.map((item, index) => (
              <View key={index} style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => onLetterPress(item)}>
                  <Text
                    style={{
                      color: '#e7833b',
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
                <Text>/</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <MealDetail
        meal={detail}
        visible={detailVisible}
        setVisible={setDetailVisible}
      />
      <FilterScreen
        visible={filterVisible}
        setVisible={setFilterVisible}
        cate={[]}
        area={areas}
        ingredients={[]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    height: 30,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: '75%',
  },
  btnSearch: {
    backgroundColor: '#e7833b',
    borderRadius: 8,
    height: 30,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  otherBtn: {
    marginTop: 16,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  mealItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
});
