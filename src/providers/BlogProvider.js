import { createContext, useState, useEffect, useContext } from "react";
import { baseApiUrl } from "../APIConfig";

const BlogContext = createContext();

export const useBlogContext = () => {
    const context = useContext(BlogContext);
    return context;
}

const getBlogs = async () => {
    const result = await fetch(`${baseApiUrl}/blog`, {
        method: "GET",
        headers: {
            "content-type": "application/json; charset=utf-8"
        }
    })
    return await result.json();
}

const getBlogById = async (id) => {
    const result = await fetch(`${baseApiUrl}/blog/${id}`, {
        method: "GET",
        headers: {
            "content-type": "application/json; charset=utf-8"
        }
    })
    return await result.json();
}

const postBlog = async (blog) => {
    const form = new FormData();
    for (const [key, value] of Object.entries(blog)) {
        form.append(key, value);
    }

    const result = await fetch(`${baseApiUrl}/blog`, {
        method: "POST",
        headers: {
            "authorization": `bearer ${localStorage.getItem("token")}`
        },
        body: form
    });
    return await result.json();
}

const deleteBlog = async (id) => {
    const result = await fetch(`${baseApiUrl}/blog/${id}`, {
        method: "DELETE",
        headers: {
            "authorization": `bearer ${localStorage.getItem("token")}`
        }
    });
    return await result.json();
}

const putBlog = async (id, blog) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(blog)) {
        formData.append(key, value);
    }

    const result = await fetch(`${baseApiUrl}/blog/${id}`, {
        method: "PUT",
        headers: {
            "authorization": `bearer ${localStorage.getItem("token")} `
        },
        body: formData
    });
    if (result.ok) {
        return result.status;
    }
    else {
        throw new Error("There was an error with the PUT request. Contact your Minecraft admin!")
    }
}

export const BlogProvider = ({children}) => {
    const [blogs, setBlogs] = useState();

    const findBlogById = async (id) => {
        return await getBlogById(id);
    }

    const addBlog = async(blog) => {
        const newBlog = await postBlog(blog)
        setBlogs(prevValue => ([
            ...prevValue,
            newBlog
        ]));
        return newBlog;
    }

    const removeBlog = async (id) => {
        const deletedBlog = await deleteBlog(id);
        setBlogs(prevValue => prevValue.filter(b => b.id !== deletedBlog.id));
        return deleteBlog;
    }

    const editBlog = async (id, blog) => {
        const result = await putBlog(id, blog)

        if (result == 204) {
            const updatedBlogs = blogs.map(b => b.id === Number(id) ? blog : b)
            setBlogs(updatedBlogs);
        }
        return result;
    }

    useEffect(() => {
        const fetchData = async () => {
            setBlogs(await getBlogs());
        }
        fetchData();
    }, []);

    return (
        <BlogContext.Provider value={{blogs, findBlogById, addBlog, removeBlog, editBlog}}>
            {children}
        </BlogContext.Provider>
    );
}

