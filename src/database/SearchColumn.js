import SQLite from 'react-native-sqlite-storage';
import {BaseModel, types} from 'react-native-sqlite-orm';

export default class SearchColumn extends BaseModel {
  constructor(obj) {
    super(obj);
  }

  static get database() {
    return async () => SQLite.openDatabase({name: 'search.db'});
  }

  static get tableName() {
    return 'search';
  }

  static get columnMapping() {
    return {
      id: {type: types.INTEGER, primary_key: true}, // For while only supports id as primary key
      name: {type: types.TEXT, not_null: true},
      timestamp: {type: types.INTEGER, default: () => Date.now()},
    };
  }
}
