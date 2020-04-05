import React, { Component } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
const { Option } = Select;

class SearchInput extends Component {
  constructor() {
    super();
    this.fetchData = debounce(() => {
      this.setState({
        isFetching: true
      })

      this.props.searchData(this.state.value).then(({data}) => {
        this.setState({data: data.filter(it => it._id !== this.props.user._id)});
        this.setState({isFetching: false})
      }).catch(() => {
        this.setState({isFetching: false})
      })
    }, 300);
  } 

  state = {
    data: [],
    value:  null,
    inputValue: null,
    isFetching: true
  }

  componentDidMount() {
    if (this.props.mode === 'multiple') {
      this.setState({
        inputValue: []
      })
    }
  }

  handleSearch = value => {
    this.setState({ value });
    this.fetchData();
  };

  handleChange = value => {
    this.setState({
      value:value, 
      inputValue: value
    });

    this.props.handleChange(value);
  };

  clearData = () => {
    this.setState({
      inputValue: this.props.mode === 'multiple' ? [] : null
    });
  }

  render() {
    const options = this.state.data.map(it => <Option key={it._id}>{it.firstname}&nbsp;{it.lastname}</Option>);
    const { isFetching } = this.state;

    return (
      <Select
        value={this.state.inputValue}
        style={{width: '100%'}}
        mode={this.props.mode ? this.props.mode : 'default'}
        showSearch={true}
        placeholder={this.props.placeholder ? this.props.placeholder : "Выберите пользователя"} 
        onSearch={this.handleSearch}
        filterOption={false}
        onChange={this.handleChange} 
        onFocus={() => this.handleSearch('')} 
        notFoundContent={isFetching ? <Spin size="small" /> : <p>Пользователь не найден</p> }>
        {options}
      </Select>
    )
  }
}

export default SearchInput;