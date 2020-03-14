/* eslint-disable eol-last */
'use strict';

const Service = require('egg').Service;

function getRandom(n, m) {
  const num = Math.floor(Math.random() * (m - n + 1) + n);
  return num;
}

class SpiderService extends Service {

  async generateStemId() {
    const stemListId = getRandom(1000, 10000);
    const hasStemListId = await this.app.mysql.get('stem_list', {
      stem_list_id: stemListId,
    });
    if (hasStemListId && hasStemListId.stem_list_id) {
      this.generateStemId();
    } else {
      return stemListId;
    }
  }

  async insertParentQuestion(stemParentQuesList) {
    const {
      iD,
      sID,
      pID,
      question,
      qCID
    } = stemParentQuesList[0];
    console.log(qCID);
    const {
      searchContent,
      thinking,
    } = question;
    const parentQuesInfo = {
      stem_id: sID,
      chapter_id: pID,
      question_id: iD,
      id: qCID,
      title_html: searchContent,
      thinking,
    };
    console.log(parentQuesInfo)
    await this.app.mysql.insert('stem_parent_questions', parentQuesInfo);
  }

  async insertChildQuestionItem(sonQuesInfo) {
    return await this.app.mysql.insert('stem_child_questions', sonQuesInfo);
  }

  async insertChildQuestion(stemSonQuesList) {
    const promiseArray = stemSonQuesList.map((item, index) => {
      const {
        iD,
        pID,
        sID,
        question,
        priority,
      } = item;
      const {
        jsonStr,
        titleHTML,
        parentID
      } = question;
      const sonQuesInfo = {
        stem_id: sID,
        chapter_id: pID,
        question_id: iD,
        priority,
        title_html: titleHTML,
        parent_id: parentID,
        option_str: jsonStr,
        order_num: index,
      };
      return new Promise(resolve => {
        resolve(this.insertChildQuestionItem(sonQuesInfo));
      });
    });
    Promise.all(promiseArray).then(res => {
      console.log(res);
    });
  }

  async insertStemItem(chapterId, stemListId, stemItem) {
    const {
      sID,
      stemName,
      stemDesc,
      priority,
      stemParentQuesList,
      stemSonQuesList,
    } = stemItem;
    const stem_parent_ques_list = stemParentQuesList.map(item => {
      return item.iD;
    });
    const stem_child_ques_list = stemSonQuesList.map(item => {
      return item.iD;
    });
    const itemInfo = {
      stem_id: sID,
      stem_name: stemName,
      stem_desc: stemDesc,
      stem_parent_ques_list: JSON.stringify(stem_parent_ques_list),
      stem_child_ques_list: JSON.stringify(stem_child_ques_list),
      priority,
      chapter_id: chapterId,
      stem_list_id: stemListId,
    };
    await this.app.mysql.insert('stem', itemInfo);
    await this.insertParentQuestion(stemParentQuesList);
    await this.insertChildQuestion(stemSonQuesList);
    return;
  }

  async insertStemList(chapterId, stemListId, stemList) {
    const stemListInfo = {
      stem_list_id: stemListId,
      chapter_id: chapterId,
    };
    if (stemList && !!stemList.length) {
      stemList.forEach((item, index) => {
        const {
          sID,
        } = item;
        stemListInfo[`priority${index + 1}`] = sID;
      });
    }
    await this.app.mysql.insert('stem_list', stemListInfo);
    const promiseArray = stemList.map(item => {
      return new Promise(resolve => {
        resolve(this.insertStemItem(chapterId, stemListId, item));
      });
    });
    Promise.all(promiseArray).then(res => {
      console.log(res);
    });
  }

  async insertChapters(data) {
    const {
      onlineName,
      pID,
      addDateTimeStr,
      questCount,
      examClass,
      examClassStr,
      passScore,
      examYear,
      answerTime,
      stemList,
    } = data;
    const stemListId = await this.generateStemId();
    const chapterItemInfo = {
      chapter_id: pID,
      chapter_name: onlineName,
      add_time_str: addDateTimeStr,
      question_count: questCount,
      type: examClass,
      type_str: examClassStr,
      answer_time: answerTime,
      exam_year: examYear,
      pass_score: passScore,
      stem_list_id: stemListId,
    };
    // 先存储chapters
    const hasChapter = await this.app.mysql.get('chapters', {
      chapter_id: pID,
    });

    if (hasChapter && hasChapter.chapter_id) {
      return;
    }

    await this.app.mysql.insert('chapters', chapterItemInfo);
    await this.insertStemList(pID, stemListId, stemList);
    return 0;
  }

  async getChapters(url, requestObj) {
    const result = await this.ctx.curl(url, requestObj);
    return this.insertChapters(result.data);
  }
}

module.exports = SpiderService;