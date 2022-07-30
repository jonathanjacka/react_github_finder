const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

//Get search results
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  const res = await fetch(`${GITHUB_URL}/search/users?${params}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });

  const { items } = await res.json();

  return items;
};

//get single user
export const getUser = async (login) => {
  const res = await fetch(`${GITHUB_URL}/users/${login}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });

  if (res.status === 404) {
    throw new Error('User not found - check to see if username is correct');
  } else {
    const data = await res.json();
    return data;
  }
};

//Get single user repos
export const getUserRepos = async (login) => {
  const params = new URLSearchParams({
    q: `user:` + login,
    sort: 'stars',
    per_page: 10,
  });

  const res = await fetch(`${GITHUB_URL}/search/repositories?${params}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });

  const { items: data } = await res.json();

  return data;
};
