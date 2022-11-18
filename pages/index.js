import Head from "next/head";

import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name='description' content='Browse a huge list of highly active React meetups!' />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://volodya:df1M6UMhNw9b8HLa@mycluster.0uejs1l.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meeutpsCollection = db.collection("meetups");

  const meetups = await meeutpsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((mt) => ({
        title: mt.data.title,
        address: mt.data.address,
        image: mt.data.image,
        id: mt._id.toString(),
      })),
    },
    revalidate: 10,
  };
}
