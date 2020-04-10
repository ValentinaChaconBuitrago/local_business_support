const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

function MongoUtils(){
  const mu = {};

  mu.connect = () => {
    const uri = "mongodb+srv://val:val@cluster0-wnneh.azure.mongodb.net/test?retryWrites=true&w=majority";

    const client = new MongoClient(uri,{useNewUrlParser: true }, { useUnifiedTopology: true });
    console.log("Connecting");
    //retorna una promesa
    return client.connect();
  };

  mu.getDocuments = (client) => {
    const collectionRestaurant = client.db("authentication").collection("users");
    console.log("Getting documents");
    //retorna una promesa
    return collectionRestaurant.find({}).toArray().finally(()=>{
      console.log("closing client");
      client.close();
    });
  };

  mu.getRestaurant = (client,id) => {
    const collectionRestaurant = client.db("web").collection("restaurants");
    console.log("Getting restaurant");
    //retorna una promesa
    return collectionRestaurant.find({ _id: ObjectId(id)}).toArray().finally(()=>{
      console.log("closing client");
      client.close();
    });
  };

  return mu;
}

module.exports = MongoUtils;