import React from 'react'
import { withRouter } from "react-router-dom";
import { Icon, Tag, Result, Spin, Input, Button, AutoComplete, message } from 'antd'
import { inject } from 'mobx-react'
import icon_return from 'icon/icon_return.svg'
import icon_del_r from 'icon/icon_del_r.svg'
import icon_plus from 'icon/icon_plus.svg'
import './index.less'
import EXIF from '@util/small-exif'
import fileToBlobScaled from 'util/fileToBlobScaled'
import { API_SERVER } from 'constant/apis'


@inject('userStore', 'mainStore')
class Grade extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      namelist: '',
      curMooc: 0,
      siteCount: 0,
      grade: [],
      card: [],
      site: [],
      ques: [],
      disp: [true, false, false, false],

      cour: [''],//课程
      work: [],//作业
      active: 0
    }
  }

  async componentDidMount() {
    // let cur = this.props.userStore.currUser
    let cur = this.props.userStore.currUser.namelist.split('|')
    let r = await this.props.userStore.getUserMark({ name: cur[1] })
    if ((typeof (cur) === 'undefined') || (cur === null)) {
      this.props.history.push("/login")
    } else {
      // let mid   = parseInt(cur.mooc.split('|')[0])
      this.setState({ cour: cur, work: r.g.test.list })
    }
  }

  // doReturn = () => {
  //   this.props.history.push('/conf')
  // }
  addActive = (e) => {
    this.setState({ active: e })
  }

  render() {
    let { namelist, curMooc, grade, avg, card, site, ques, disp, siteCount,
      cour, work, active } = this.state

    return (
      <Spin spinning={this.state.loading}>
        <div className="g-grade">
          <div className="m-hd">
            {cour.map((item, index) => {
              return (
                // <span className={["u-course"]} key={index}
                // 	onClick={this.lighted(key)}>
                <span className={["u-course", active === index ? 'active' : ''].join(' ')} key={index} onClick={this.addActive.bind(this, index)} >
                  {item}
                </span>
              )
            })}
          </div>

          <div className="m-content">
            {work.map((item, index) => {
              return (
                <div className="m-work" key={index}>
                  <div className="u-title">{item.name}</div>
                  <div className="u-state">
                    {item.state === '1' ? (
                      <div style={{ color: 'lightgrey' }}>未开放</div>) :
                      item.state === '2' ?
                        (<div style={{ color: 'red' }}>未完成</div>) :
                        (<div style={{ color: 'lightgreen' }}> 已完成</div>)}
                  </div>
                  <div className="u-score">{item.mark}</div>
                  <div className="u-btn" onClick={() => this.props.history.push('conf/edit')}>编辑</div>
                </div>
              )
            })}
          </div>
        </div>
      </Spin >
    )
  }
}

export default withRouter(Grade)
