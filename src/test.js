import { MongoClient } from 'mongodb';
// Connection URI
const uri = 'tuconexion';
// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function run() {
  try {
    await client.connect();
    await client.db('tu_usuario').command({ ping: 1 });
    console.log('Connected successfully to server');
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
