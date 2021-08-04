/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject } from 'mobx-react'
import { Spin, Button } from 'antd'
import { API_SERVER } from 'constant/apis'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn';
import './index.less'

@inject('userStore', 'mainStore')
class Edit extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			loading: false,
			title: '实验一、XXXXXXXXXXXXXXXXXX',
			// 模拟数据
			data: '<p>123</p><p>123</p>'
		}
	}

	async componentDidMount() {
		let cur = this.props.userStore.currUser
		if (typeof cur === 'undefined' || cur === null) {
			this.props.history.push('/login')
		} else {
			// let mid   = parseInt(cur.mooc.split('|')[0])
		}
	}

	render() {
		let { title, data } = this.state

		return (
			<Spin spinning={this.state.loading}>
				<div className="g-edit">
					<div className="m-hd">{title}</div>
					<div className="m-body">
						<div className="m-edit">
							<CKEditor
								editor={ClassicEditor}
								pageHeight='80vh'
								language='zh-cn'
								// data={data}
								onReady={(editor) => {
									// You can store the "editor" and use when it is needed.
									console.log(
										'Editor is ready to use!',
										editor
									)
								}}
								onChange={(event, editor) => {
									const data = editor.getData()
									console.log({ event, editor, data })
								}}
							// onBlur={(event, editor) => {
							// 	console.log('Blur.', editor)
							// }}
							// onFocus={(event, editor) => {
							// 	console.log('Focus.', editor)
							// }}
							/>
						</div>
						<div className="m-btn">
							<Button className={`u-btn`}>保存</Button>
							<Button className={`u-btn`}>提交</Button>
							<Button className={`u-btn`}>上传</Button>
							<Button className={`u-btn`}>预览</Button>
						</div>
					</div>
				</div>
			</Spin>
		)
	}
}

export default withRouter(Edit)
