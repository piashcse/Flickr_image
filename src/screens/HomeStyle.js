import {StyleSheet} from 'react-native';
import {COLOR} from '../utils/Colors';
import { Dimensions } from "react-native";
let width = Dimensions.get('window').width; //full width

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
  },
  flatListImageView: {
    margin: 5,
  },
  imageContainer: {
    flex: 1,
    margin: 5,
  },
  imageView: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  flatListHistoryView: {
    width: '100%',
    position: 'absolute',
    top: 50,
    backgroundColor: COLOR.whiteColor,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  historyItems: {
    width: '100%',
    marginVertical: 15,
    marginHorizontal: 10,
  },
  divider: {
    backgroundColor: COLOR.suggestionContainerColor,
    height: 0.5,
  },
});
export default styles;
