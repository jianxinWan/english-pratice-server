/* eslint-disable eol-last */
'use strict';

const Service = require('egg').Service;

class ExerciseService extends Service {
    async queryList(type) {
        return await this.app.mysql.query(`SELECT * FROM chapters WHERE type=${type}`);
    }

    async getParentList(arr) {
        const res = await this.app.mysql.query(`SELECT * FROM stem_parent_questions WHERE question_id=${arr[0]}`)
        return res;
    }

    async getChildList(arr) {
        console.log('getChildList');
        return [];
    }

    async getStemInfo(id) {
        const stem = await this.app.mysql.get('stem', {
            stem_id: id
        });
        if (!stem) return
        const {
            stem_parent_ques_list,
            stem_child_ques_list
        } = stem;
        stem.stem_parent_questions = await this.getParentList(JSON.parse(stem_parent_ques_list));
        stem.stem_child_questions = await this.app.mysql.query(`SELECT * FROM stem_child_questions WHERE stem_id=${id} GROUP BY order_num`);
        // stem.user_answer_info = await this.app.mysql.query(`SELECT * FROM user_answer_record WHERE stem_id=${id} AND uid=${''}`) || null;
        delete stem.stem_parent_ques_list;
        delete stem.stem_child_ques_list;
        return stem
    }

    async queryDetail(id) {
        const stemList = await this.app.mysql.get('stem_list', {
            stem_list_id: id
        });
        const {
            priority1,
            priority2,
            priority3,
            priority4,
            priority5,
            priority6
        } = stemList
        console.log('stemList', stemList)
        const stemItem1 = await this.getStemInfo(priority1)
        const stemItem2 = await this.getStemInfo(priority2)
        const stemItem3 = await this.getStemInfo(priority3)
        const stemItem4 = await this.getStemInfo(priority4)
        const stemItem5 = await this.getStemInfo(priority5)
        const stemItem6 = await this.getStemInfo(priority6)
        return [stemItem1, stemItem2, stemItem3, stemItem4, stemItem5, stemItem6]
    }
    async submit() {
        return {}
    }
}

module.exports = ExerciseService;