export const filterTelemetry = (inputJson) => {
  const transformedJson = { ...inputJson };

  delete transformedJson.ip;
  delete transformedJson.type;
  delete transformedJson.continent_code;
  delete transformedJson.country_flag_emoji;
  delete transformedJson.country_flag_emoji_unicode;
  delete transformedJson.calling_code;
  delete transformedJson.is_eu;

  if (transformedJson.location) {
    transformedJson.country_flag = transformedJson.location.country_flag;
    delete transformedJson.location;
  }

  if (transformedJson.latitude) {
    transformedJson.latitude = parseFloat(transformedJson.latitude.toFixed(2));
  }
  if (transformedJson.longitude) {
    transformedJson.longitude = parseFloat(
      transformedJson.longitude.toFixed(2)
    );
  }

  const today = new Date();
  const dateFormatted = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  transformedJson.date = dateFormatted;

  console.log("the new json:");
  console.log(transformedJson);

  return transformedJson;
};
