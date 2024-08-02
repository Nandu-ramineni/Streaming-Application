import Logo from '../src/assets/logo.png';
import { useEffect } from 'react';

const AnimatedLogo = ({ onAnimationEnd }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onAnimationEnd();
        }, 2000); 
        return () => clearTimeout(timer);
    }, [onAnimationEnd]);

    return (
        <div className="logo-container">
            <img src={Logo} alt="Logo" className="animated-logo" />
        </div>
    );
};

export default AnimatedLogo;
