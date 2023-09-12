export const filterTelemetry = (inputJson) => {
  const transformedJson = { ...inputJson };

  delete transformedJson.ip;
  delete transformedJson.asn;
  delete transformedJson.count;
  delete transformedJson.currency;
  delete transformedJson.type;
  delete transformedJson.continent_code;
  delete transformedJson.country_flag_emoji;
  delete transformedJson.country_flag_emoji_unicode;
  delete transformedJson.calling_code;
  delete transformedJson.is_eu;
  delete transformedJson.emoji_flag;
  delete transformedJson.emoji_unicode;
  delete transformedJson.languages;
  delete transformedJson.region_type;
  delete transformedJson.threat;
  delete transformedJson.time_zone;

  transformedJson.region_name = transformedJson.region;
  delete transformedJson.region;

  transformedJson.zip = transformedJson.postal;
  delete transformedJson.postal;

  transformedJson.country_flag = transformedJson.flag;
  delete transformedJson.flag;

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

  return transformedJson;
};
