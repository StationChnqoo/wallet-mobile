import {Dimensions} from 'react-native';

class Utils {
  constructor() {}

  scale(n: number) {
    return (Dimensions.get('screen').width / 375) * n;
  }

  SCREEN_WITH = Dimensions.get('screen').width;
  SCREEN_HEIGHT = Dimensions.get('screen').height;

  Colors = {
    // https://material.colorion.co/
    RED: '#E53935',
    GREEN: '#689F38',
    ORANGE: '#EF6C00',
    PINK: '#F48FB1',
    BLUE: '#2196F3',
  };

  Config = {
    TOUCHABLE_OPACITY: 0.8,
  };
}

export {Utils};
