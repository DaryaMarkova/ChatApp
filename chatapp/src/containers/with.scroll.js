import React, { Component, createRef } from 'react';

export const withScroll = (WrappedComponent) => {
  return class extends Component {
    constructor() {
      super();
      this.containerRef = createRef();
    }

    scrollToBottom = () => {
      const scrollHeight = this.containerRef.current.scrollHeight;
      const clientHeight = this.containerRef.current.clientHeight;
      const maxScrollTop = scrollHeight - clientHeight;
      this.containerRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    };

    render() {
      return (     
          <WrappedComponent 
            {...this.props}
            scrollToBottom={this.scrollToBottom} 
            containerRef={this.containerRef} />
      )
    }
  }
}