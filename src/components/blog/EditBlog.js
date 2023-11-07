import { useNavigate, useParams } from "react-router-dom"
import { useBlogContext } from "../../providers/BlogProvider";
import { useEffect, useState } from "react";
import InfoModal from "../modal/InfoModal";
import { baseImageUrl } from "../../APIConfig";



const EditBlog = () => {
    const { blogId } = useParams();
    const { findBlogById, editBlog } = useBlogContext();
    const navigate = useNavigate();
    const [blog, setBlog] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setBlog(await findBlogById(blogId));
        }
        fetchData();
    }, []);

    const handleFormChange = (event) => {
        const name = event.target.name;
        const value = (event.target.name == "file") ? event.target.files[0] : event.target.value;

        setBlog(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const formSubmit = async () => {
            const result = await editBlog(blogId, blog);
            if (result == 204) {
                document.getElementById("infoModalButton").click();
            }
        }
        formSubmit();
    }

    const handleInfoModalConfirm = () => {
        navigate("/")
    }

    return (
        <>
            <section className="container-fluid">
                <div className="row">
                    <div className="col">
                        <form onChange={handleFormChange} onSubmit={handleFormSubmit}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="title" name="title" defaultValue={blog?.title} required />
                                <div id="titleHelp" className="form-text">The title of the blog:</div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="author" className="form-label">Author</label>
                                <input type="text" className="form-control" id="author" name="author" defaultValue={blog?.author} required />
                                <div id="authorHelp" className="form-text">TThe author of the blog:</div>
                            </div>
                            
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea type="text" className="form-control" id="description" name="description" defaultValue={blog?.description} rows={6} required />
                                <div id="ratingHelp" className="form-text">The description of the blog:</div>
                            </div>

                            <div className="mb-3">
                                <img src={`${baseImageUrl}/${blog?.imagecover}`} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="coverimage" className="form-label">Image</label>
                                <input type="file" className="form-control" accept="coverimage/*" id="coverimage" name="file" defaultValue={blog?.imagecover} />
                                <div id="coverimageHelp" className="form-text">The cover of the blog:</div>
                            </div>

                            <button type="submit" className="btn btn-outline-primary mb-3">Save</button>
                        </form>
                    </div>
                </div>
            </section>
            <InfoModal title="Blog Edited" message={`The blog: ${blog?.title} by ${blog?.author} with an id: ${blog?.id} had been edited.`} onConfirm={handleInfoModalConfirm} />
        </>
    );
};

export default EditBlog;