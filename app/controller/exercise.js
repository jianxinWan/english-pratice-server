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

class ExerciseController extends Controller {
  async getList() {
    const {
      ctx,
    } = this;
    const params = url.parse(ctx.request.url, true).query;
    const {type} = params
    if (!type) {
      ctx.body = {
        status: 200,
        data: null,
        msg: STEM_PARAMS_ERROR_MSG,
        prompt: STEM_PARAMS_ERROR_PROMPT,
      };
      return;
    }
    const chapterList = await ctx.service.exercise.queryList(type);
    if (chapterList && chapterList.length) {
      ctx.body = {
        status: 200,
        data: chapterList,
        msg: STEM_SEARCH_SUCCESS_MSG,
        prompt: STEM_SEARCH_SUCCESS_PROMPT,
      };
      return;
    }
    ctx.body = {
      status: 200,
      data: chapterList[0] || null,
      msg: STEM_SEARCH_ERROR_MSG,
      prompt: STEM_SEARCH_ERROR_PROMPT,
    };
  }

  async getDetail() {
    const {
      ctx,
    } = this;
    const params = url.parse(ctx.request.url, true).query;
    const {stem_list_id} = params
    if (!stem_list_id) {
      ctx.body = {
        status: 200,
        data: null,
        msg: STEM_PARAMS_ERROR_MSG,
        prompt: STEM_PARAMS_ERROR_PROMPT,
      };
      return;
    }
    const serviceInfo = await ctx.service.exercise.queryDetail(stem_list_id);
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

  async submit() {
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

module.exports = ExerciseController;