export const getTournamentData = function (url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.log(error.message);
    });
};
