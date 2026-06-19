const fetchJSON = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error ${response.status}: ${url}`);
  return response.json();
};

export const fetchTeams = (url) => fetchJSON(url);
