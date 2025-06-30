import { useEffect, useState } from "react";
import useUser from '../hooks/useUser';
import DynamicModal from '../components/dynamivModal'

const Header = () => {

    const { profile, getProfile, loading } = useUser();

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getProfile();
    }, []);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <nav className="mr-10 ml-10 navbar navbar-light bg-white px-4 py-2 border-bottom w-330">
                <span className="navbar-brand mb-0 h1">Ecommerce Seller</span>

                <div className="d-flex align-items-center gap-3">
                    <span className="text-muted">
                        Welcome, {profile?.first_name || "User"}
                    </span>
                    <p
                        className="mb-0 text-primary"
                        role="button"
                        onClick={handleOpenModal}
                        style={{ cursor: 'pointer' }}
                    >
                        <img
                            width="40"
                            height="40"
                            src="/image/profile.png"
                            alt="Profile"
                            className="rounded-circle border"
                        />
                    </p>
                </div>
            </nav>

            <DynamicModal show={showModal} onHide={handleCloseModal} title="User Profile">
                {loading ? (
                    <p>Loading profile...</p>
                ) : (
                    <>
                        <p className="text-center">
                            <img
                                width="80"
                                height="80"
                                src="/image/profile.png"
                                alt="Profile"
                                className="rounded-circle border mb-3"
                            />
                        </p>
                        <p><strong>First Name:</strong> {profile?.first_name}</p>
                        <p><strong>Last Name:</strong> {profile?.last_name}</p>
                        <p><strong>Email:</strong> {profile?.email}</p>
                        <p><strong>Role:</strong> {profile?.role}</p>
                    </>
                )}
            </DynamicModal>
        </>
    );
};

export default Header;
