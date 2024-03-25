
const URL = 'http://key.dstu.local/api/pool';

export const methodDefault = async (path, { body, method = 'GET' }) => {
  try {
    const response = await fetch(`${URL}${path}`, {
      body,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      state: data.state,
      data: data.data,
      body: data.body
    };
  } catch (error) {
    console.error(`methodDefault Error >>> ${error}`);
    return { state: false, data: [], body: '' };
  }
};