import './userCardDialog.scss';

interface UserCardDialogProps {
    dialogId: any;
    onClose: (user: any) => void;
    user: any;
}

const UserCardDialog: React.FC<UserCardDialogProps> = ({ dialogId, user, onClose }) => {
    console.log('UserCardDialog props:', { dialogId, user });
    return (
        <dialog className="user-card-dialog" ref={dialogId}>
            <button id="closeModal" onClick={() => onClose(user)} />
            <p>{user.login}</p>
        </dialog>    
    )
};

export default UserCardDialog;