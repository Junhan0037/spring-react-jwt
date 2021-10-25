import {Button, Container, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {logout} from "../member/memberSlice";

const Navbars = () => {
  const dispatch = useDispatch();

  const memberLoginStatus = useSelector((state: any) => state.member.isLogin);

  const submit = () => {
    dispatch(logout());
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand><Link to=''>GrandParents</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link to='/'>Home</Link>
            <NavDropdown title="회원" id="navbarScrollingDropdown">
              {memberLoginStatus !== 'loginSuccess' && <NavDropdown.Item><Link to='/auth/login'>로그인</Link></NavDropdown.Item>}
              {memberLoginStatus !== 'loginSuccess' && <NavDropdown.Item><Link to='/auth/sign-up'>회원가입</Link></NavDropdown.Item>}
              <NavDropdown.Divider />
              <NavDropdown.Item><Link to='/counter'>카운터 예제</Link></NavDropdown.Item>
            </NavDropdown>
            {memberLoginStatus === 'loginSuccess' && <Link to="/auth/register">요양보호사 등록</Link>}
            <Nav.Link disabled>미활성</Nav.Link>
            {memberLoginStatus === 'loginSuccess' && <Button variant="outline-danger" onClick={submit}>Logout</Button>}
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navbars;
