import { Button } from "antd";
import styles from './styles.module.scss';
import { AuthModeType } from "../../type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const SocialLogin = ({method}: {method: AuthModeType}) => {

  const getRandomString = () => {
    const rnd = Math.floor(Math.random() * Date.now()).toString(36);
    localStorage.setItem("KrateoSL", rnd);
    return rnd;
  };

  const onSubmit = () => {
    if (method.extensions?.authCodeURL) {
      if (method.extensions.authCodeURL.indexOf("&state=") > -1) {
        const url = method.extensions.authCodeURL.substring(0, method.extensions?.authCodeURL.indexOf("&state="))
        window.location.href = `${url}&state=${getRandomString()}`;
      } else {
        window.location.href = method.extensions.authCodeURL
      }
    }
  }

  return (
    (method) ?
      <div className={styles.socialLogin}>
        <Button
          icon={method.graphics?.icon && <FontAwesomeIcon icon={method.graphics.icon as IconProp} />}
          onClick={() => onSubmit()}
          style={method.graphics?.backgroundColor && method.graphics?.textColor ? {backgroundColor: method.graphics.backgroundColor, color: method.graphics.textColor} : undefined}
          size='large'
        >
          {method.graphics?.displayName}
        </Button>
      </div>
    :
     <></>
  )
}

export default SocialLogin;