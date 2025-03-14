import { useEffect, useState } from "react"
import { useGetAuthModesQuery, useLazySocialAuthenticationQuery } from "../../features/auth/authApiSlice";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthModeType, AuthRequestType } from "../Login/type";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../features/auth/authSlice";
import { Result, Space, Spin, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";


const Auth = () => {
  const [socialsAuthentication, {isError : isErrorAuth}] = useLazySocialAuthenticationQuery();
  const {data, isSuccess: isSuccessModes, isError: isErrorModes} = useGetAuthModesQuery();
  const [searchParams] = useSearchParams();
  const [showError, setShowError] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const code = searchParams.get("code");
  const state = searchParams.get("state");  
  const kind = searchParams.get("kind");  

  useEffect(() => {
    const socialAuth = async (code: string, methodData: AuthModeType) => {
      const request: AuthRequestType = {
        name: methodData.name,
        code: code,
        url: methodData.path,
      }
      const userData = await socialsAuthentication(request).unwrap()
      dispatch(setUser(userData));
      navigate("/");
    }

    if (!isErrorAuth && isSuccessModes) {
      const methodData = data?.find((el) => (el.kind === kind) && el.extensions?.redirectURL && (el.extensions.redirectURL.indexOf(window.location.protocol) > -1));
      
      if ( methodData?.extensions?.authCodeURL && (methodData.extensions.authCodeURL.indexOf("&state=") > -1) ) {
        if (state === localStorage.getItem("KrateoSL") && 
          code && 
          methodData
        ) {
          socialAuth(code, methodData);
        }
      } else if (code && methodData) {
        socialAuth(code, methodData);
      }
    } 
    if (isErrorModes || isErrorAuth) {
      setShowError(true);
    }
  }, [code, data, dispatch, isErrorAuth, isErrorModes, isSuccessModes, navigate, socialsAuthentication, state])

  return (
    showError ?
    <Result
      status="warning"
      title="Authentication error"
      subTitle="There seems to be an authentication problem using this method"
      extra={<Link to="/login">Return to the Login page</Link>}
    />
    :
    <Space direction="vertical" size="large" style={{width: '100%', height: '100vh', alignItems: 'center', justifyContent: 'center'}}>
      <Spin indicator={<LoadingOutlined />} size="large" />
      <Typography.Text>Authentication in progress...</Typography.Text>
    </Space>
  )
}

export default Auth;