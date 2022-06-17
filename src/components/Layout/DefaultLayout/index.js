import Header from '@/components/Layout/components/Header';
import Sidebar from '@/components/Layout/components/Sidebar';

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
