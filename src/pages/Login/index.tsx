import { useNavigate } from "react-router-dom";
import Panel from "../../components/Panel/Panel";
import { useLazyAuthenticationQuery, useGetAuthModesQuery } from "../../features/auth/authApiSlice";
import { setUser } from "../../features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import LoginForm from "./components/LoginForm/LoginForm";
import { LoginFormType } from "./type";
import { Divider, Result } from "antd";
import useCatchError from "../../utils/useCatchError";
import Skeleton from "../../components/Skeleton/Skeleton";
import getClientIdFromPath from "../../utils/getClientIdFromPath";
import SocialLogin from './components/SocialLogin/SocialLogin';

const Login = () => {
  const clientId = getClientIdFromPath();
  const [authentication, { isLoading: AuhLoading }] = useLazyAuthenticationQuery();
  const {data, isLoading, isError, isFetching} = useGetAuthModesQuery(clientId);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { catchError } = useCatchError();

  const onBasicSubmit = async (body: LoginFormType) => {
    const url = data?.find((el) => el.kind === "basic")?.path;

    if (body.username && body.password && url) {
      try {
        const userData = await authentication({body, url}).unwrap();
        if (userData.code !== 200) {
          throw({status: userData.code, data: { message: "Wrong username or password, try again with different credentials"}})
        }
        dispatch(setUser(userData));
        navigate("/");
      } catch (err) {
        catchError(err);
      }
    } else {
      catchError({status: 403, data: { message: "Wrong username or password, try again with different credentials"}});
    }
  };

  const renderPanelContent = () => (
    data?.length === 0 ?
      <Result status="warning" title="There are no authentication methods" subTitle="Please create some authentication methods and try again" />
    :
    data?.map((el, i) => {
      switch (el.kind) {
        case "basic":
            return <div key={`login_${i}`}>
              <LoginForm onSubmit={onBasicSubmit} type="basic" isLoading={AuhLoading} />
              {(data?.length > 1) && <Divider plain>OR</Divider> }
            </div>
          break;

        default:
          return <SocialLogin key={`login_${i}`} method={el} />
          break;
      }
    })
  )

  return (
    <section>
      <Panel
        title="Welcome back"
        content={
          isError ?
          <Result status="error" title="Ops! Something didn't work" subTitle="Unable to retrieve authentication methods" />
          :
          (isLoading || isFetching) ?
          <Skeleton />
          :
          renderPanelContent()
        }
      />
    </section>
  )
}

export default Login;