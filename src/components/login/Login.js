import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../providers/UserProvider"
import { useState } from "react";




const Login = () => {
    const { handleLogin } = useUserContext();
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState();

    const handleFormChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setLoginInfo(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const handleSubmit = async () => {
            const success = await handleLogin(loginInfo);
            if (success) {
                navigate("/")
            }
        }
        handleSubmit();
    }
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onChange={handleFormChange} onSubmit={handleFormSubmit}>
                        <h1>Login</h1>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" />
                        </div> <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;