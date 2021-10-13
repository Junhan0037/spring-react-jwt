import {Button, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {selectMember, signUpAsync} from "./memberSlice";
import axios from "axios";

const SignUp = () => {
  const dispatch = useDispatch();
  const memberState = useSelector(selectMember)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const submit = () => {
    const params = {email, password, passwordConfirm}
    axios.post('/auth/sign-up', params).then((response) => {
      if (response.data) {
        console.log(response.data);
        dispatch(signUpAsync(response.data)); // Error
      } else {
        alert('failed to');
      }
    })
  }

  return (
    <>
      <Form className="container">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Form.Text className="text-muted">
            GrandParents 는 사용자의 이메일을 공개하지 않습니다.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>패스워드</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Form.Text className="text-muted">
            8자 이상 50자 이내로 입력하세요. 영문자, 숫자, 특수기호를 사용할 수 있으며 공백은 사용할 수 없습니다.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
          <Form.Label>패스워드 확인</Form.Label>
          <Form.Control type="password" placeholder="Password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
          <Form.Text className="text-muted">
            패스워드를 다시 한번 입력하세요.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="약관 동의" />
        </Form.Group>

        <Button variant="primary" onClick={submit} >
          가입하기
        </Button>

        <h1>{memberState}</h1>
      </Form>
    </>
  )
}

export default SignUp