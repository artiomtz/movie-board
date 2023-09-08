const { MongoClient, ServerApiVersion } = require("mongodb");

function getConnection() {
  let mongoDbUri = process.env.MONGODB_URI;
  const client = new MongoClient(mongoDbUri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  return client;
}

async function testConnection() {
  const client = getConnection();
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB");
  } finally {
    await client.close();
  }
}

async function getTelemetry() {
  const client = getConnection();
  try {
    await client.connect();
    let results = await client
      .db(process.env.MONGODB_DB_NAME)
      .collection("telemetry")
      .find({})
      .project({ _id: 0 })
      .toArray();
    return results;
  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }
}

async function saveTelemetry(telemetryData) {
  const client = getConnection();
  try {
    await client.connect();
    await client
      .db(process.env.MONGODB_DB_NAME)
      .collection("telemetry")
      .insertOne(telemetryData);
    return;
  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }
}

module.exports = { testConnection, getTelemetry, saveTelemetry };
