import React, { Component } from 'react';
import Split from 'react-split';
import { Input, Tabs } from 'antd';
import { CreateDialog, Dialogs } from 'modules/dialogs';
import { CreateRoom, Rooms } from 'modules/rooms';
import { Messages, CreateMessage } from 'modules/messages';
import { DialogSearch } from 'components';
import './home.scss';

const { Search  } = Input;
const { TabPane } = Tabs;
class Home extends Component {
  state = {
    isRoomSelected: false
  }
  render() {
    return (
        <Split sizes={[20, 80]} minSize={250} className='home'>
          <div className='home__dialog--list'>
            <div className='header'>
                <CreateDialog />
                <CreateRoom />
                <DialogSearch isRoomSelected={this.state.isRoomSelected} />
            </div>
            <div className='content'>
              <Tabs defaultActiveKey='0' onChange={(key) => this.setState({ isRoomSelected: Boolean(+key) }) }>
                <TabPane tab='Cообщения' key='0'>
                  <Dialogs /> 
                </TabPane>
                <TabPane tab='Комнаты' key='1'>
                  <Rooms />
                </TabPane>
              </Tabs>
            </div>
          </div>
        <div className='home__dialog--content'>
          <div className='content'>
            <Messages isRoomSelected={this.state.isRoomSelected} />
            <div className='home__dialog--message'>
              <CreateMessage isRoomSelected={this.state.isRoomSelected}/>
            </div> 
          </div>
        </div>
      </Split>
    );
  }
};
export default Home;