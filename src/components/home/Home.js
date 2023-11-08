import { baseImageUrl } from "../../APIConfig";
import { useBlogContext } from "../../providers/BlogProvider"
import { Link } from "react-router-dom";



const Home = () => {
    const { blogs } = useBlogContext();

    return (
        <article className="container g-1">
            <section className="text-center mt-5 mb-5">
                <h1>Blogs of the Awesomest Swag</h1>
            </section>
            <article className="row">
                {
                    blogs?.map(b => (
                        <section className="col-md-3 col-sm-6 text-center" key={b.id}>
                            <figure>
                                <Link className="btn" to={`/blog/details/${b.id}`}>
                                    <img src={`${baseImageUrl}/${b.imageCover}`} className="w-100" alt="Picture of blog" />
                                </Link>
                            </figure>
                            <h3>{b.title}</h3>
                            <h5>By: {b.author}</h5>
                            <p>
                                {b.description.length > 30 ? (b.description.substring(0, 60) + "...") : b.description}
                            </p>

                        </section>
                    ))
                }
            </article>
        </article>
    );
};

export default Home;