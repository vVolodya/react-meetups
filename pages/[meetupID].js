import Head from "next/head";

import { MongoClient, ObjectId } from "mongodb";

import MeetupDetail from "../components/meetups/MeetupDetails";

function MeetupDetails({ meetupData }) {
  return (
    <>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="description" content={meetupData.description} />
      </Head>
      <MeetupDetail
        image={meetupData.image}
        title={meetupData.title}
        address={meetupData.address}
        description={meetupData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://volodya:df1M6UMhNw9b8HLa@mycluster.0uejs1l.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meeutpsCollection = db.collection("meetups");

  const meetups = await meeutpsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupID: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const { meetupID } = context.params;

  const client = await MongoClient.connect(
    "mongodb+srv://volodya:df1M6UMhNw9b8HLa@mycluster.0uejs1l.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupID),
  });

  client.close();

  return {
    props: {
      meetupData: {
        title: selectedMeetup.data.title,
        description: selectedMeetup.data.description,
        address: selectedMeetup.data.address,
        image: selectedMeetup.data.image,
      },
    },
  };
}

export default MeetupDetails;
