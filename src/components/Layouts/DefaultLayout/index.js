import Header from '@/components/Layouts/components/Header';
import Sidebar from '@/components/Layouts/components/Sidebar';

function DefaultLayout({ children }) {
    return (
        <>
            <Sidebar />
            <div className="container">
                <Header />
                <div className="content">{children}</div>
            </div>
        </>
    );
}

export default DefaultLayout;
