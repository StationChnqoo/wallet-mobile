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
    RED: '#FF5252',
    GREEN: '#689F38',
  };
}
export {Utils};
