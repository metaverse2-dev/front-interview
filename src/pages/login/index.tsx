import { Button, Form } from "react-bootstrap";
import style from '@/style/login.module.scss';
import { useForm } from "react-hook-form";
import { postLogin, ResLogin } from "@/api/auth";
import { jwtAccessKey, jwtRefreshKey } from "@/constant/jwt";

type LoginForm = {
  email: string;
  password: string;
}
export default function Login() {
  const {register, watch} = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    }
  });
  const {email, password} = watch();
  const loginSuccess = (data: ResLogin) => {
    localStorage.setItem(jwtAccessKey, data.accessToken);
    localStorage.setItem(jwtRefreshKey, data.refreshToken);
  }
  const loginFail = (data) => {
    console.error(data.response.data.message)
  }

  const {mutate} = postLogin({
    onError: loginFail,
    onSuccess: loginSuccess
  });

  return (
    <Form className={style.From}>
      <Form.Group className="mb-3 w-50" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" {...register("email")}/>
      </Form.Group>
      <Form.Group className="mb-3 w-50" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" {...register("password")}/>
      </Form.Group>

      <Button variant="primary" onClick={() => {
        mutate({email, password});
        // onRegisterSubmit();
      }}>
        Login
      </Button>
    </Form>
  )
}