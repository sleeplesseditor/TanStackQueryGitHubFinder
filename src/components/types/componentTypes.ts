export interface GitHubUserProps {
    avatar_url: string
    bio: string
    html_url: string
    id: number
    login: string
    name?: string
    setSelectedUser?: () => void;
}