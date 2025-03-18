import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { AuthModeType, LoginFormType } from '../../type';
import styles from './styles.module.scss';

type LoginType = {
  method: AuthModeType,
  onSubmit: (data:LoginFormType) => void,
  isLoading: boolean
}

const LoginForm = ({ method, onSubmit, isLoading }: LoginType) => {

  return (
    <section className={styles.loginForm}>
      <Form
        name="basic"
        layout="vertical"
        onFinish={onSubmit}
        autoComplete="off"
        disabled={isLoading}
        requiredMark={false}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Insert a username' }]}
        >
          <Input size='large' />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Insert a password' }]}
        >
          <Input.Password size='large' />
        </Form.Item>

        { method.kind === "basic" &&
          <div className={styles.linkPassword}>
            <Link to="/forgotpassword">Forgot password?</Link>
          </div>
        }
        
        <Form.Item>
        { method.kind === "basic" ?
          <Button size='large' className={styles.loginButton} type="primary" htmlType="submit">
            Sign In
          </Button>
          :
          <Button
            size='large'
            className={styles.loginButton}
            style={method.graphics?.backgroundColor && method.graphics?.textColor ? {backgroundColor: method.graphics.backgroundColor, color: method.graphics.textColor} : undefined}  
            htmlType="submit"
          >
            {method.graphics?.displayName || "LDAP Sign In"} 
          </Button>
        }
        </Form.Item>
      </Form>
    </section>
  )
}

export default LoginForm;