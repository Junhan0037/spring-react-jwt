import {Button, Form, Spinner} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {signUpAsync} from "./memberSlice";
import {Redirect} from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();

  const memberStatus = useSelector((state: any) => state.member.status);
  const memberError = useSelector((state: any) => state.member.error);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [userType, setUserType] = useState('');

  const submit = () => {
    if (userType === '' || userType === 'error') {
      setUserType('error');
      return;
    }

    const params = {name, email, password, passwordConfirm, userType};
    dispatch(signUpAsync(params));
  }

  const isError = () => {
    return memberStatus === 'signUpError';
  }

  const emailError = (field: string) => {
    let message = ''
    memberError.forEach((error: any) => {
      if (error['field'] === field) {
        message = error['defaultMessage'];
      }
    })
    return message;
  }

  return (
    <Form className="container">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>이름</Form.Label>
        <Form.Control placeholder="홍길동" value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>이메일</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Form.Text className="text-muted">GrandParents 는 사용자의 이메일을 공개하지 않습니다.</Form.Text><br/>
        {isError() && <Form.Text className="text-danger">{emailError('email')}</Form.Text>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>패스워드</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Form.Text className="text-muted">8자 이상 50자 이내로 입력하세요. 영문자, 숫자, 특수기호를 사용할 수 있으며 공백은 사용할 수 없습니다.</Form.Text><br/>
        {isError() && <Form.Text className="text-danger">{emailError('password')}</Form.Text>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
        <Form.Label>패스워드 확인</Form.Label>
        <Form.Control type="password" placeholder="Password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
        <Form.Text className="text-muted">패스워드를 다시 한번 입력하세요.</Form.Text><br/>
        {isError() && <Form.Text className="text-danger">{emailError('passwordConfirm')}</Form.Text>}
      </Form.Group>

      <Form.Check inline label="일반 사용자" name="group1" type="radio" id="radio-1" onChange={() => setUserType('USER')} />
      <Form.Check inline label="요양 보호사" name="group1" type="radio" id="radio-2" onChange={() => setUserType('ASSISTANT')} />
      {userType === 'error' && <Form.Text className="text-danger">사용자 유형을 선택하세요.</Form.Text>}

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="약관 동의" />
      </Form.Group>

      <Button variant="primary" onClick={submit} >
        가입하기
      </Button>

      {memberStatus === 'signUpLoading' && <Spinner animation="border" />}
      {memberStatus === 'signUpSuccess' && <Redirect to="/" />}
    </Form>
  )
}

export default SignUp
