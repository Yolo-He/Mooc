/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React from 'react'
import { withRouter } from 'react-router-dom'
import { Spin, Table, Modal } from 'antd'
import { inject } from 'mobx-react'
import icon_return from 'icon/icon_return.svg'
import icon_del_r from 'icon/icon_del_r.svg'
import icon_plus from 'icon/icon_plus.svg'
import './index.less'
import EXIF from '@util/small-exif'
import fileToBlobScaled from 'util/fileToBlobScaled'
import { API_SERVER } from 'constant/apis'

@inject('userStore', 'mainStore')
class Judge extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			loading: false,
			// 课程
			cour: ['web', 'mobile'],
			// 展示行
			columns: [
				{
					title: '学号',
					dataIndex: 'usr',
					key: 'usr',
				},
				{
					title: '姓名',
					dataIndex: 'name',
					key: 'name',
				},
			],
			// 学生展示列表
			stu: [
				{
					name: '彭祯伟',
					usr: '2019211909156',
				},
				{
					name: '伟祯彭',
					usr: '1111111',
				},
			],
            // 显示所有班级学生还是实验
            classOrExperiment: true,
			// 是否弹窗展示某个学生详情
			showStuDetail: false,
			// 弹窗显示学生信息
			nameDetail: '',
			classDetail: 'web',
			usrDetail: '',
			experimentList: ['实验一', '实验一', '实验一'],
			experimentGradeList: ['80', '70', '60'],
		}
	}

	// async componentDidMount() {
	// 	let cur = this.props.userStore.currUser
	// 	if (typeof cur === 'undefined' || cur === null) {
	// 		this.props.history.push('/login')
	// 	} else {
	// 		// let mid   = parseInt(cur.mooc.split('|')[0])
	// 	}
	// }

	componentDidCatch(error, errorInfo) {
		console.log('==============', error, errorInfo)
	}

	render() {
		let {
			cour,
			work,
			stu,
			columns,
			showStuDetail,
			nameDetail,
			classDetail,
			usrDetail,
			experimentList,
			experimentGradeList,
            classOrExperiment
		} = this.state

		return (
			<Spin spinning={this.state.loading}>
				<div className="g-judge">
					<div className="m-hd">
						{cour.map((item, index) => {
							return (
								<span className="u-course" key={index}>
									{item}
								</span>
							)
						})}
						<div className="m-type">
							<div>Class</div>
							<div>Experiment</div>
						</div>
					</div>
					<div className="m-body">
						<div className="m-allStu">
							<Table
								onRow={(record) => {
									return {
										onClick: (event) => {
											this.setState({
												showStuDetail: true,
												nameDetail: record.name,
												usrDetail: record.usr,
											})
											console.log(record)
										}, // 点击行
									}
								}}
								columns={columns}
								dataSource={stu}
								pagination={false}
								scroll={{ y: 600 }}
								rowKey="usr"
							/>
						</div>
					</div>
					<Modal
						visible={showStuDetail}
						footer={null}
						onCancel={() => this.setState({ showStuDetail: false })}
                        style={{top:'20vh'}}
                        scroll={{y:500}}
					>
						<div className="m-modal">
							<div className="m-head" >
								<div>{classDetail}</div>
								<div>{nameDetail}</div>
								<div>{usrDetail}</div>
							</div>
							<div className="m-content">
								{experimentList.map((item, index) => {
									return (
										<div className="m-item" key={index} >
											<div>{experimentList[index]}</div>
											<div>
												{experimentGradeList[index]}
											</div>
										</div>
									)
								})}
							</div>
						</div>
					</Modal>
				</div>
			</Spin>
		)
	}
}

export default withRouter(Judge)
