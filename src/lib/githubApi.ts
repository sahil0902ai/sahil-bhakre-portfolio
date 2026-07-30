import { openSourceData } from '@config/openSource';

export async function fetchGitHubStats() {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  
  if (!token) {
    // Return production fallback data if no GitHub API token is provided
    return openSourceData;
  }

  try {
    const res = await fetch('https://api.github.com/users/sahilbhakre', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      return openSourceData;
    }

    const data = await res.json();
    return {
      ...openSourceData,
      stats: {
        ...openSourceData.stats,
        totalRepos: data.public_repos || openSourceData.stats.totalRepos,
      },
    };
  } catch (error) {
    return openSourceData;
  }
}
