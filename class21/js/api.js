export default async function getFestivalData() {
  // FIX: await both fetches; use Promise.all with an array
  const [artistResponse, performanceResponse] = await Promise.all([
    fetch("./artists.json"),
    fetch("./performances.json"),
  ]);

  // FIX: throw when !response.ok (original used || and wrong direction)
  if (!artistResponse.ok) {
    throw new Error(
      `Failed to load artists: ${artistResponse.status} ${artistResponse.statusText}`,
    );
  }

  if (!performanceResponse.ok) {
    throw new Error(
      `Failed to load performances: ${performanceResponse.status} ${performanceResponse.statusText}`,
    );
  }

  // FIX: call .json() as a function and await it
  const artists = await artistResponse.json();
  const performances = await performanceResponse.json();

  // FIX: return keys "artists" and "performances" to match app.js
  return { artists, performances };
}
