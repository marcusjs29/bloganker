import { useParams } from "react-router-dom"
import { useBlogContext } from "../../providers/BlogProvider";
import { useEffect, useState } from "react";
import { baseImageUrl } from "../../APIConfig";



const BlogDetails = () => {
    const { blogId } = useParams();
    const { findBlogById } = useBlogContext();
    const [blog, setBlog] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setBlog(await findBlogById(blogId));
        }
        fetchData();
    }, [])

    return (
        <section className="container-fluid">
            <div className="row">
                <div className="col-md-4">
                    <img src={`${baseImageUrl}/${blog?.imageCover}`} className="img-fluid" alt="Picture of the blog in title" />
                </div>
                <div className="col-md-8">
                    <h1>"{`${blog?.title}" by ${blog?.author}`}</h1>
                    <hr />
                    <p>{blog?.description}</p>
                </div>
            </div>
        </section>
    );
};

export default BlogDetails;