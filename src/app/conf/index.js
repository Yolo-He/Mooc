import React from 'react'
import { inject } from 'mobx-react'
import { MENU_SYS } from 'constant/data'
import { API_SERVER } from 'constant/apis'
import imgToBase64 from 'util/imgToBase64'
import { b64_person } from 'constant/data'
import initMenu from 'util/initMenu'

import icon_score from 'icon/icon_score.svg'
import icon_stic from 'icon/icon_stic.svg'
import icon_work from 'icon/icon_work.svg'
import icon_group from 'icon/icon_group.svg'
import icon_sys from 'icon/icon_sys.svg'
import icon_person from 'icon/icon_person2.svg'
import icon_logout from 'icon/icon_logout.svg'
import icon_mark from 'icon/icon_star.svg'
import icon_vote from 'icon/icon_vote.svg'

import Homework from 'app/conf/homework'



import './index.less'

@inject('userStore')
class Conf extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      name: null,
      cls: null,
      photo: '',
      mooclist: '',
      menu: 6,
    }
  }

  async componentDidMount() {
    initMenu()

    let cur = this.props.userStore.currUser
    if ((typeof (cur) === 'undefined') || (cur === null)) {
      this.props.history.push("/login")
    } else {
      // let photo = await imgToBase64(`${API_SERVER}/${cur.photo}`)
      this.setState({
        name: cur.name,
        cls: cur.cls,
        photo: cur.photo,
        mooc: cur.mooc,
        code: cur.usr,
        mooclist: cur.mooclist,
      })

    }
  }

  doMenu = (id) => {
    //移动端菜单
    if (document.querySelector('html').clientWidth < 1000) {
      switch (id) {
        case 0: this.props.history.push('homework'); break;
        case 1: this.props.history.push('homework'); break;
        case 2: this.props.history.push('homework'); break;
        case 3: this.props.history.push('homework'); break;
        case 4: this.props.history.push('homework'); break;
        case 5: this.props.history.push('homework'); break;
        case 6: this.props.history.push('homework'); break;
        case 9: this.props.userStore.logout();
          this.props.history.push('/');
          break;
      }
    } else { //PC端菜单
      if (id !== this.state.menu) {

        if (id == 9) {
          this.props.userStore.logout()
          this.props.history.push('/')
        } else {
          this.setState({ menu: id })
        }

      }
    }
  }


  render() {
    let { name, cls, photo, code, mooclist, menu } = this.state
    let cur = this.props.userStore.currUser

    let role = (cur !== undefined) ? cur.role : 0
    console.log('cur...' + role)

    return (
      <div className="g-conf">
        <div className="m-conf">
          <div className="m-main">
            <div className="m-face">
              <img src={`${API_SERVER}/${photo}`} />
            </div>
            <div className="m-info">
              <div className="m-name">{name} </div>
              <div className="m-row"> <label>学号:</label> <span>{code}</span></div>
              <div className="m-row"> <label>班级:</label> <span>{cls}</span></div>
              <div className="m-row">
                <label>选课:</label>
                <div className="m-mooc">
                  {mooclist.split('|').map((item, i) => {
                    (role == 1) && (i == 5) &&
                      <span key={i}>{item}</span>
                  }
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="m-menu">
            <div className="m-menu-item" onClick={this.doMenu.bind(this, 0)}>
              <img src={icon_score} />
              <span> 积分</span>
            </div>

            <div className="m-menu-item" onClick={this.doMenu.bind(this, 1)}>
              <img src={icon_stic} />
              <span> 统计</span>
            </div>
            <div className="m-menu-item" onClick={this.doMenu.bind(this, 2)}>
              <img src={icon_group} />
              <span> 分组</span>
            </div>
            <div className="m-menu-item" onClick={this.doMenu.bind(this, 3)}>
              <img src={icon_mark} />
              <span> 成绩</span>
            </div>
            <div className="m-menu-item" onClick={this.doMenu.bind(this, 4)}>
              <img src={icon_work} />
              <span> 作业</span>
            </div>
            <div className="m-menu-item" onClick={this.doMenu.bind(this, 4)}>
              <img src={icon_sys} />
              <span> 设置</span>
            </div>

            {(role == 1) &&
              <div className="m-menu-item" onClick={this.doMenu.bind(this, 5)}>
                <img src={icon_vote} />
                <span> 评委</span>
              </div>}
          </div>

          <div className="m-menu">
            <div className="m-menu-item" onClick={this.doMenu.bind(this, 9)}>
              <img src={icon_logout} />
              <span> 退出登录</span>
            </div>
          </div>
        </div>

        <div className="m-wrap">
          {/* {(this.state.menu === 6) && <Homework />} */}
          {(this.state.menu === 4) && <Homework />}
          {(this.state.menu === 3) && <Homework />}
          {(this.state.menu === 2) && <Homework />}
          {(this.state.menu === 1) && <Homework />}
          {(this.state.menu === 0) && <Homework />}

        </div>
      </div>
    )
  }
}

export default Conf
