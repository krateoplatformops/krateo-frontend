import { Button } from "antd";
import styles from './styles.module.scss';
import { LoginOutlined, GithubOutlined } from "@ant-design/icons";
import { ReactElement } from "react";
import { AuthModeType } from "../../type";

type renderMethodsType = {
  name: string;
  icon: ReactElement;
  label: string;
  className: string;
  // url: string;
}

const renderMethodsData: renderMethodsType[] = [
  {
    name: "github",
    icon: <GithubOutlined />,
    label: "Sign in with GitHub",
    className: "github",
  },
  {
    name: "oidc",
    icon: <LoginOutlined />,
    label: "OpenID Connection",
    className: "oidc",
  }
]

const SocialLogin = ({method}: {method: AuthModeType}) => {
  const renderData = renderMethodsData.find((el) => (el.name === method.kind) && method.extensions?.redirectURL && (method.extensions.redirectURL.indexOf(window.location.protocol) > -1));

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
    (method && renderData) ?
      <div className={styles.socialLogin}>
        <Button
          icon={renderData.icon}
          onClick={() => onSubmit()}
          className={styles[renderData.className]}
          size='large'
        >
          {renderData.label}
        </Button>
      </div>
    :
     <></>
  )
}

export default SocialLogin;