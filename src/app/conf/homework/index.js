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
import { color } from '_highcharts@8.2.2@highcharts';


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
          <div className="m-title">
            <img src={icon_return} onClick={this.doReturn} />
            <span>课程作业</span>
          </div>
          <div className="m-hd">
            {cour.map((item, index) => {
              return (
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
                  <div className="u-title">{(index + 1) + '.\u00A0\u00A0\u00A0' + (item.name)}</div>
                  <div className="u-state">
                    {item.mark >= 0 ? '已完成' : '未完成'}
                    {/* <div style={{ color: 'rgb(144, 209, 122)' }}> 已提交</div> :
                      <div style={{ color: 'lightgrey' }}>未完成</div>} */}
                    {console.log(item)}
                  </div>
                  <div className="u-score">{item.mark}</div>
                  <div className="u-btn"> {item.state != '3' ?
                    //  待修改s
                    (<div style={{ color: 'rgb(100,100,100)' }}> 查看</div>) :
                    (<div onClick={() => this.props.history.push('conf/edit')}>提交</div>)
                  }
                  </div>

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
