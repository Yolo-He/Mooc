import React from 'react'
import { withRouter } from "react-router-dom";
import { Icon, Tag, Result, Spin,Input,Button,AutoComplete,message } from 'antd'
import { inject} from 'mobx-react'
import icon_return from 'icon/icon_return.svg'
import icon_del_r    from 'icon/icon_del_r.svg'
import icon_plus   from 'icon/icon_plus.svg'
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
      curMooc:   0,
      siteCount: 0,
      grade: [],
      card:  [],
      site:  [],
      ques:  [],
      disp:  [true,false,false,false],
    }
  }

  async componentDidMount() {
    let cur = this.props.userStore.currUser
    if ((typeof(cur) === 'undefined')||(cur === null)) {
      this.props.history.push("/login")
    }else{
      // let mid   = parseInt(cur.mooc.split('|')[0])
    }
  }

  doReturn=()=>{
    this.props.history.push('/conf')
  }

  render() {
    let {namelist, curMooc, grade, avg, card, site, ques, disp,siteCount } = this.state

    return (
      <Spin spinning={this.state.loading}>
        <div className="g-grade">
          <div className="m-grade">
            <div className="m-hd">
              <div className="m-title">
                <img src={icon_return} onClick={this.doReturn}/>
                <span>课程作业</span>
              </div>
              
            </div>

          </div>
        </div>
      </Spin>
    )
  }
}

export default withRouter(Grade)
