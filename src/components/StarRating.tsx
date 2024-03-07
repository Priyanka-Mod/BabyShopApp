import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

type starRating={
  value?: number;
  onChange?: (obj0: number) => void;
  size?: number;
  gap?: number;
}

export const Star = ({
    value = 0,
    onChange,
    size = 20,
    gap = 5,
  } :starRating ) => {
    return (
      <View className="flex-row items-center" style={{ gap: gap}}>
        {Array(5)
          .fill('')
          .map((_, index) => (
            <TouchableOpacity
              key={index.toString()}
              disabled={!onChange}
              onPress={() => onChange?.(index + 1)}>
              <Image
                source={require('../assets/img/star.png')}
                style={[styles.starStyle,
                  {height: size,
                    width: size,
                    tintColor: index < value ? '#018BCC' : '#e2e2e2',
                }]}
              />
            </TouchableOpacity>
          ))}
      </View>
    );
  };

  const styles = StyleSheet.create({
    starStyle:{
      resizeMode: 'contain'
    }
  })