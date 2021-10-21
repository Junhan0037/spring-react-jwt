import {useDispatch} from "react-redux";
import {Button} from "react-bootstrap";
import {registerAsync} from "./memberSlice";

const Register = () => {
  const dispatch = useDispatch();

  const submit = () => {
    dispatch(registerAsync(''));
  }

  return (
    <>
      <Button variant="primary" onClick={submit} >
        테스트
      </Button>
    </>
  )
}

export default Register;
