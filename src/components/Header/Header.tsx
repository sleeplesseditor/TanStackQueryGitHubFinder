import { FaGithub } from 'react-icons/fa';
import './header.scss';

const Header = () => {
    return (
        <header className="header__container">
            <FaGithub className="header__icon" />
            <h3 className="header__title">TanStack Query GitHub Finder</h3>
        </header>
    );
};

export default Header;