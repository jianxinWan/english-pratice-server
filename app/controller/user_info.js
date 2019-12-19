'use strict';

const Controller = require('egg').Controller;
const url = require('url');

const {
  USER_PARAMS_ERROR_MSG,
  USER_SEARCH_SUCCESS_MSG,
  USER_SEARCH_ERROR_MSG,
  USER_PARAMS_ERROR_PROMPT,
  USER_SEARCH_SUCCESS_PROMPT,
  USER_SEARCH_ERROR_PROMPT,
} = require('../constants/index');

class UserController extends Controller {
  async index() {
    const {
      ctx,
    } = this;
    const params = url.parse(ctx.request.url, true).query;
    if (!params.uid) {
      ctx.body = {
        status: 200,
        data: null,
        msg: USER_PARAMS_ERROR_MSG,
        prompt: USER_PARAMS_ERROR_PROMPT,
      };
      return;
    }
    const serviceInfo = await ctx.service.userInfo.find(params.uid);
    if (serviceInfo && serviceInfo.length) {
      ctx.body = {
        status: 200,
        data: serviceInfo[0],
        msg: USER_SEARCH_SUCCESS_MSG,
        prompt: USER_SEARCH_SUCCESS_PROMPT,
      };
      return;
    }
    ctx.body = {
      status: 200,
      data: serviceInfo[0] || null,
      msg: USER_SEARCH_ERROR_MSG,
      prompt: USER_SEARCH_ERROR_PROMPT,
    };
  }
}

module.exports = UserController;
