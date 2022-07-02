import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Modal} from 'react-native-ui-lib';

export const FilterScreen = ({
  visible,
  setVisible,
  cate,
  area,
  ingredients,
}) => {
  const insets = useSafeAreaInsets();

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
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Filter By Area</Text>
        {area.map((item, index) => (
          <TouchableOpacity key={index} style={{marginLeft: 8}}>
            <Text>{item.strArea}</Text>
          </TouchableOpacity>
        ))}
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
});
