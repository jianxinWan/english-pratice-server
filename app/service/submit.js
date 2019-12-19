/* eslint-disable eol-last */
'use strict';

const Service = require('egg').Service;
const moment = require('moment');

class SubmitService extends Service {

  async submitItem(params) {
    const {
      uid,
      answer_array,
      stem_id,
      chapter_id,
      question_id,
    } = params;
    const time = new Date();
    const insertAnswer = await this.app.mysql.insert('user_answer_record', {
      uid,
      answer_array: JSON.stringify(answer_array),
      stem_id,
      chapter_id,
      question_id,
      answer_time: moment(time).valueOf(),
    });
    return Array.from(insertAnswer);
  }
}

module.exports = SubmitService;