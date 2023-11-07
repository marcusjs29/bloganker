import { Link } from "react-router-dom";
import { useUserContext } from "../../providers/UserProvider.js";

const Nav = () => {
    const { user } = useUserContext();

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <Link to="/" className="navbar-brand">Blog Homepage</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#blog-db-nav" aria-controls="blog-db-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="library-db-nav">
                    <div className="navbar-nav me-auto">
                        <Link className="nav-link active" aria-current="page" to="/allblogs">All blogs</Link>
                        <Link className="nav-link active" to="/addblog">Add blog</Link>
                    </div>
                </div>
                <div>
                    {
                        user === undefined ?
                            <Link to="/login" className="btn btn-outline-success">Login</Link>
                            :
                            <Link to="/profile" className="btn btn-outline-primary">{user.user.email}</Link>
                    }
                </div>
            </div>
        </nav>
    );
};

export default Nav;