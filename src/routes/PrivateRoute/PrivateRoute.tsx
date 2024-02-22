import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import Loader from '../../common/Loader';
import { useAuth } from '../../hooks/useAuth';

const PrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loader />;
    }

    if (user) {
        return <>{children}</>;
    }

    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
};

export default PrivateRoute;
