// import emotion
import React from 'react';

// import icons
import {FaTwitter} from "react-icons/fa/";
import {FaFacebook} from "react-icons/fa/";

// import react-custom-share components
import { ShareButtonRectangle, ShareBlockStandard } from "react-custom-share";

const ShareComponent = props => {
  // create object with props for shareBlock
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
