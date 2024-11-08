import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { LoginFormType } from '../../type';
import styles from './styles.module.scss';

type LoginType = {
  type: "basic",
  onSubmit: (data:LoginFormType) => void,
  isLoading: boolean
}

const LoginForm = ({ type, onSubmit, isLoading }: LoginType) => {

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

        { type === "basic" &&
          <div className={styles.linkPassword}>
            <Link to="/forgotpassword">Forgot password?</Link>
          </div>
        }
        
        <Form.Item>
          <Button size='large' className={styles.loginButton} type="primary" htmlType="submit">
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </section>
  )
}

export default LoginForm;