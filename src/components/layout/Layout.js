import Nav from "../nav/Nav";

const Layout = ({ children }) => {
    return (
        <>
            <Nav />
            <main className="container">
                {children}
            </main>
        </>
    );
};

export default Layout;