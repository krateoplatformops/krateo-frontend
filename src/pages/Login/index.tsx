import { useNavigate } from "react-router-dom";
import Panel from "../../components/Panel/Panel";
import { useLazyAuthenticationQuery, useGetAuthModesQuery, useLdapAuthenticationMutation } from "../../features/auth/authApiSlice";
import { setUser } from "../../features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import LoginForm from "./components/LoginForm/LoginForm";
import { FormType, LoginFormType } from "./type";
import { Divider, Result } from "antd";
import useCatchError from "../../hooks/useCatchError";
import Skeleton from "../../components/Skeleton/Skeleton";
import SocialLogin from './components/SocialLogin/SocialLogin';

const Login = () => {
  const [authentication, { isLoading: AuhLoading }] = useLazyAuthenticationQuery();
  const [ldapAuthentication] = useLdapAuthenticationMutation();
  const {data, isLoading, isError, isFetching} = useGetAuthModesQuery();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { catchError } = useCatchError();

  const onFormSubmit = async (body: LoginFormType, type: FormType) => {
    const dataMode = data?.find((el) => el.kind === type);

    if (body.username && body.password && dataMode?.path) {
      try {
        const userData = (type === "basic") ? 
                            await authentication({body, url: dataMode.path}).unwrap()
                          :
                            await ldapAuthentication({body, url: `${dataMode?.path}?name=${dataMode?.name}`}).unwrap()
                          ;
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
        case "ldap":
            return <div key={`login_${i}`}>
              <LoginForm onSubmit={(values) => onFormSubmit(values, el.kind as FormType)} type={el.kind} isLoading={AuhLoading} />
              {((i + 1) < data?.length ) && <Divider plain>OR</Divider> }
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