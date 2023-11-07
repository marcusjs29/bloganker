import { Link } from "react-router-dom";
import { useState } from "react";
import { useBlogContext } from "../../providers/BlogProvider"
import ConfirmationModal from "../modal/ConfirmationModal";
import { baseImageUrl } from "../../APIConfig";
import { useUserContext } from "../../providers/UserProvider";

const Blogs = () => {
    const { user } = useUserContext();
    const { blogs, removeBlog } = useBlogContext();
    const [blogId, setBlogId] = useState();

    const handleDeleteItemSelected = (event) => {
        const blogId = event.target.dataset.blogId;
        setBlogId(blogId);
        document.getElementById("confirmationModalButton").click();
    }

    const handleDeleteBlog = () => {
        const handleDelete = async () => {
            const result = await removeBlog(blogId);
        }
        handleDelete();
    }

    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        blogs?.map(b => (
                            <tr key={b.id}>
                                <td className="col-md-3">
                                    <img className="w-100" src={`${baseImageUrl}/${b.imageCover}`} alt="Cover of blog" />
                                </td>

                                <td>{b.title}</td>
                                <td>{b.author}</td>
                                <td>{b.description.length > 30 ? (b.description.substring(0, 100) + "...") : b.description}</td>
                                <td>
                                    <Link to={`/blog/details/${b.id}`} className="btn btn-outline-primary me-3">Details</Link>
                                    {
                                        user?.token === undefined ? <></> :
                                            <>
                                                <Link className="btn btn-outline-warning me-3 px-4" to={`/blog/edit/${b.id}`}>Edit</Link>
                                                <button className="btn btn-outline-danger" data-blog-id={b.id} onClick={handleDeleteItemSelected}>Delete</button>
                                            </>
                                    }

                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <ConfirmationModal title="Delete blog" message={`Are you sure you want to delete this blog?`} onConfirm={handleDeleteBlog} />
        </>
    );
};

export default Blogs;