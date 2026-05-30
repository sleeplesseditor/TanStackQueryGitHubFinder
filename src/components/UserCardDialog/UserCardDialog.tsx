import * as React from 'react';
import { 
    FaCode, FaCodeBranch, FaGithubAlt, FaMapMarkerAlt, FaRegUserCircle, FaWindowClose 
} from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { getGitHubUserDetails } from '@api/github';
import './userCardDialog.scss';

interface UserCardDialogProps {
    dialogRef: any;
    onClose: (user: any) => void;
    user: any;
}

const UserCardDialog: React.FC<UserCardDialogProps> = ({ dialogRef, user, onClose }) => {

    const { data, isLoading, error } = useQuery({
        queryKey: ['user-details', user.login],
        queryFn: () => getGitHubUserDetails(user.login),
        enabled: !!user.login
    });

    React.useEffect(() => {        
        const dialog = dialogRef.current;
        if (dialog) {
            try {
                dialog.showModal();
            } catch (e) {
                console.error('✗ showModal() failed:', e);
            }
        } else {
            console.warn('✗ dialogRef.current is null/undefined');
        }
    }, []);

    return (
        <dialog className="user-card-dialog" data-testid="user-card-dialog" ref={dialogRef}>
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
                        <img 
                            alt={`${data.login}'s avatar`}
                            className="user-card-dialog__avatar" 
                            src={data.avatar_url} 
                        />
                        <span className="user-card-dialog__name-container">
                            <h1 className="user-card-dialog__name">{data.name || data.login}</h1>
                            {data.location && <p className="user-card-dialog__location"><FaMapMarkerAlt /> {data.location}</p>}
                        </span>
                    </span>
                    <p className="user-card-dialog__bio">{data.bio}</p>
                    <div className="user-card-dialog__stats">
                        <span><FaCode /> {data.public_repos} {data.public_repos === 1 ? 'Repository' : 'Repositories'}</span>
                        <span><FaRegUserCircle /> {data.followers} {data.followers === 1 ? 'Follower' : 'Followers'}</span>
                        <span><FaCodeBranch /> {data.public_gists} {data.public_gists === 1 ? 'Gist' : 'Gists'}</span>
                    </div>
                    <button 
                        className="user-card-dialog__profile-link"
                        onClick={() => window.open(data.html_url, '_blank')}
                    >
                        <FaGithubAlt /> View Profile
                    </button>
                </div>
            )}  
        </dialog>    
    )
};

export default UserCardDialog;