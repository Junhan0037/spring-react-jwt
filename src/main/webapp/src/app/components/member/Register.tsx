import {useDispatch, useSelector} from "react-redux";
import {Button, Form, ListGroup, ListGroupItem} from "react-bootstrap";
import {clearSearchAssistant, registerAsync, searchAssistantAsync} from "./memberSlice";
import {useState} from "react";

const Register = () => {
  const dispatch = useDispatch();

  const searchResult = useSelector((state: any) => state.member.searchAssistant);

  const [name, setName] = useState('');
  const [assistant, setAssistant] = useState('');

  const searchAssistant = () => {
    const params = {name};
    dispatch(searchAssistantAsync(params));
  }

  const chooseAssistant = (index: any) => {
    const email = searchResult[index];
    setAssistant(email);
    dispatch(clearSearchAssistant());
  }

  const submit = () => {
    dispatch(registerAsync(assistant));
  }

  return (
    <>
      <Form className="container">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>요양 보호사 이름</Form.Label>
          <Form.Control placeholder="홍길동" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Button variant="info" onClick={searchAssistant} >
          검색
        </Button>
        <br />

        <ListGroup>
          {searchResult.map((data: string, index: any) => (
            <ListGroupItem key={index}>{data}<Button variant="warning" onClick={() => chooseAssistant(index)}>선택</Button></ListGroupItem>
          ))}
        </ListGroup>

        <Button variant="primary" onClick={submit} >
          등록하기
        </Button>

        <h5>{assistant}</h5>
      </Form>
    </>
  )
}

export default Register;
