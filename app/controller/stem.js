/* eslint-disable eol-last */
'use strict';

const Controller = require('egg').Controller;
const url = require('url');

const {
  STEM_PARAMS_ERROR_MSG,
  STEM_SEARCH_SUCCESS_MSG,
  STEM_SEARCH_ERROR_MSG,
  STEM_PARAMS_ERROR_PROMPT,
  STEM_SEARCH_SUCCESS_PROMPT,
  STEM_SEARCH_ERROR_PROMPT,
} = require('../constants/index');

class StemController extends Controller {
  async index() {
    const {
      ctx,
    } = this;
    const params = url.parse(ctx.request.url, true).query;
    if (!params) {
      ctx.body = {
        status: 200,
        data: null,
        msg: STEM_PARAMS_ERROR_MSG,
        prompt: STEM_PARAMS_ERROR_PROMPT,
      };
      return;
    }
    const serviceInfo = await ctx.service.stem.find(params.type);
    if (serviceInfo && serviceInfo.length) {
      ctx.body = {
        status: 200,
        data: serviceInfo,
        msg: STEM_SEARCH_SUCCESS_MSG,
        prompt: STEM_SEARCH_SUCCESS_PROMPT,
      };
      return;
    }
    ctx.body = {
      status: 200,
      data: serviceInfo[0] || null,
      msg: STEM_SEARCH_ERROR_MSG,
      prompt: STEM_SEARCH_ERROR_PROMPT,
    };
  }

  async detail() {
    const {
      ctx,
    } = this;
    const params = url.parse(ctx.request.url, true).query;

    if (!params) {
      ctx.body = {
        status: 200,
        data: null,
        msg: STEM_PARAMS_ERROR_MSG,
        prompt: STEM_PARAMS_ERROR_PROMPT,
      };
      return;
    }
    const serviceInfo = await ctx.service.stem.detail(params);
    if (serviceInfo) {
      ctx.body = {
        status: 200,
        data: serviceInfo,
        msg: STEM_SEARCH_SUCCESS_MSG,
        prompt: STEM_SEARCH_SUCCESS_PROMPT,
      };
      return;
    }
    ctx.body = {
      status: 200,
      data: serviceInfo[0] || null,
      msg: STEM_SEARCH_ERROR_MSG,
      prompt: STEM_SEARCH_ERROR_PROMPT,
    };
  }
}

module.exports = StemController;