
import React, { Children } from 'react';
import type { PropsWithChildren } from 'react';
import {
  StyleSheet,
  Pressable,
} from 'react-native';

type TileProps = PropsWithChildren<{
  color: string;
  handlePress(): void;
  size?: number;
}>;

function Tile({ color, handlePress, size = 40 }: TileProps): JSX.Element {
  return (
    <Pressable onPress={handlePress} style={{ backgroundColor: color, width: size, height: size, ...styles.tile }} />
  );
}

const styles = StyleSheet.create({
  tile: {
    borderRadius: 4
  }
});

export default Tile;
