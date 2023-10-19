export const fetchHits = async () => {
  try {
    const response = await fetch(
      'https://hn.algolia.com/api/v1/search_by_date?query=mobile',
    );
    const data = await response.json();
    return data.hits;
  } catch (error) {
    throw error;
  }
};
