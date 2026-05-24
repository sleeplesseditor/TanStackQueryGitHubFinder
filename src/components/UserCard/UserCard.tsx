import * as React from 'react';
import { checkIfFollowingUser, followGithubUser, unfollowGithubUser } from '@api/github';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FaGithubAlt, FaUserMinus, FaUserPlus } from 'react-icons/fa';
import { toast } from 'sonner';
import '@components/UserSearch/userSearch.scss';
import type { GitHubUserProps } from '@components/types/componentTypes';

const UserCard = (user: GitHubUserProps) => {
    const { data: isFollowing, refetch } = useQuery({
        queryKey: ['follow-status', user.login],
        queryFn: () => checkIfFollowingUser(user.login),
        enabled: !!user.login
    });

    const followMutation = useMutation({
        mutationFn: () => followGithubUser(user.login),
        onSuccess: () => {
            toast.success(`You are now following ${user.login}!`);
            refetch();
        },
        onError: (error) => {
            console.error('Error following user:', error.message);
        }
    });

    const unfollowMutation = useMutation({
        mutationFn: () => unfollowGithubUser(user.login),
        onSuccess: () => {
            toast.error(`You are no longer following ${user.login}!`);
            refetch();
        },
        onError: (error) => {
            console.error('Error following user:', error.message);
        }
    });

    const handleFollow = () => {
        if(isFollowing) {
            unfollowMutation.mutate();
        } else {
            followMutation.mutate();
        }
    };

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
                <div className="user-search__result--btns">
                    <button
                        className={`user-search__profile-follow ${isFollowing ? 'following' : ''}`}
                        disabled={followMutation.isPending || unfollowMutation.isPending}
                        onClick={() => handleFollow()}
                    >
                        {isFollowing ? (
                            <React.Fragment>
                                <FaUserMinus /> Following
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <FaUserPlus /> Follow User
                            </React.Fragment>
                        )}
                    </button>
                    <button
                        className="user-search__profile-link"
                        onClick={() => window.open(user.html_url)}
                    >
                        <FaGithubAlt /> View Profile
                    </button>
                </div>
            </div>
        </div>
    )
};

export default UserCard;