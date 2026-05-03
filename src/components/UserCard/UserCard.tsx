import { FaGithubAlt } from 'react-icons/fa';
import '@components/UserSearch/userSearch.scss';
import type { GitHubUserProps } from '@components/types/componentTypes';

const UserCard = (user: GitHubUserProps) => {
    return (
        <div className="user-search__result" key={user.id}>
            <img 
                alt={`${user.login}'s avatar`} 
                className="user-search__avatar" 
                src={user.avatar_url}
                width={100} 
            />
            <div className="users-search__result--info">
                <h2 className="user-search__name">{user.name || user.login}</h2>
                <p className="user-search__bio">{user.bio}</p>
                <a 
                    className="user-search__profile-link"
                    href={user.html_url} 
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <FaGithubAlt /> View Profile
                </a>
            </div>
        </div>
    )
};

export default UserCard;