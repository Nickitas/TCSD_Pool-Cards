import { Outlet } from 'react-router-dom';
import { Nav } from './widgets/Nav';
import { Footer } from './widgets/Footer';


const Layout = () => {

    return (
        <>
            <Nav />
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
    );
};

export { Layout };