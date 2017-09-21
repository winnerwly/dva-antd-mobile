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

import { Picker, List, WhiteSpace, InputItem, Button, Flex, Modal, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import arrayTreeFilter from 'array-tree-filter';

import { district, provinceLite as province } from 'antd-mobile-demo-data';
import * as usersService from '../../services/example';


import styles from './index.less';

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




class Test extends React.Component {
  state = {

  };

  showAlert = () => {
    let that = this;
    this.props.form.validateFields((error, value) => {
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
            that.submit()
          }
        },
      ]);
    });



    // setTimeout(() => {
    //   // 可以调用close方法以在外部close
    //   console.log('auto close');
    //   alertInstance.close();
    // }, 2000);
  };


  submit = () => {

    this.props.form.validateFields((error, value) => {
      if (error) return
      Toast.success('提交成功 !!!', 1);
      console.log(error, value);
    });
  }



  render() {

    const { getFieldProps,getFieldValue } = this.props.form;

    console.log(this.props,456789);

    return (<div className={ styles.box }>
      <WhiteSpace size="lg" />
          <List style={{ backgroundColor: 'white' }} className="picker-list">
            <Picker data={seasons} cols={1} {...getFieldProps('wangdian', {
              rules: [
                {
                  required: true,
                  message: '输入有误请重新输入',
                },
              ],
            })} className="forss">
              <List.Item arrow="horizontal">银行网点：</List.Item>
            </Picker>
          </List>
          <WhiteSpace size="xl" />
          <List>
            <InputItem
              labelNumber="7"
              {...getFieldProps('phone', {
                rules: [
                  {
                    required: true,
                    message: '输入有误请重新输入',
                  },
                  {
                    type: 'string',
                    min: 4,
                    max: 8,
                    message: '输入有误请重新输入',
                  },
                ],
              })}
              placeholder="请输入业务员姓名"
            >业务员姓名：</InputItem>
          </List>
          <WhiteSpace size="xl" />
          <List>
            <InputItem
              labelNumber="3"
              {...getFieldProps('gonghao', {
                rules: [
                  {
                    required: true,
                    message: '输入有误请重新输入',
                  },
                  {
                    type: 'string',
                    min: 5,
                    max: 30,
                    message: '输入有误请重新输入',
                  },
                ],
              })}
              type="text"
              placeholder="请输入工号"
            >工号：</InputItem>
          </List>
          <WhiteSpace size="xl" />
          <WhiteSpace size="xl" />
          <WhiteSpace size="xl" />
          <WhiteSpace size="xl" />
          <Button onClick={this.showAlert}> 提交 </Button>
    </div>);
  }
}


Test.contextTypes = {
  router: PropTypes.object.isRequired
};


let Main = createForm()(Test);

Main.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(data) {
  console.log(data);
  return {};
}

export default connect(mapStateToProps)( Main );
