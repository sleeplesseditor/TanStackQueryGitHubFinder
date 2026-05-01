import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchGitHubUsers } from '@api/github'; 
import UserCard from '@components/UserCard/UserCard';
import './userSearch.scss';

const UserSearch = () => {
    const [userName, setUserName] = React.useState<string>('');
    const [submittedUserName, setSubmittedUserName] = React.useState<string>('');

    const { data, isLoading, error } = useQuery({
        queryKey: ['users', submittedUserName],
        queryFn: () => fetchGitHubUsers(submittedUserName),
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
                        <UserCard {...user} />
                    ))}
                </div>
            )}  
        </>
    )
};

export default UserSearch;