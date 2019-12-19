/* eslint-disable eol-last */
'use strict';

const Service = require('egg').Service;

class StemService extends Service {

  async find(type) {
    const stems = await this.app.mysql.query(`
      SELECT 
      *
      FROM stem LEFT JOIN chapters 
      ON stem.chapter_id = chapters.chapter_id 
      WHERE priority=${type}
    `);
    return Array.from(stems);
  }

  async detail(params) {
    const stem_parent_questions = await this.app.mysql.query(`SELECT * FROM stem_parent_questions WHERE stem_id=${params.stem_id}`);
    const stem_child_questions = await this.app.mysql.query(`SELECT * FROM stem_child_questions WHERE stem_id=${params.stem_id} GROUP BY order_num`);
    const userStemDetail = await this.app.mysql.query(`SELECT * FROM user_answer_record WHERE stem_id=${params.stem_id} AND uid=${params.uid}`);
    return {
      user_answer_info: userStemDetail[0] || null,
      stem_parent_questions,
      stem_child_questions,
    };
  }
}

module.exports = StemService;