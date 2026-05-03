import type { GitHubUserProps } from '@components/types/componentTypes';

interface SuggestionsProps {
    onSelect: (selected: string) => void;
    suggestions: []
}

const SuggestionsDropdown = ({ onSelect, suggestions }: SuggestionsProps) => {
    return (
        <ul className="suggested-user__list">
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