
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
    <Pressable onPress={handlePress} style={{ backgroundColor: color, width: size, height: size, borderRadius: 4 }} />
  );
}

const styles = StyleSheet.create({

});

export default Tile;
