import { Result } from "antd";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo_black.png";

const Page404 = () => {
  return (
    <Result
      icon={<img src={logo} alt="Krateo | PlatformOps" width={400} />}
      title="404 Page not found"
      subTitle="We can't find the page you're looking for"
      extra={<Link to="/">Go to the Home page</Link>}
    />
  )
}

export default Page404;