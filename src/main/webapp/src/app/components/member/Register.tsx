import {useDispatch, useSelector} from "react-redux";
import {Button, Form, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import {clearSearchAssistant, registerAsync, searchAssistantAsync} from "./memberSlice";
import {useState} from "react";
import {Redirect} from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();

  const searchResult = useSelector((state: any) => state.member.searchAssistant);
  const userRole = useSelector((state: any) => state.member.role);

  const [name, setName] = useState('');
  const [assistant, setAssistant] = useState('');
  const [lgShow, setLgShow] = useState(false);

  const searchAssistant = () => {
    setLgShow(true); // modal On
    const params = {name};
    dispatch(searchAssistantAsync(params));
  }

  const chooseAssistant = (index: any) => {
    const email = searchResult[index];
    setAssistant(email);
    setLgShow(false); // modal Off
    dispatch(clearSearchAssistant());
  }

  const submit = () => {
    const params = {email: assistant};
    dispatch(registerAsync(params));
  }

  return (
    <>
      <Form className="container">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>요양 보호사 이름</Form.Label>
          <Form.Control placeholder="홍길동" value={name} onChange={(e) => setName(e.target.value)} />
          <br />
          {assistant && <Form.Label>요양 보호사 정보</Form.Label>}
          {assistant && <h5>{assistant}</h5>}
        </Form.Group>
        <Button variant="info" onClick={searchAssistant} >
          검색
        </Button>
        <br />

        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Large Modal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              {searchResult.map((data: string, index: any) => (
                <ListGroupItem key={index}>{data}<Button variant="warning" onClick={() => chooseAssistant(index)}>선택</Button></ListGroupItem>
              ))}
            </ListGroup>
          </Modal.Body>
        </Modal>
        <br />

        <Button variant="primary" onClick={submit} >
          등록하기
        </Button>

        {userRole !== 'USER' && <Redirect to="/" />}
      </Form>
    </>
  )
}

export default Register;
