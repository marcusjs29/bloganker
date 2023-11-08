import { Navigate } from "react-router-dom";
import { useUserContext } from "../../providers/UserProvider"
import AddBlog from "../blog/AddBlog"
import Blogs from "../blog/Blogs";

const Profile = () => {
    const { user } = useUserContext();

    if (!user) {
        return <Navigate to="/login" />
    }

    return (
        <>
            <div className="row">
                <div className="col-md-4 my-4">
                    <img src="profile-pic.jpg" alt="Profile Picture" className="img-fluid rounded-circle" />
                </div>
                <div className="col-md-8 my-4">
                    <h1>Mike Oxlong</h1>
                    <p>Middleware Developer</p>
                    <p>Email: MikeOxlong@gmail.com</p>
                    <p>Skills: Boa, MinecraftCoding, LMTH, SSC</p>
                </div>
                <h1 className="text-center my-5">Blogs:</h1>
                <div className="col-md-6">
                    <h3 className="text-center">Add Blog</h3>
                    <AddBlog />
                </div>
                <div className="col-md-6">
                <h3 className="text-center">All Blogs</h3>
                    <Blogs />
                </div>
            </div>
        </>
    );
};

export default Profile;