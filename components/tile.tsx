
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
  isToday?: boolean
}>;

function Tile({ color, handlePress, size = 40, isToday = false }: TileProps): JSX.Element {
  let customStyle = {}
  if (isToday) {
    customStyle = { borderWidth: 2 }
  }
  return (
    <Pressable onPress={handlePress} style={{ backgroundColor: color, width: size, height: size, borderColor: 'white', ...styles.tile, ...customStyle }} />
  );
}

const styles = StyleSheet.create({
  tile: {
    borderRadius: 4,
    marginBottom: 8,
    marginRight: 8
  }
});

export default Tile;
