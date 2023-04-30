import Footer from "./Footer";
import NavBar from "./NavBar";


export default function Layout({ children }) {
    return (
        <>
            <NavBar />
            {children}
            <Footer />
        </>
    )
}
