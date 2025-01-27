import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../features/auth/authSlice";
import { Result, Space, Spin, Typography } from "antd";
import { useGetAuthModesQuery, useLazySocialAuthenticationQuery } from "../../features/auth/authApiSlice";
import getClientIdFromPath from "../../utils/getClientIdFromPath";
import { AuthModeType, AuthRequestType } from "../Login/type";
import { LoadingOutlined } from "@ant-design/icons";

const AuthOidc = () => {
  const clientId = getClientIdFromPath();
  const [socialsAuthentication, {isError : isErrorAuth}] = useLazySocialAuthenticationQuery();
  const [searchParams] = useSearchParams();
  const [showError, setShowError] = useState<boolean>(false);
  const {data, isSuccess: isSuccessModes, isError: isErrorModes} = useGetAuthModesQuery(clientId);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const code = searchParams.get("code");

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
      const methodData = data?.find((el) => (el.kind === "oidc") && el.extensions?.redirectURL && (el.extensions.redirectURL.indexOf(window.location.protocol) > -1));
      if (code && methodData) {
        socialAuth(code, methodData);
      }
    } 
    if (isErrorModes || isErrorAuth) {
      setShowError(true);
    }
  }, [code, data, dispatch, isErrorAuth, isErrorModes, isSuccessModes, navigate, socialsAuthentication]);

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

export default AuthOidc;