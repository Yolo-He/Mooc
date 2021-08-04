import { observable, action, runInAction } from 'mobx'
import BaseActions from 'component/BaseActions'
import axios from 'axios'
import { message } from 'antd'
import * as urls from '@constant/urls'

class Sys extends BaseActions {

  moocList = []

  @action
  async importUserDef(params) {
    return await this.post(urls.API_SYS_STUDDEF_IMPORT, params)
  }

  @action
  async listUserDef(params) {
    return await this.post(urls.API_SYS_STUDDEF_LIST)
  }

  @action
  async listMooc(params) {
    return await this.post(urls.API_MOOC)
  }

  @action
  async listMoocDef(params) {
    return await this.get(urls.API_MOOC_DEF)
  }

  @action
  async loadMoocTest(params) {
    return await this.post(urls.API_MOOC_TEST, params)
  }

  @action
  async loadTestMark(params) {
    return await this.post(urls.API_MARK_LOAD, params)
  }

  @action
  async saveTestMark(params) {
    return await this.post(urls.API_MARK_SAVE, params)
  }

  @action
  async loadTestGroup(params) {
    return await this.post(urls.API_MARK_GROUP_LOAD, params)
  }

  @action
  async saveTestGroup(params) {
    return await this.post(urls.API_MARK_GROUP_SAVE, params)
  }

  @action
  async loadCardDate(params) {
    return await this.post(urls.API_SYS_CARD_DATE, params)
  }

  @action
  async loadCardData(params) {
    return await this.post(urls.API_SYS_CARD_DATA, params)
  }

  @action
  async loadUserQues(params) {
    return await this.post(urls.API_SYS_USER_QUESS, params)
  }

  @action
  async loadTerm(params) {
    return await this.post(urls.API_SYS_TERM_LOAD, params)
  }

  @action
  async saveTerm(params) {
    return await this.post(urls.API_SYS_TERM_SAVE, params)
  }

  @action
  async loadUserQuesDef(params) {
    return await this.post(urls.API_SYS_QUESS_DEF, params)
  }

  @action
  async loadSysStatis(params) {
    return await this.post(urls.API_SYS_S_STATIS_LOAD, params)
  }

  @action
  async loadUsrStatis(params) {
    return await this.post(urls.API_SYS_U_STATIS_LOAD, params)
  }

  @action
  async getUserList(params) {
    return await this.post(urls.API_SYS_USER_LIST)
  }

  




  


  

  


}

export default new Sys()
