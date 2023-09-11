export const getTelemetryApi = async (serverUrl) => {
  try {
    const response = await fetch(serverUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn("Error while fetching telemetry data.");
  }
};

export const postTelemetryApi = async (serverUrl, newTelemetry) => {
  try {
    const response = await fetch(serverUrl, {
      method: "POST",
      body: JSON.stringify(newTelemetry),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn("Error while posting telemetry data.");
  }
};

export const getSessionTelemetryApi = async () => {
  try {
    const response = await fetch(
      `http://api.ipstack.com/check?access_key=${IPSTACK_TOKEN}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn("Error while retrieving current session telemetry.");
  }
};
