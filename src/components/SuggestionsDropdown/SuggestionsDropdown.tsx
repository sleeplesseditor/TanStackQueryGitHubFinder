import * as React from 'react';
import type { GitHubUserProps } from '@components/types/componentTypes';

interface SuggestionsProps {
    onClose: () => void;
    onSelect: (selected: string) => void;
    suggestions: []
}

const SuggestionsDropdown = ({ onSelect, suggestions, onClose }: SuggestionsProps) => {
    const dropdownRef = React.useRef<HTMLUListElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener('click', handleClickOutside, true);

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
        <ul className="suggested-user__list" ref={dropdownRef}>
            {suggestions?.slice(0,5).map((suggestedUser: GitHubUserProps) => (
                <li 
                    className="suggested-user__item" 
                    key={suggestedUser.login}
                    onClick={() => onSelect(suggestedUser.login)}
                >
                    <img
                        alt={suggestedUser.login}
                        className="suggested-user__icon" 
                        src={suggestedUser.avatar_url}
                    />
                    {suggestedUser.login}
                </li>
            ))}
        </ul>
    )
}

export default SuggestionsDropdown;