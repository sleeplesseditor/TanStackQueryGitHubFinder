import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaGithubAlt } from 'react-icons/fa';
import './userSearch.scss';

const UserSearch = () => {
    const [userName, setUserName] = React.useState<string>('');
    const [submittedUserName, setSubmittedUserName] = React.useState<string>('');

    const { data, isLoading, error } = useQuery({
        queryKey: ['users', submittedUserName],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/search/users?q=${submittedUserName}&per-page=10   `, {
                headers: {
                    'X-GitHub-Api-Version': '2026-03-10'
                }
            });
            
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

    console.log('Data:', data);

    return (
        <>
        <div className="user-search__container">
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
            {isLoading && <p className="loading-message">Loading...</p>}
            {error && <p className="error-message">Error: {error.message}</p>}  
        </div>
            {data?.items.length > 0 && (
                <div className="user-search__results-container">
                    {data.items.map((user: any) => (
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
                    ))}
                </div>
            )}  
        </>
    )
};

export default UserSearch;