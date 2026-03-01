
export const query = async (api) => {
  try {
    const request = new Request(api);
    const response = await fetch(request);
    return await response.json();
  } catch(err) {
    return err;
  }
}
