import { MongoClient } from "mongodb";

// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://volodya:df1M6UMhNw9b8HLa@mycluster.0uejs1l.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meeutpsCollection = db.collection("meetups");

    await meeutpsCollection.insertOne({ data });

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
