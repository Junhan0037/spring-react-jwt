import React, {useState, useEffect} from "react";

const SignUp = () => {

  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch('/auth/hello')
      .then(response => response.text())
      .then(message => setMessage(message))
  }, [])

  return (
    <>
      <h1>SignUp 페이지</h1>
      <h2>{message}</h2>
    </>
  )

}

export default SignUp;
