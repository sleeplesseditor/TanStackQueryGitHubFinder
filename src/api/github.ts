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

export const checkIfFollowingUser = async (username: string) => {
    const response = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/user/following/${username}`, {
        headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
            Accept: 'application/vnd.github+json',
        }
    });

    if(response.status === 204) {
        return true;
    } else if (response.status === 404) {
        return false;
    } else {
       const errorData = await response.json().catch(() => null);
       throw new Error(errorData?.message || 'Failed to check follow status');
    }
};

export const followGithubUser = async (username: string) => {
    const response = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/user/following/${username}`, {
        headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
            Accept: 'application/vnd.github+json',
            'Content-Type': 'application/json'
        },
        method: 'PUT'
    });

    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || 'Failed to follow user');
    }

    return true;
};

export const unfollowGithubUser = async (username: string) => {
    const response = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/user/following/${username}`, {
        headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
            Accept: 'application/vnd.github+json',
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    });

    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || 'Failed to unfollow user');
    }

    return true;
};