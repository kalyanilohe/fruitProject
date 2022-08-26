const mongoose=require('mongoose');

//connecting to mongodb database and this will create database fruitDb if not existed already
mongoose.connect("mongodb://localhost:27017/fruitDB", {useUnifiedTopology:true}); 

//creating schema for fruits collection
const fruitSchema=new mongoose.Schema ({
	name: {
		type: String,
		required:[1,"please add name"]
	},
	rating:{
		type:Number,
		min:1,
		max:10
	       },
	review:String
});
//using created schema to create mongoose model
const Fruits=mongoose.model("Fruits", fruitSchema); //creating collection Fruit and applying fruitschema
const apple=new Fruits({
        name:"Apple",
		rating:9,
		review: "great fruit"
});

//creating documents
/*const apple=new Fruits({
        name:"Apple",
		score:8,
		review: "great fruit"
});const orange=new Fruits({
        name:"Orange",
		score:11,
		review: "great fruit"
});const banana=new Fruits({
        name:"Banana",
		score:12,
		review: "great fruit"
});
Fruits.insertMany([apple,orange,banana],function(err){
	if(err){
		console.log(err)
	}else{
		console.log("successfully added fruits")
	}
});*/

Fruits.find(function(err,fruits){
	if(err){
		console.log(err)
	}else{
		//console.log(fruits)
        mongoose.connection.close();

		fruits.forEach(function(fruit){
			console.log(fruit.name);
		});
	}
});

Fruits.updateOne({name:"Banana"},{rating:8},function(err){
	if(err){
		console.log(err)
	}else{
		console.log("success")
	}
});

Fruits.deleteMany({name:"Apple"},function(err){
	if(err){
		console.log(err)
	}else{
		console.log("successfully deleted one")
	}
});



// save is the method to save the document in collection but it will keep saving the same document again n again every time u run
//apple.save();

//creating schema for peoples collection
const peopleSchema=new mongoose.Schema ({
	name:String,
	age:Number,
	favFruit: fruitSchema
});

//use created schema to ceate mongoose collection
const persons=mongoose.model("persons",peopleSchema);

const pineapple=new Fruits({
	name:"Pineapple",
	score:9,
	review:"nice fruit"
});
pineapple.save();

//create document
const person1=new persons({
	name:"abhi",
	age:25,
	favFruit:pineapple
});

person1.save();



const findDocuments=function(db, callback){

	const collection=db.collection('fruits');

	collection.find({}).toArray(function(err,fruits){
		assert.equal(err,null);
		console.log("found the following records");
		console.log(fruits);
		callback(fruits);
	});
};