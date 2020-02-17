import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  SafeAreaView,
} from 'react-native';
import { useSpring, animated } from 'react-spring/native';

const AnimatedView = animated(View);
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const calc = (x, y) => [
  -(y - deviceHeight / 2) / 20,
  (x - deviceWidth / 2) / 20,
  1.1,
];
const trans = (x, y, s) => [
  { perspective: 600 },
  { rotateX: `${x}deg` },
  { rotateY: `${y}deg` },
  { scale: s },
];

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },

  card: {
    width: 300,
    height: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
});

export default function Card3D() {
  const [{ xys }, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 500, friction: 40 },
  }));

  const onResponderMove = e => {
    const { nativeEvent } = e;
    const { locationX: x, locationY: y } = nativeEvent;

    set({ xys: calc(x, y) });
  };

  return (
    <SafeAreaView>
      <View style={styles.cardContainer}>
        <AnimatedView
          style={[styles.card, { transform: xys.interpolate(trans) }]}
          accessible
          onStartShouldSetResponder={() => true}
          onResponderMove={onResponderMove}
          onResponderRelease={() => set({ xys: [0, 0, 1] })}
        >
          <Image
            style={{ width: 300, height: 300 }}
            source={require('@/assets/img/natural.jpg')}
          />
        </AnimatedView>
      </View>
    </SafeAreaView>
  );
}
