import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, resetState } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
    return () => {
      dispatch(resetState()); //call on dismantling  component
    };
  }, [isSuccess, navigate, dispatch]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { email, password, confirmPassword } = formData;

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not mach");
      return;
    }

    dispatch(register({ email, password }));
  }

  console.log(password, confirmPassword);
  if (isLoading) return <h2>loading...</h2>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="email"
          name="email"
          value={email}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
      {isError && <p>{message}</p>}
      {isSuccess && <p>Success</p>}
    </div>
  );
}
export default Register;
