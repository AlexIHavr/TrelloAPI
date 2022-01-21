import fs from 'fs';
import { v4 } from 'uuid';
import ApiError from '../errors/ApiError.js';

class BaseRepository {
  constructor(docName) {
    this._docName = docName;
  }

  getAllItems() {
    let data = [];

    if (!fs.existsSync('./docs')) {
      fs.mkdirSync('./docs');
    }

    if (fs.existsSync(`./docs/${this._docName}`)) {
      data = JSON.parse(fs.readFileSync(`./docs/${this._docName}`, { encoding: 'utf-8' }));
    } else {
      this._saveDB(data);
    }

    return data;
  }

  getItemsByFilter(filterFields) {
    return this.getAllItems().reduce((filteredItems, item) => {
      for (let field in filterFields) {
        if (item[field] !== filterFields[field]) {
          return filteredItems;
        }
      }

      filteredItems.push(item);
      return filteredItems;
    }, []);
  }

  getItem(idItem) {
    const allData = this.getAllItems();
    const item = allData.find(({ id }) => id === idItem);

    if (!item) {
      throw ApiError.BadRequest('Item with this id does not exist.');
    }

    return item;
  }

  addItem(data) {
    const allData = this.getAllItems();

    const newItem = { id: v4(), ...data };
    allData.push(newItem);

    this._saveDB(allData);

    return newItem;
  }

  changeItem(data) {
    const allData = this.getAllItems();

    const itemIndex = this._getItemIndex(allData, data.id);

    allData[itemIndex] = { ...allData[itemIndex], ...data };

    this._saveDB(allData);

    return allData[itemIndex];
  }

  deleteItem(id) {
    const allData = this.getAllItems();

    const itemIndex = this._getItemIndex(allData, id);

    const deletedItem = allData.splice(itemIndex, 1);

    this._saveDB(allData);

    return deletedItem;
  }

  _getItemIndex(dataBD, idItem) {
    if (!idItem) {
      throw ApiError.BadRequest('Enter item id.');
    }

    const itemIndex = dataBD.findIndex(({ id }) => id === idItem);

    if (itemIndex === -1) {
      throw ApiError.BadRequest('Item with this id does not exist.');
    }

    return itemIndex;
  }

  _saveDB(data) {
    fs.writeFileSync(`./docs/${this._docName}`, JSON.stringify(data));
  }
}

export default BaseRepository;
