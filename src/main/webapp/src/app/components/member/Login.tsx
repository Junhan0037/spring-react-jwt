import {Button, Form, Spinner} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {loginAsync} from "./memberSlice";
import {Redirect} from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();

  const memberLoginStatus = useSelector((state: any) => state.member.isLogin);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
    const params = {email, password};
    dispatch(loginAsync(params));
  }

  const isError = () => {
    return memberLoginStatus === 'loginError';
  }

  return (
    <>
      <Form className="container">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>패스워드</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {isError() && <Form.Text className="text-danger">아이디, 비밀번호를 확인하세요.</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="로그인 기억" />
        </Form.Group>

        <Button variant="primary" onClick={submit}>
          로그인
        </Button>

        {memberLoginStatus === 'loginLoading' && <Spinner animation="border" />}
        {memberLoginStatus === 'loginSuccess' && <Redirect to="/" />}
      </Form>
    </>
  )

}

export default Login;