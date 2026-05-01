import { FaClock, FaUser } from 'react-icons/fa';
import './recentSearches.scss';

interface RecentSearchProps {
    recentUsers: string[];
    setUserName: (userName: string) => void;
    setSubmittedUserName: (userName: string) => void;
}

const RecentSearches = (props: RecentSearchProps) => {
    return (
        <div className="recent-search__container">
            <div className="recent-search__header">
                <FaClock />
                <h3>Recent Searches</h3>
            </div>
            <ul className="recent-search__list">
                {props.recentUsers.map((user) => (
                    <li 
                        className="recent-search__item"
                        key={user}
                    >
                        <button 
                            onClick={() => {
                                props.setUserName(user);
                                props.setSubmittedUserName(user);
                            }}
                        >
                            <FaUser className='user-icon' />
                            {user}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default RecentSearches;