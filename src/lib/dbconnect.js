import { MongoClient, ServerApiVersion } from "mongodb";

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let clientPromise;

export const dbconnect = async () => {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME;

  if (!uri || !dbName) {
    throw new Error("Missing MONGODB_URI or DB_NAME in .env file");
  }

  // Lazy initialization: Only connect when the function is actually called.
  if (!clientPromise) {
    if (process.env.NODE_ENV === "development") {
      // In development, import the global promise or create a new one
      if (!global._mongoClientPromise) {
        const client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
      }
      clientPromise = global._mongoClientPromise;
    } else {
      // In production, create a module-scoped promise
      const client = new MongoClient(uri, options);
      clientPromise = client.connect();
    }
  }

  try {
    const client = await clientPromise;
    return client.db(dbName);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};