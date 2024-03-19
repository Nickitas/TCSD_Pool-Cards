import { Outlet } from 'react-router-dom';
import { Nav } from './blocks/Nav';
import { Footer } from './blocks/Footer';


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