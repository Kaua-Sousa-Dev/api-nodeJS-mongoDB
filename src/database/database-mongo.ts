import mongoose from "mongoose";

mongoose.connect("mongodb+srv://kawan:s7EtS57WgrttpaXr@api-mongo.jdnwfyi.mongodb.net/")
mongoose.Promise = global.Promise

export = mongoose