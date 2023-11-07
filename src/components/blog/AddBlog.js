import { useState } from "react";
import { useBlogContext } from "../../providers/BlogProvider"
import InfoModal from "../modal/InfoModal";


const AddBlog = () => {
    const { addBlog } = useBlogContext();
    const [blog, setBlog] = useState({ title: undefined, description: undefined, author: undefined, imagecover: null, file: null })
    const [postResult, setPostResult] = useState();

    const handleFormChange = (event) => {
        const name = event.target.name;
        const value = event.target.name === "file" ? event.target.files[0] : event.target.value;

        setBlog(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const handleSubmit = async () => {
            const result = await addBlog(blog);
            setPostResult(result);
            event.target.reset();
            document.getElementById("infoModalButton").click();
        }
        handleSubmit();
    }

    return (
        <>
            <section className="container-fluid">
                <div className="row">
                    <div className="col">
                        <form onChange={handleFormChange} onSubmit={handleFormSubmit}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="title" name="title" required />
                                <div id="titleHelp" className="form-text">The title of the blog:</div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="author" className="form-label">Author</label>
                                <input type="text" className="form-control" id="author" name="author" required />
                                <div id="authorHelp" className="form-text">The author of the blog:</div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="rating" className="form-label">Rating</label>
                                <input type="number" className="form-control" id="rating" name="rating" required />
                                <div id="ratingHelp" className="form-text">The rating of the blog out of 5:</div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea type="text" className="form-control" id="description" name="description" rows={6} required />
                                <div id="ratingHelp" className="form-text">The description of the blog:</div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="coverimage" className="form-label">Image</label>
                                <input type="file" className="form-control" accept="coverimage/*" id="coverimage" name="file" required />
                                <div id="coverimageHelp" className="form-text">The cover of the blog:</div>
                            </div>

                            <button type="submit" className="btn btn-outline-primary mb-3">Save</button>
                        </form>
                    </div>
                </div>
            </section>
            <InfoModal title="Blog Added" message={`The blog: ${postResult?.title} by ${postResult?.author} with an id: ${postResult?.id} had been added.`} />
        </>
    );
};

export default AddBlog;