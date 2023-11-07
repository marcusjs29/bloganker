import { Navigate } from "react-router-dom";
import { useUserContext } from "../../providers/UserProvider"
import AddBlog from "./components/blog/AddBlog";

const Profile = () => {
    const { user } = useUserContext();

    if (!user) {
        return <Navigate to="/login" />
    }

    return (
        <>
            <div className="row">
                <div className="col-md-4">
                    <img src="profile-pic.jpg" alt="Profile Picture" className="img-fluid rounded-circle" />
                </div>
                <div className="col-md-8">
                    <h1>Mike Oxlong</h1>
                    <p>Middleware Developer</p>
                    <p>Email: MikeOxlong@gmail.com</p>
                    <p>Skills: Boa, MinecraftCoding, LMTH, SSC</p>
                </div>
                <div className="col-12">
                    <AddBlog />
                </div>
            </div>
        </>
    );
};

export default Profile;