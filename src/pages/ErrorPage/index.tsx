import { Result } from "antd";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo_black.png";

const ErrorPage = () => {
  return (
    <Result
    icon={<img src={logo} alt="Krateo | PlatformOps" width={400} />}
    title="Ops!"
      subTitle="Something went wrong."
      extra={<Link to="/">Go to the Home page</Link>}
    />
  )
}

export default ErrorPage;