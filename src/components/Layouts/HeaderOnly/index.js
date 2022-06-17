import Header from '@/components/Layouts/components/Header';

function HeaderOnly({ children }) {
    return (
        <>
            <div className="container">
                <Header />
                <div className="content">{children}</div>
            </div>
        </>
    );
}

export default HeaderOnly;
