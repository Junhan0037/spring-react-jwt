import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../config/rootReducer";
import client from "../../config/client";
import {user} from "./user";


const SignUp = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signUpState = useTypedSelector(state => state.user);

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  }
  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  }

  const signUp = async () => {
    const param = {email, password};
    return await client.post('/auth/sign-up', param);
  }

  const submit = () => {
    signUp().then(response => {
      dispatch(user({
        email: response.data
      }))
    })
  }

  return (
    <>
      <Form className="container">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" onChange={onChangeEmail} value={email} />
          <Form.Text className="text-muted">
            GrandParents 는 사용자의 이메일을 공개하지 않습니다.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>패스워드</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={onChangePassword} value={password} />
          <Form.Text className="text-muted">
            8자 이상 50자 이내로 입력하세요. 영문자, 숫자, 특수기호를 사용할 수 있으며 공백은 사용할 수 없습니다.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>패스워드 확인</Form.Label>
          <Form.Control type="password" placeholder="Password" />
          <Form.Text className="text-muted">
            패스워드를 다시 한번 입력하세요.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="약관 동의" />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={submit}>
          가입하기
        </Button>
      </Form>
    </>
  )

}

export default SignUp;
