import { Outlet } from 'react-router-dom';
import { Nav } from './widgets/Nav';
import { Footer } from './widgets/Footer';
import { Alert } from './ui/Alert';


const Layout = () => {

    return (
        <>
            <Nav />
            <Alert />
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
    );
};

export { Layout };