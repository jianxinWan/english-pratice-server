/* eslint-disable eol-last */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

const baseUrl = '/english-practice/api';
module.exports = app => {
  const {
    router,
    controller,
  } = app;
  router.get('/', controller.home.index);
  router.get(`${baseUrl}/user-info/`, controller.userInfo.index);
  router.get(`${baseUrl}/spider/`, controller.spider.index);
  router.get(`${baseUrl}/spider/translation/`, controller.translation.getTranslationList);
  router.get(`${baseUrl}/spider/translation/detail/`, controller.translation.getTranslationDetail);
  router.get(`${baseUrl}/spider/answer/`, controller.spider.getAnswer);
  router.get(`${baseUrl}/get-stem/`, controller.stem.index);
  router.get(`${baseUrl}/get-stem/detail/`, controller.stem.detail);
  router.post(`${baseUrl}/answer/submit/`, controller.submit.submitItem);
  router.get(`${baseUrl}/exercise/list/`, controller.exercise.getList);
  router.get(`${baseUrl}/exercise/detail/`, controller.exercise.getDetail);
  router.get(`${baseUrl}/exercise/submit/`, controller.exercise.submit);
};