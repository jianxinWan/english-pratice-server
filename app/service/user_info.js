/* eslint-disable eol-last */
'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async find(uid) {
    const user = await this.app.mysql.query(`select * from user_info WHERE uid = ${uid}`);
    return Array.from(user);
  }
}

module.exports = UserService;