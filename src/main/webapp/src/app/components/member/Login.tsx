import React from "react";
import {Button, Form} from "react-bootstrap";

const Login = () => {

  return (
    <>
      <Form className="container">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>패스워드</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="로그인 기억" />
        </Form.Group>

        <Button variant="primary" type="submit">
          로그인
        </Button>
      </Form>
    </>
  )

}

export default Login;
