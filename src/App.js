import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./providers/UserProvider";
import { BlogProvider } from "./providers/BlogProvider";
import Layout from "./components/layout/Layout";
import BlogDetails from "./components/blog/BookDetails";
import Blogs from "./components/blog/Blogs";
import EditBlog from "./components/blog/EditBlog";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import AddBlog from "./components/blog/AddBlog";
import Profile from "./components/profile/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <BlogProvider>
          <Layout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/blog/details/:blogId" element={<BlogDetails />} />
              <Route path="/allblogs" element={<Blogs />} />
              <Route path="/" element={<Home />} />
              <Route path="/addblog" element={<AddBlog />} />
              <Route path="/blog/edit/:blogId" element={<EditBlog />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Layout>
        </BlogProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
