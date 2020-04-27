/* eslint-disable eol-last */
'use strict';

const Controller = require('egg').Controller;
const URL = require('url');
class TranslationController extends Controller {
    async getTranslationList() {
        const {
            ctx,
        } = this;
        const url = 'http://www.k51.com.cn/Service/ExamRoom/ExamHandler.ashx';
        const params = {
            key: 'GetShowTypeName',
            CID: 83650,
        };
        const requestObj = {
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            dataType: 'json',
            data: params,
        };
        const {
            data,
            status
        } = await ctx.curl(url, requestObj);
        const {
            showType,
            chapterID,
            chapterName,
            classID,
            questioncount
        } = data
        ctx.body = {
            data: {
                chapterID,
                chapterName,
                classID,
                questioncount,
                list: [{
                    add_time_str: new Date(),
                    ...showType[0]
                }]
            },
            status
        }
    }

    async getTranslationDetail() {
        const {
            ctx,
        } = this;
        const reqParams = URL.parse(ctx.request.url, true).query;
        const url = 'http://www.k51.com.cn/Service/ExamRoom/ExamHandler.ashx';
        const params = {
            key: 'GetShowTypeName',
            CID: 83650,
        };
        const requestObj = {
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            dataType: 'json',
            data: params,
        };
        const {
            data,
            status
        } = await ctx.curl(url, requestObj);
        const {
            showType,
            chapterID,
            chapterName,
            classID,
            questioncount
        } = data
        const userStemDetail = await this.app.mysql.query(`SELECT * FROM user_answer_record WHERE stem_id=${reqParams.show_type_id} AND uid=${reqParams.uid}`);
        ctx.body = {
            data: {
                user_answer_info: userStemDetail[0] || null,
                chapterID,
                chapterName,
                classID,
                questioncount,
                add_time_str: new Date(),
                ...showType[0]
            },
            status
        }
    }
}

module.exports = TranslationController;