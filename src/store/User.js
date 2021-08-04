import { observable, action, runInAction } from 'mobx'
import BaseActions from 'component/BaseActions'
import axios from 'axios'
import { message } from 'antd'
import * as urls from '@constant/urls'
import jwt from 'util/token.js'

class User extends BaseActions {
  @observable
  currUser = undefined

  @action
  async login(params) {
    const r = await this.post(urls.API_USER_LOGIN, params)
    if (r.code=== 200) {
      jwt.saveToken(r.token)
      this.currUser = r.data
    }
    return r
  }

  @action
  logout() {
    jwt.removeToken()
    this.currUser = null
  }

  @action
  async getProjList(params) {
    const r = await axios.post(urls.API_PROJ_LIST,params)
    if (r && r.status === 200) {
      return r.data
    } else {
      message.error('网络错误', 0.7)
    }
  }

  @action
  async getMark(params) {
    const r = await axios.post(urls.API_MARK,params)
    if (r && r.status === 200) {
      return r.data
    } else {
      message.error('网络错误', 0.7)
    }
  }

  @action
  async markProj(params) {
    const r = await axios.post(urls.API_MARK_PROJ,params)
    if (r && r.status === 200) {
      console.log(r.data)
      this.currUser = r.data.data.user[0]
      return r.data
    } else {
      message.error('网络错误', 0.7)
    }
  }

  @action
  async getUserGroup(params) {
    return await this.post(urls.API_USER_GROUP, params)
  }

  @action
  async saveUserGroup(params) {
    return await this.post(urls.API_USER_GROUP_SAVE, params)
  }

  @action
  async delUserGroup(params) {
    return await this.post(urls.API_USER_GROUP_DEL, params)
  }

  @action
  async getUserGrade(params) {
    return await this.post(urls.API_USER_GRADE, params)
  }


  @action
  async getUserMark(params) {
    return await this.post(urls.API_USER_MARK, params)
  }

  @action
  async getJudgeProject(params) {
    return await this.post(urls.API_USER_JUDGE_PROJ, params)
  }

  @action
  async getJudgeData(params) {
    return await this.post(urls.API_USER_JUDGE_DATA, params)
  }


  @action
  async getJudgeMark(params) {
    let r = await this.post(urls.API_USER_JUDGE_MARK, params)
    if (r.code == 200) {
      this.currUser = r.user
    }
    return r
  }

  @action
  async getJudgeResult(params) {
    return await this.post(urls.API_USER_JUDGE_RET, params)
  }



  @action
  async userSave(params) {
    let r = await this.post(urls.API_USER_SAVE, params)
    console.log(r)

    if (r.code == 200) {
      this.currUser.photo = r.data.photo
      this.currUser.pwd = r.data.pwd
      this.currUser.test = r.data.test
      this.currUser.level = r.data.level
    }

    return r
  }




  @action
  async getUserStatisV(params) {
    return await this.post(urls.API_USER_STATIS_V, params)
  }

  @action
  async getUserStatisG(params) {
    return await this.post(urls.API_USER_STATIS_G, params)
  }

  @action
  async getUserStatisQ(params) {
    return await this.post(urls.API_USER_STATIS_Q, params)
  }

  @action
  async getUserStatisC(params) {
    return await this.post(urls.API_USER_STATIS_C, params)
  }



}

export default new User()