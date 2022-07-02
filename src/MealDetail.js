import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Modal} from 'react-native-ui-lib';

export const MealDetail = ({meal, visible, setVisible}) => {
  const insets = useSafeAreaInsets();

  const mapIngredients = () => {
    const result = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`] !== '')
        result.push(`${meal[`strIngredient${i}`]}: ${meal[`strMeasure${i}`]}`);
      else break;
    }
    return result;
  };
  const ingredients = mapIngredients();

  return (
    <Modal visible={visible}>
      <View
        style={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingHorizontal: 8,
        }}>
        <TouchableOpacity onPress={() => setVisible(false)}>
          <Text style={styles.closeBtn}>X</Text>
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Image
            source={{uri: meal.strMealThumb}}
            style={{width: 250, height: 175}}
          />
        </View>
        <Text style={[styles.txtMeal, {fontSize: 20}]}>{meal.strMeal}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 12,
          }}>
          <View style={[styles.tag, {marginRight: 16}]}>
            <Text style={{color: '#e7833b'}}>{meal.strCategory}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={{color: '#e7833b'}}>{meal.strArea}</Text>
          </View>
        </View>
        <Text style={styles.txtMeal}>Instructions</Text>
        <View style={{paddingHorizontal: 12, marginTop: 12}}>
          <Text>{meal.strInstructions}</Text>

          <View>
            <Text style={styles.txtMeal}>Ingredients</Text>
            {ingredients.map((item, index) => (
              <Text key={index}>• {item}</Text>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeBtn: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    marginRight: 12,
  },
  txtMeal: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tag: {
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#e7833b',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
