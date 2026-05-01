import { FaClock, FaUser } from 'react-icons/fa';
import { useQueryClient } from '@tanstack/react-query';
import './recentSearches.scss';
import { fetchGitHubUsers } from '@api/github';

interface RecentSearchProps {
    onSelect: (userName: string) => void;
    recentUsers: string[];
}

const RecentSearches = ({ onSelect, recentUsers }: RecentSearchProps) => {
    const queryClient = useQueryClient(); 

    return (
        <div className="recent-search__container">
            <div className="recent-search__header">
                <FaClock />
                <h3>Recent Searches</h3>
            </div>
            <ul className="recent-search__list">
                {recentUsers.map((user) => (
                    <li 
                        className="recent-search__item"
                        key={user}
                    >
                        <button 
                            onClick={() => onSelect(user)}
                            onMouseEnter={() => {
                                queryClient.prefetchQuery({
                                    queryKey: ['users', user],
                                    queryFn: () => fetchGitHubUsers(user)
                                })
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