// import emotion
import { css } from 'emotion';

// import icons
import FaTwitter from 'react-icons/lib/fa/twitter';
import FaFacebook from 'react-icons/lib/fa/facebook';
import FaGooglePlus from 'react-icons/lib/fa/google-plus';
import FaEnvelope from 'react-icons/lib/fa/envelope';
import FaPinterest from 'react-icons/lib/fa/pinterest';
import FaLinkedin from 'react-icons/lib/fa/linkedin';

// import react-custom-share components
import { ShareButtonRectangle, ShareBlockStandard } from 'react-custom-share';

const ShareComponent = props => {
  // create object with props for shareBlock
  const shareBlockProps = {
    url: props.url,
    button: ShareButtonRectangle,
    buttons: [
      { network: 'Twitter', icon: FaTwitter },
      { network: 'Facebook', icon: FaFacebook },
    ],
    text: `Visitanos cuando quieras en ${props.text}`,
    longtext: `Encuentranos en ${props.address}`,
  };

  return <ShareBlockStandard {...shareBlockProps} />;
};
