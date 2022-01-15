import fs from 'fs';
import { v4 } from 'uuid';
import ApiError from '../errors/ApiError.js';

class DataBaseService {
  getAllDB(dbName) {
    let data = [];

    if (!fs.existsSync('./dataBase')) {
      fs.mkdirSync('./dataBase');
    }

    if (fs.existsSync(`./dataBase/${dbName}`)) {
      data = JSON.parse(fs.readFileSync(`./dataBase/${dbName}`, { encoding: 'utf-8' }));
    } else {
      this.saveDB(dbName, data);
    }

    return data;
  }

  getItemDB(dbName, idItem) {
    const allData = this.getAllDB(dbName);
    return allData.find(({ id }) => id === idItem);
  }

  getItemIndex(dataBD, idItem) {
    if (!idItem) {
      throw ApiError.BadRequest('Enter item id.');
    }

    const itemIndex = dataBD.findIndex(({ id }) => id === idItem);

    if (itemIndex === -1) {
      throw ApiError.BadRequest('Item with this id does not exist.');
    }

    return itemIndex;
  }

  addItemDB(dbName, data) {
    const allData = this.getAllDB(dbName);

    allData.push({ id: v4(), ...data });

    this.saveDB(dbName, allData);
  }

  changeItemDB(dbName, data) {
    const allData = this.getAllDB(dbName);

    const itemIndex = this.getItemIndex(allData, data.id);
    const item = allData[itemIndex];

    for (let key in item) {
      let changedItem = item[key];

      if (data[key] && item[key] !== data[key]) changedItem = data[key];

      allData[itemIndex][key] = changedItem;
    }

    this.saveDB(dbName, allData);
  }

  deleteItemDB(dbName, id) {
    const allData = this.getAllDB(dbName);

    const itemIndex = this.getItemIndex(allData, id);

    allData.splice(itemIndex, 1);

    this.saveDB(dbName, allData);
  }

  saveDB(dbName, data) {
    fs.writeFileSync(`./dataBase/${dbName}`, JSON.stringify(data));
  }
}

export default new DataBaseService();
