import {Button, Container, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {logout} from "../member/memberSlice";
import {LinkContainer} from "react-router-bootstrap"

const Navbars = () => {
  const dispatch = useDispatch();

  const memberLoginStatus = useSelector((state: any) => state.member.isLogin);
  const userName = useSelector((state: any) => state.member.name);
  const userRole = useSelector((state: any) => state.member.role);

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
            <LinkContainer to='/'><Nav.Link>{userName}</Nav.Link></LinkContainer>
            <NavDropdown title="회원" id="navbarScrollingDropdown">
              {memberLoginStatus !== 'loginSuccess' && <LinkContainer to='/auth/login'><NavDropdown.Item>로그인</NavDropdown.Item></LinkContainer>}
              {memberLoginStatus !== 'loginSuccess' && <LinkContainer to='/auth/sign-up'><NavDropdown.Item>회원가입</NavDropdown.Item></LinkContainer>}
              <NavDropdown.Divider />
              <LinkContainer to='/counter'><NavDropdown.Item>카운터 예제</NavDropdown.Item></LinkContainer>
            </NavDropdown>
            {memberLoginStatus === 'loginSuccess' && userRole === 'USER' && <LinkContainer to='/auth/register'><Nav.Link>요양보호사 등록</Nav.Link></LinkContainer>}
            {memberLoginStatus === 'loginSuccess' && <Link to='/'><Button variant="outline-danger" onClick={submit}>Logout</Button></Link>}
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
