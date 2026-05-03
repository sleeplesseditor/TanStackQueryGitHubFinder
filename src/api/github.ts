export const searchGitHubUsers = async (username: string) => {
    const response = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/search/users?q=${username}&per-page=10   `, {
        headers: {
            'X-GitHub-Api-Version': '2026-03-10'
        }
    });
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
}