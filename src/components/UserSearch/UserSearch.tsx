import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchGitHubUsers } from '@api/github'; 
import UserCard from '@components/UserCard/UserCard';
import RecentSearches from '@components/RecentSearches/RecentSearches';
import './userSearch.scss';

const UserSearch = () => {
    const [userName, setUserName] = React.useState<string>('');
    const [submittedUserName, setSubmittedUserName] = React.useState<string>('');
    const [recentUsers, setRecentUsers] = React.useState<string[]>([]);

    const { data, isLoading, error } = useQuery({
        queryKey: ['users', submittedUserName],
        queryFn: () => fetchGitHubUsers(submittedUserName),
        enabled: !!submittedUserName
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = userName.trim();

        if(!trimmed) return;
        setSubmittedUserName(trimmed);

        setRecentUsers((prev) => {
            const updated = [trimmed, ...prev.filter((user) => user !== trimmed)];
            return updated.slice(0,5);
        });
    };

    return (
        <React.Fragment>
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
            {recentUsers.length > 0 && (
                <RecentSearches 
                    recentUsers={recentUsers} 
                    setSubmittedUserName={setSubmittedUserName} 
                    setUserName={setUserName}/>
            )}
        </React.Fragment>
    )
};

export default UserSearch;