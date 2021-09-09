import React, {useEffect, useState} from 'react';
import {View, Image, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getFlickrPhoto, getFlickrPhotoPagination} from '../redux/actions';
import styles from './HomeStyle';
import SearchDb from '../database/SearchColumn';
import Loading from '../components/Loading';
import {appString} from '../constants/AppString';
import {Searchbar, Text} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';

const perPage = 10;
let pageNumber = 1;

const Home = ({navigation}) => {
  // communicate with redux
  const homeState = useSelector(state => state.homeReducer);
  const dispatch = useDispatch();
  // state
  const [searchText, onChangeText] = useState(null);
  const [suggestionText, onChangeSuggestionText] = useState([]);
  useEffect(() => {
    dataBaseTableCreate();
    pageNumber = 1;
    dispatch(
      getFlickrPhoto({
        page: pageNumber,
        per_page: perPage,
        text: appString.defaultSearchItem,
      }),
    );
  }, []);

  const pagination = pageNumber => {
    dispatch(
      getFlickrPhotoPagination({
        page: pageNumber,
        per_page: perPage,
        text: searchText ?? appString.defaultSearchItem,
      }),
    );
  };
  const searchSubmit = async () => {
    if (searchText) {
      pageNumber = 1;
      dispatch(getFlickrPhoto({page: pageNumber, per_page: perPage, text: searchText}));
      await saveSearchHistory(searchText);
      onChangeSuggestionText('');
    }
  };

  const dataBaseTableCreate = () => {
    SearchDb.createTable()
      .then(success => {
        console.log('table create successful');
      })
      .catch(err => {
        console.log('table create failure');
      });
  };
  const saveSearchHistory = async searchText => {
    SearchDb.create(
      new SearchDb({
        name: searchText,
      }),
    )
      .then(success => {
        console.log('insert data ' + success.save());
      })
      .catch(err => {
        console.log('insert data failure' + err);
      });
  };

  const getSearchHistory = searchText => {
    SearchDb.query({
      columns: 'id, name',
      where: {
        name_cont: `%${searchText}%`,
      },
      limit: 30,
    })
      .then(result => {
        onChangeSuggestionText(result);
        result.map(text => {
          console.log('Result ' + text.name);
        });
      })
      .catch(err => {
        console.log('find data failure' + err);
      });
  };

  const photoItems = items => {
    return (
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageView}
          source={{
            uri: `https://farm${items.farm}.static.flickr.com/${items.server}/${items.id}_${items.secret}.jpg`,
          }}
        />
      </View>
    );
  };

  const historyItems = items => {
    return (
      <TouchableOpacity
        style={styles.historyItems}
        onPress={() => {
          searchSubmit();
          onChangeText(items);
        }}>
        <Text>{items}</Text>
      </TouchableOpacity>
    );
  };
  const renderSeparator = () => {
    return <View style={styles.divider} />;
  };
  return (
    <View style={styles.mainView}>
      <Searchbar
        returnKeyType="search"
        placeholder={appString.searchPlaceHolder}
        onChangeText={text => {
          onChangeText(text);
          getSearchHistory(text);
        }}
        value={searchText}
        onSubmitEditing={searchSubmit}
      />
      <FlatList
        style={styles.flatListImageView}
        data={homeState?.photo}
        renderItem={({item}) => photoItems(item)}
        keyExtractor={(item, index) => index}
        numColumns={2}
        onEndReached={() => {
          pageNumber++;
          pagination(pageNumber);
        }}
      />
      <FlatList
        style={styles.flatListHistoryView}
        data={suggestionText}
        renderItem={({item}) => historyItems(item.name)}
        keyExtractor={(item, index) => index}
        ItemSeparatorComponent={renderSeparator}
      />
      {homeState.isFetching && <Loading />}
    </View>
  );
};

export default Home;
