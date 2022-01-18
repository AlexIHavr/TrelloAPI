import fs from 'fs';
import { v4 } from 'uuid';
import ApiError from '../errors/ApiError.js';

class TrelloDB {
  getAllItems(docName) {
    let data = [];

    if (!fs.existsSync('./docs')) {
      fs.mkdirSync('./docs');
    }

    if (fs.existsSync(`./docs/${docName}`)) {
      data = JSON.parse(fs.readFileSync(`./docs/${docName}`, { encoding: 'utf-8' }));
    } else {
      this._saveDB(docName, data);
    }

    return data;
  }

  getItemsWithFilter(docName, filterFields) {
    return this.getAllItems(docName).reduce((filteredItems, item) => {
      for (let field in filterFields) {
        if (item[field] !== filterFields[field]) {
          return filteredItems;
        }
      }

      filteredItems.push(item);
      return filteredItems;
    }, []);
  }

  getItem(docName, idItem) {
    const allData = this.getAllItems(docName);
    return allData.find(({ id }) => id === idItem);
  }

  addItem(docName, data) {
    const allData = this.getAllItems(docName);

    const newItem = { id: v4(), ...data };
    allData.push(newItem);

    this._saveDB(docName, allData);

    return newItem;
  }

  changeItem(docName, data) {
    const allData = this.getAllItems(docName);

    const itemIndex = this._getItemIndex(allData, data.id);

    allData[itemIndex] = { ...allData[itemIndex], ...data };

    this._saveDB(docName, allData);

    return allData[itemIndex];
  }

  deleteItem(docName, id) {
    const allData = this.getAllItems(docName);

    const itemIndex = this._getItemIndex(allData, id);

    const deletedItem = allData.splice(itemIndex, 1);

    this._saveDB(docName, allData);

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

  _saveDB(docName, data) {
    fs.writeFileSync(`./docs/${docName}`, JSON.stringify(data));
  }
}

export default new TrelloDB();
