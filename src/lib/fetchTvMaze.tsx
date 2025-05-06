export async function fetchShowsByPage(page: number) {
  const res = await fetch(`https://api.tvmaze.com/shows?page=${page}`);
  const shows = await res.json();

  return shows; // array vide si page inexistante
}

export async function fetchActorDetails(id: string) {
  const [personRes, castCreditsRes] = await Promise.all([
    fetch(`https://api.tvmaze.com/people/${id}`),
    fetch(`https://api.tvmaze.com/people/${id}/castcredits?embed=show`),
  ]);

  if (!personRes.ok) return null;

  const [person, castCredits] = await Promise.all([
    personRes.json(),
    castCreditsRes.json(),
  ]);

  return { person, castCredits };
}

export async function fetchShowDetails(id: string) {
  const [showRes, episodesRes, castRes, seasonsRes] = await Promise.all([
    fetch(`https://api.tvmaze.com/shows/${id}`),
    fetch(`https://api.tvmaze.com/shows/${id}/episodes`),
    fetch(`https://api.tvmaze.com/shows/${id}/cast`),
    fetch(`https://api.tvmaze.com/shows/${id}/seasons`),
  ]);

  if (!showRes.ok) return null;

  const [show, episodes, cast, seasons] = await Promise.all([
    showRes.json(),
    episodesRes.json(),
    castRes.json(),
    seasonsRes.json(),
  ]);

  return { show, episodes, cast, seasons };
}

export async function fetchEpisodeDetails(id: string) {
  const res = await fetch(`https://api.tvmaze.com/episodes/${id}`);
  if (!res.ok) return null;

  const episode = await res.json();

  const showUrl = episode._links?.show?.href;
  if (showUrl) {
    const showRes = await fetch(showUrl);
    if (showRes.ok) {
      const show = await showRes.json();
      episode.show = show;
    }
  }

  return episode;
}

export const fetchSearchResults = async (query: string) => {
  if (!query) return [];

  const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
  const data = await response.json();
  return data.map((item: any) => item.show);
};
