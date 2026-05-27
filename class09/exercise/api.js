import { USER_URL } from "./config.js";

import { POST_URL } from "./config.js";

export function fetchUsers() {
  return fetch(USER_URL).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  });
}

export function fetchPosts() {
  return fetch(POST_URL).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  });
}
