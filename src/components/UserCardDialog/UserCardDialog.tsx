import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getGitHubUserDetails } from '@api/github';
import './userCardDialog.scss';

interface UserCardDialogProps {
    dialogId: any;
    onClose: (user: any) => void;
    user: any;
}

const UserCardDialog: React.FC<UserCardDialogProps> = ({ dialogId, user, onClose }) => {

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['user-details', user.login],
        queryFn: () => getGitHubUserDetails(user.login),
        enabled: !!user.login
    });

    React.useEffect(() => {        
        const dialog = dialogId.current;
        if (dialog) {
            console.log('Dialog element found, attempting showModal...');
            try {
                dialog.showModal();
            } catch (e) {
                console.error('✗ showModal() failed:', e);
            }
        } else {
            console.warn('✗ dialogId.current is null/undefined');
        }
    }, []);

    return (
        <dialog className="user-card-dialog" ref={dialogId}>
            <button id="closeModal" onClick={() => onClose(user)} />
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <div>
                    <h2>{data.name || data.login}</h2>
                    <img src={data.avatar_url} alt={`${data.login}'s avatar`} />
                    <p>{data.bio}</p>
                    <a href={data.html_url} target="_blank" rel="noopener noreferrer">View on GitHub</a>
                </div>
            )}  
        </dialog>    
    )
};

export default UserCardDialog;