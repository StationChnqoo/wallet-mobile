import {Dimensions} from 'react-native';

class Utils {
  constructor() {}

  scale(n: number) {
    return (Dimensions.get('screen').width / 375) * n;
  }

  SCREEN_WITH = Dimensions.get('screen').width;
  SCREEN_HEIGHT = Dimensions.get('screen').height;
}
export {Utils};
