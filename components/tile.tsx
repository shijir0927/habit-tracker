
import React, { Children } from 'react';
import type { PropsWithChildren } from 'react';
import {
  StyleSheet,
  Pressable,
} from 'react-native';

type TileProps = PropsWithChildren<{
  color: string;
  handlePress(): void;
}>;

function Tile({ color, handlePress }: TileProps): JSX.Element {
  return (
    <Pressable onPress={handlePress} style={{ backgroundColor: color, width: 40, height: 40, borderRadius: 8 }} />
  );
}

const styles = StyleSheet.create({

});

export default Tile;
