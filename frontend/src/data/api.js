const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/weather`);

    return response.json();
  } catch (error) {
    console.error(error); // remove consoles
  }

  return {};
};

export default getWeatherFromApi;
