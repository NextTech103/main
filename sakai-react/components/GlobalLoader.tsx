// components/GlobalLoader.js
import { ProgressSpinner } from 'primereact/progressspinner';
import { useLoading } from '../layout/context/LoadingContext';

const GlobalLoader = () => {
    const { loading } = useLoading();

    if (!loading) return null; // Hide when not loading

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
        }}>
            <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" />
        </div>
    );
};

export default GlobalLoader;
