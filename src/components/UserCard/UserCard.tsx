import { FaGithubAlt } from 'react-icons/fa';
import '@components/UserSearch/userSearch.scss';

interface UserProps {
    avatar_url: string
    bio: string
    html_url: string
    login: string
    name?: string
}

const UserCard = (user: UserProps) => {
    return (
        <div className="user-search__result">
            <img 
                alt={`${user.login}'s avatar`} 
                className="user-search__avatar" 
                src={user.avatar_url}
                width={100} 
            />
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
    )
};

export default UserCard;