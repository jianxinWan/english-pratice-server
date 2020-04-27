/* eslint-disable eol-last */
'use strict';

const Controller = require('egg').Controller;

class SpiderController extends Controller {
  async index() {
    const {
      ctx,
    } = this;
    const url = 'http://www.k51.com.cn/Service/ExamRoom/ExamHandler.ashx';
    const params = {
      key: 'GetPaper',
      PID: 1405,
      UID: 190190
    };
    const requestObj = {
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      dataType: 'json',
      data: params,
    };
    const result = await ctx.curl(url, requestObj);
    const ServiceInfo = await ctx.service.spider.getChapters(url, requestObj);
    console.log(ServiceInfo);
    ctx.body = result.data;
  }

  async getAnswer() {
    const {
      ctx,
    } = this;
    const url = 'http://m.k51.com.cn/Exam/Service/Exam_AnswerSheetHandler.ashx';
    const params = {
      key: 'selectallAnswerSheet',
      CID: 83644,
      UID: 190190,
      RID: 19862,
      PARENTID: 19861,
    };
    const requestObj = {
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      dataType: 'json',
      data: params,
    };
    const result = await ctx.curl(url, requestObj);
    console.log(result);
    ctx.body = result.data;
  }
}

module.exports = SpiderController;