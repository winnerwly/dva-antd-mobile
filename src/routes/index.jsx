import React from 'react';
import PropTypes from 'prop-types';
import {
  TabBar
} from 'antd-mobile';
import {
  connect
} from 'dva';
import {
  routerRedux
} from 'dva/router';

import { Picker, List, WhiteSpace, InputItem, Button, Flex, Modal, Toast, WingBlank, NoticeBar, ActivityIndicator, Icon } from 'antd-mobile';
import { createForm } from 'rc-form';
import arrayTreeFilter from 'array-tree-filter';

import { district, provinceLite as province } from 'antd-mobile-demo-data';
import * as usersService from '../services/example';


//import Main from '../components/form';


const seasons = [

  {
    label: '中国建设银行',
    value: '1',
  },
  {
    label: '中国人民银行',
    value: '2',
  },

];

const alert = Modal.alert;



function Register({form, dispatch, example, loading}) {
    const { getFieldProps,getFieldError,validateFields } = form;
    console.log(example, loading, 56789);
    let submit = () => {

      validateFields((error, value) => {
        if (error) return

        dispatch({
            type: 'example/fetch',
            payload: {
              isLogin: true
            }
        });

        Toast.success('提交成功 !!!', 1);
        console.log(error, value);
      });
    }


    let showAlert = () => {
      validateFields((error, value) => {
        if (error) {
          Toast.offline('请检查输入是否合法 !!!', 1)
          return
        }
        const alertInstance = alert('提交', '确定要提交吗???', [
          {
            text: '取消',
            onPress: () => {

            },
            style: 'default' },
          {
            text: '确定',
            onPress: () => {
              submit()
            }
          },
        ]);
      });
    };

    let errors;

    return (
          <div>
            <WhiteSpace size="lg" />
                <List style={{ backgroundColor: 'white' }} className="picker-list">
                  <Picker
                    extra= "请选择受理网点"
                    error= { getFieldError('wangdian') }
                    data= { seasons }
                    cols= { 1 }
                    {...getFieldProps('wangdian', {
                      rules: [
                        {
                          required: true,
                          message: '受理网点不可为空',
                        },
                      ],
                    })}
                    className="forss"

                  >
                    <List.Item arrow="horizontal">银行网点：</List.Item>
                  </Picker>
                </List>
                {
                  ( errors = getFieldError('wangdian') ) ?
                  <NoticeBar icon={<Icon type={ errors ? "cross-circle" : "check-circle-o" } size="xxs" />} marqueeProps={{ loop: true, style: { padding: '0 0.15rem' } }}>
                    { errors && errors.join(',') }
                  </NoticeBar>:
                  null
                }
                <WhiteSpace size="xl" />
                <List>
                  <InputItem
                    error={ getFieldError('name') }
                    clear
                    labelNumber="7"
                    {...getFieldProps('name', {
                      rules: [
                        {
                          required: true,
                          message: '业务员姓名不能为空',
                        },
                        {
                          type: 'string',
                          min: 4,
                          max: 8,
                          message: '业务员姓名长度为 4 - 8 个字符（ 一个汉字占 2 个字符 ）！',
                        },
                      ],
                    })}
                    placeholder="请输入业务员姓名"
                  >业务员姓名：</InputItem>
                </List>
                {
                  (errors = getFieldError('name')) ?
                  <NoticeBar icon={<Icon type={ errors?"cross-circle":"check-circle-o" } size="xxs" />} marqueeProps={{ loop: true, style: { padding: '0 0.15rem' } }}>
                    {errors ? errors.join(',') : "请输入业务员姓名"}
                  </NoticeBar>:
                  null
                }
                <WhiteSpace size="xl" />
                <List>
                  <InputItem
                    clear
                    labelNumber="3"
                    error={ getFieldError('gonghao') }
                    {...getFieldProps('gonghao', {
                      rules: [
                        {
                          required: true,
                          message: '工号不能为空！',
                        },
                        {
                          type: 'string',
                          min: 5,
                          max: 30,
                          message: '工号长度为 5 - 30 位！',
                        },
                      ],
                    })}
                    type="text"
                    placeholder="请输入工号"
                  >工号：</InputItem>
                </List>
                {

                  (errors = getFieldError('gonghao')) ?
                  <NoticeBar icon={<Icon type={ errors?"cross-circle":"check-circle-o" } size="xxs" />} marqueeProps={{ loop: true, style: { padding: '0 0.15rem' } }}>
                    {errors && errors.join(',')}
                  </NoticeBar>:
                  null
                }
                <WhiteSpace size="xl" />
                <WhiteSpace size="xl" />
                <WhiteSpace size="xl" />
                <WhiteSpace size="xl" />
                <WingBlank>
                  <Button loading={ loading } onClick={showAlert}> 提交 </Button>
                </WingBlank>
                <ActivityIndicator
                  toast
                  text="提交中..."
                  animating={ loading ? true : false }
                />
          </div>
    );
}

let Main= createForm()(Register);

function mapStateToProps(state) {
  return {
    example: state.example,
    loading: state.loading.models.example,
  };
}


export default connect(mapStateToProps)(Main);
