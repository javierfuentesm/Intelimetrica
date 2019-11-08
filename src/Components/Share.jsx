
import React from 'react';
import {FaTwitter} from "react-icons/fa/";
import {FaFacebook} from "react-icons/fa/";
import { ShareButtonRectangle, ShareBlockStandard } from "react-custom-share";

const ShareComponent = props => {
  const shareBlockProps = {
    url: props.url,
    button: ShareButtonRectangle,
    buttons: [
      { network: "Twitter", icon: FaTwitter },
      { network: "Facebook", icon: FaFacebook }
    ],
    text: `Visitanos cuando quieras en ${props.text}`,
    longtext: `Encuentranos en ${props.address}`
  };

  return <ShareBlockStandard {...shareBlockProps} />;
};

export default ShareComponent;
