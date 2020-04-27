/* eslint-disable eol-last */
'use strict';

const Controller = require('egg').Controller;
class SubmitController extends Controller {
  async submitItem() {
    const {
      ctx,
    } = this;
    const {
      request,
    } = ctx;
    const params = request.body;
    const {
      stem_id,
      chapter_id,
      question_id,
      answer_array,
      uid,
    } = params;
    console.log(params)
    if (!stem_id || !chapter_id || !question_id || !uid || !answer_array) {
      ctx.body = {
        status: 200,
        data: null,
        msg: 'error',
        prompt: '参数信息错误！',
      };
    } else {
      const serviceInfo = await ctx.service.submit.submitItem(params);
      console.log(serviceInfo);
      ctx.body = {
        status: 200,
        data: null,
        msg: 'success',
        prompt: '提交成功！',
      };
    }
  }
}

module.exports = SubmitController;