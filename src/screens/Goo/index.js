import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTrail, animated } from 'react-spring/native';

const AnimatedView = animated(View);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    width: '100%',
    height: '100%',
  },

  circle: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: 'red',
    top: 0,
    left: 0,
  },
});

const fast = { tension: 1200, friction: 40 };
const slow = { mass: 10, tension: 200, friction: 50 };
const trans = (x, y) => [{ translateX: x }, { translateY: y }];

export default function Card3D() {
  const [trail, set] = useTrail(3, () => ({
    xy: [0, 0],
    config: i => (i === 0 ? fast : slow),
  }));

  const onResponderMove = e => {
    const { nativeEvent } = e;
    const { locationX: x, locationY: y } = nativeEvent;

    set({ xy: [x, y] });
  };

  return (
    <View
      style={styles.container}
      onResponderMove={onResponderMove}
      onStartShouldSetResponder={() => true}
    >
      {trail.map(({ xy }, i) => (
        <AnimatedView
          style={[styles.circle, { transform: xy.interpolate(trans) }]}
          accessible
          key={i}
        />
      ))}
    </View>
  );
}
