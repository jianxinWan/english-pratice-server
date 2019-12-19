'use strict';

const Controller = require('egg').Controller;

class SpiderController extends Controller {
  async index() {
    const {
      ctx,
    } = this;
    const url = 'http://www.k51.com.cn/Service/ExamRoom/ExamHandler.ashx';
    const params = {
      // key: 'GetShowTypeName',
      // CID: 83656,
      key: 'GetPaper',
      PID: 1410,
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
}

module.exports = SpiderController;
