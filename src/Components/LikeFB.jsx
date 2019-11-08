import React, { Component } from "react";
import { FacebookProvider, Like } from "react-facebook";

export default class LikeFB extends Component {
  render() {
    return (
      <FacebookProvider appId="717589285046812">
        <Like href={this.props.url} colorScheme="dark" showFaces />
      </FacebookProvider>
    );
  }
}
