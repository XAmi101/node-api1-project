// implement your API here


//npm i    //equivalent of yarn install
//npm i express
//npm run server

//visit localhost:8000

const express = require("express"); //CommonJS Modules, << his is the equivalent to the above

const userData = require("./data/db.js"); //<< require data access

const server = express();

//middleware
//teach express how to read JSON fro the request
server.use(express.json()); // <<<<<< we need this for POST and PUT

const port = 8080;
server.listen(port, () => console.log(`\n** API on Port $(port) **\n`));



/*   HTTP Requests below */



server.get("/", (request, response) => {
	// order matters the first argument is the request

	response.send("testing");
});


server.get("/api/users", (request, response) => {
    
    // if (!userData.name) {
	// 	response.status(400).json({ message: "gimme a name" });
	// } else {
    userData
        .find()
        .then(user => {
            response.send(user);
        })
        .catch(error => {
			response.send(error);
        });
    
})


server.get("/api/users/:id", (request, response) => {
    
    const id = request.params.id; // params is an object with all the url parameters

    // if (!userData.name) {
	// 	response.status(400).json({ message: "gimme a name" });
	// } else {
    userData
        .findById(id)
        .then(user => {
            response.send(user);
        })
        .catch(error => {
			response.send(error);
        });
    
})


//add a user
server.post("/api/users", (request, response) => {
    // const {name, bio}
 
    const userInfo= request.body;
    // console.log("user info", userInfo);

    // if (!userData.name) {
	// 	response.status(400).json({ message: "gimme a name" });
	// } else {
    userData
        .insert(userInfo)
        .then(user => {
            response.json(user);
        })
        .catch(error => {
			response.json({ message: "error saving hub" });
        });
    
})


//delete a user
server.delete("/api/users/:id", (request, response) => {
	//axios.delete("/users/2")

	const id = request.params.id; // params is an object with all the url parameters

	userData
		.remove(id)
		.then(user => {
			//send the hub back to the client
			response.json(user); //.json()  will set the right headers and convert to JSON
		})
		.catch(error => {
			response.json({ message: "error deleting hub" });
		});
});


//updating a user
server.put("/api/users/:id", (request, response) => {
	//axios.put("/hubs/2")
	const id = request.params.id; // params is an object with all the url parameters
	const changes = request.body;

	userData
		.update(id, changes)
		.then(user => {
			//send the hub back to the client
			response.json(user); //.json()  will set the right headers and convert to JSON
		})
		.catch(error => {
			response.json({ message: "error updating hub" });
		});
});