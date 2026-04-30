import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaGithubAlt } from 'react-icons/fa';

const UserSearch = () => {
    const [userName, setUserName] = React.useState<string>('');
    const [submittedUserName, setSubmittedUserName] = React.useState<string>('');

    const { data, isLoading, error } = useQuery({
        queryKey: ['users', submittedUserName],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/users/${submittedUserName}`);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        },
        enabled: !!submittedUserName
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmittedUserName(userName.trim());
    };

    return (
        <React.Fragment>
        <form
            className="user-search__form"
            onSubmit={handleSubmit}
        >
            <input 
                placeholder='Enter a GitHub user name'
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                value={userName}
            />
            <button 
                className="user-search__button"
                type="submit"
            >
                Search
            </button>
        </form>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && (
            <div className="user-search__result">
                <img 
                    alt={`${data.login}'s avatar`} 
                    className="user-search__avatar" 
                    src={data.avatar_url}
                    width={100} 
                />
                <h2>{data.name || data.login}</h2>
                <p>{data.bio}</p>
                <a 
                    className="user-search__profile-link"
                    href={data.html_url} 
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <FaGithubAlt /> View Profile
                </a>
            </div>
        )}
        </React.Fragment>
    )
};

export default UserSearch;