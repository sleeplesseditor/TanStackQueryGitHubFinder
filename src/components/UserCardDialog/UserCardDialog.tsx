import * as React from 'react';
import { 
    FaCode, FaCodeBranch, FaGithubAlt, FaMapMarkerAlt, FaRegUserCircle, FaWindowClose 
} from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { getGitHubUserDetails } from '@api/github';
import './userCardDialog.scss';

interface UserCardDialogProps {
    dialogId: any;
    onClose: (user: any) => void;
    user: any;
}

const UserCardDialog: React.FC<UserCardDialogProps> = ({ dialogId, user, onClose }) => {

    const { data, isLoading, error } = useQuery({
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