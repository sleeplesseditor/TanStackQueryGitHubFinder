import * as React from 'react';
import { FaCode, FaCodeBranch, FaRegUserCircle, FaWindowClose } from 'react-icons/fa';
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

    console.log('DATA', data)

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
            <div className="user-card-dialog__head">
                <FaWindowClose id="closeModal" onClick={() => onClose(user)} />
            </div>
            {isLoading ? (
                <p className="user-card-dialog__loading">Loading profile details...</p>
            ) : error ? (
                <p className="user-card-dialog__error">Error: {error.message}</p>
            ) : (
                <div className="user-card-dialog__content">
                    <span className="user-card-dialog__header">
                        <img className="user-card-dialog__avatar" src={data.avatar_url} alt={`${data.login}'s avatar`} />
                        <h1 className="user-card-dialog__name">{data.name || data.login}</h1>
                    </span>
                    <p className="user-card-dialog__bio">{data.bio}</p>
                    <div className="user-card-dialog__stats">
                        <span><FaCode /> {data.public_repos} Repositories</span>
                        <span><FaRegUserCircle /> {data.followers} Followers</span>
                        <span><FaCodeBranch /> {data.public_gists} Gists</span>
                    </div>
                    
                    <a href={data.html_url} target="_blank" rel="noopener noreferrer" className="user-card-dialog__link">
                        View on GitHub
                    </a>
                </div>
            )}  
        </dialog>    
    )
};

export default UserCardDialog;