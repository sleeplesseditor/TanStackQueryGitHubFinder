import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchGitHubUsers } from '@api/github'; 
import UserCard from '@components/UserCard/UserCard';
import RecentSearches from '@components/RecentSearches/RecentSearches';
import SuggestionsDropdown from '@components/SuggestionsDropdown/SuggestionsDropdown';
import UserCardDialog from '@components/UserCardDialog/UserCardDialog';
import { useDebounce } from 'use-debounce';
import './userSearch.scss';

const UserSearch = () => {
    const [userName, setUserName] = React.useState<string>('');
    const [submittedUserName, setSubmittedUserName] = React.useState<string>('');
    const [recentUsers, setRecentUsers] = React.useState<string[]>(() => {
        const storedItems = localStorage.getItem('recentUsers');
        return storedItems ? JSON.parse(storedItems) : [];
    });
    const [selectedUser, setSelectedUser] = React.useState<any>(null);

    const [debouncedUserName] = useDebounce(userName, 300);
    const [isSuggestionVisible, setIsSuggestionVisible] = React.useState<boolean>(false);

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['users', submittedUserName],
        queryFn: () => searchGitHubUsers(submittedUserName),
        enabled: !!submittedUserName
    });

    const { data: suggestions } = useQuery({
        queryKey: ['github-user-suggestions', debouncedUserName],
        queryFn: () => searchGitHubUsers(debouncedUserName),
        enabled: debouncedUserName.length > 1
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

    React.useEffect(() => {
        localStorage.setItem('recentUsers', JSON.stringify(recentUsers));
    }, [recentUsers]);

    const messageDisplay = () => {
        if (isLoading) {
            return <p className="loading-message">Loading...</p>
        } else if (error) {
            return <p className="error-message">Error: {error.message}</p>
        } else {
            return <h5 className="user-search__results-message">{submittedUserName.length > 0 ? "No users found..." : ""}</h5>
        }
    }

    const modalRef = React.useRef<HTMLDialogElement | null>(null);

    function toggleModal(user: any){
        if (selectedUser){
            setSelectedUser(null);
            modalRef.current?.close();
        }
        else {
            setSelectedUser(user);
            modalRef.current?.showModal();
        }
    }

    return (
        <React.Fragment>
            <div className="user-search__container" data-testid="user-search-container">
                <form
                    className="user-search__form"
                    onSubmit={handleSubmit}
                >
                    <div className="dropdown-wrapper">
                        <input 
                            className="user-search__input"
                            data-testid="user-search__input"
                            onChange={(e) => {
                                const val = e.target.value;
                                setUserName(val);
                                setIsSuggestionVisible(val.trim().length > 1);
                            }}
                            placeholder='Enter a GitHub user name'
                            type="text"
                            value={userName}
                        />
                        {isSuggestionVisible && suggestions?.items?.length > 0 && (
                            <SuggestionsDropdown 
                                onClose={() => setIsSuggestionVisible(false)}
                                onSelect={(selected) => {
                                    setUserName(selected);
                                    setIsSuggestionVisible(false);

                                    if(submittedUserName !== selected) {
                                        setSubmittedUserName(selected)
                                    } else {
                                        refetch();
                                    }

                                    setRecentUsers((prev) => {
                                        const updated = [selected, ...prev.filter((user) => user !== selected)];
                                        return updated.slice(0,5);
                                    });
                                }}
                                suggestions={suggestions.items}
                            />
                        )}
                    </div>
                    <button 
                        className="user-search__button" 
                        data-testid="user-search__button" 
                        type="submit"
                    >
                        Search
                    </button>
                </form>
            </div>
            <div className="user-search__content">
                {data?.items.length > 0 ? (
                    <div className="user-search__results-container" data-testid="user-search__results-container">
                        {data.items.map((user: any) => (
                            <UserCard user={user} setSelectedUser={toggleModal} />
                        ))}
                    </div>
                ) : (
                    <div className="user-search__message-container" data-testid="user-search__message-container">
                        {messageDisplay()}
                    </div>
                )}
                {recentUsers.length > 0 && (
                    <RecentSearches 
                        onSelect={(userName) => {
                            setUserName(userName);
                            setSubmittedUserName(userName);
                        }}
                        recentUsers={recentUsers} 
                    />
                )}
            </div>
            {selectedUser && (
                <UserCardDialog 
                    dialogRef={modalRef}
                    onClose={toggleModal} 
                    user={selectedUser} 
                />
            )}
        </React.Fragment>
    )
};

export default UserSearch;