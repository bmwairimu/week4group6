// let path = require('path');
// let fs = require('fs');

// function route(handle, pathname, response, request){
//    console.log("About to route a request for " + pathname);
//    // Check if the request url is a function. since we mapped the our expected request urls to a function in request handlers
//    if (typeof handle[pathname]==='function'){
//         handle[pathname](response)
//    }else if (pathname.match("\.css$")){
//        let cssPath = path.join(__dirname, 'public', pathname);
//        let cssStream = fs.createReadStream(cssPath);
//        response.writeHead(200, {"Content-Type": "text/css"})
//        cssStream.pipe(response)
//    }else if (pathname.match('\.png$') || pathname.match('\.jpg$')){
//        let imagePath = path.join(__dirname, 'public', pathname);
//        let imageStream = fs.createReadStream(imagePath);
//        response.writeHead(200, {"Content-Type": "text/png"});
//        imageStream.pipe(response);
//    }else if (pathname.match('\.js$')){
//        let jsPath = path.join(__dirname, 'public', pathname);
//        let jsStream = fs.createReadStream(jsPath)
//        response.writeHead(200, {"Content-Type": "application/js"});
//        jsStream.pipe(response);

//    }else{
//        console.log("No request handler found for " + pathname);
//        response.writeHead(404, {"Content-Type": "text/html"});
//        response.write("<h1>404 Not found</h1>");
//        response.end();
//    }
// }

// exports.route = route;

const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const uri =
	"mongodb+srv://dbadmin:safaricom1234@test-app.kzkdify.mongodb.net";
const client = new MongoClient(uri);
const routes = express.Router();

routes.get("/", (req, res) => {
	res.render("index");
});

// Write route code to store contact us submit form in mongo db
routes.post("/contact", async (req, res) => {
	try {
		const { name, email, message } = req.body;
		const database = client.db("myFirstDatabase");
		const collection = database.collection("contacts");
		const contactDoc = {
			name,
			email,
			message,
		};

		const result = await collection.insertOne(contactDoc);

		console.log(`A document was inserted with the _id: ${result.insertedId}`);

		return res.status(200).json({
			message: "Saved successfully",
			contact: contact,
		});
	} catch (error) {
		console.log(error);
	} finally {
		await client.close();
	}
});

module.exports = routes;