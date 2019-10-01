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
    
    // if (!userData) {
	// 	response.status(400).json({message: "The user with the specified ID does not exist."});
	// } else {
    userData
        .find()
        .then(user => {
            response.send(user);
        })
        .catch(error => {
			response.status(500).json({ error: 'The users information could not be retrieved.' })

        });
	
})


server.get("/api/users/:id", (request, response) => {
    
    const id = request.params.id; // params is an object with all the url parameters

    // if (!userData.id) {
	// 	response.status(400).json({message: "The user with the specified ID does not exist."});
	// } else {
    userData
    	.findById(id)
    	.then(user => {
    		if (user) {
    			response.status(200).json(user);
    		} else {
    			response.status(404).json({
    				message: `The user doesn't exist with given ID`
    			});
    		}
    	})
    	.catch(error => {
    		response.status(500).json({
    			error: "The user information could not be retrieved."
    		})
    	});
// 	 } else {
// 		 	response.status(400).json({message: "The user with the specified ID does not exist."});
	 	 
})
// })



//add a user
server.post("/api/users", (request, response) => {
    // const {name, bio} = = req.body;
 
    const userInfo= request.body;
    // console.log("user info", userInfo);

    if (!userInfo.name || !userInfo.bio) {
		response.status(400).json({ errorMessage: 'Please provide name and bio for the user.' });
	} else {
    userData
        .insert(userInfo)
        .then(user => {
            response.status(201).json(user);
        })
        .catch(error => {
			response.status(500).json({ error: 'There was an error while saving the user to the database' });
        });
	}
})


/*
 if (name || bio) {
    userData.insert(req.body)
      .then(user => {
        response.status(201).json(user);
      })
      .catch(() => {
        response.status(500).json({ error: "Error in creating an user in database" });
      });
  } else {
    response.status(400).json({ message: "Please provide name and bio for the user." });
  }
}); */




//delete a user
server.delete("/api/users/:id", (request, response) => {
	//axios.delete("/users/2")

	const id = request.params.id; // params is an object with all the url parameters

	if (userData) {
	
	userData
		.remove(id)
		.then(user => {
			//send the hub back to the client
			response.json(user); //.json()  will set the right headers and convert to JSON
		})
		.catch(error => {
			response.status(500).json({message: "The user could not be removed"});
		});
	} else {
		response.status(400).json({message: "The user with the specified ID does not exist."});

	}
});

/*userData
		.remove(id)
		.then(user => {
			if (user) {
			//send the hub back to the client
			response.json(user); //.json()  will set the right headers and convert to JSON
		} else {
			response.status(400).json({message: "The user with the specified ID does not exist."});
	
		}
		})
		.catch(error => {
			response.status(500).json({message: "The user could not be removed"});
		});
	
}); */




// updating a user
server.put("/api/users/:id", (request, response) => {
	//axios.put("/hubs/2")
	const id = request.params.id; // params is an object with all the url parameters
	const changes = request.body;

	if (!changes.name || !changes.bio) {
		response.status(400).json({ errorMessage: 'Please provide name or bio for the user.' });
	} else {
	userData
		.update(id, changes)
		.then(user => {
			if  (user) {
			//send the hub back to the client
			response.status(200).json(user); //.json()  will set the right headers and convert to JSON
		} else {
			res
			  .status(404)
			  .json({
				message: 'The user with the specified ID does not exist.',
			  });
		  }
		})
		.catch(error => {
			response.status(500).json({message: "The user could not be modified"});
		});
	}
});

// server.put("/api/users/:id", (req, res) => {
// 	const { name, bio } = req.body;
  
// 	if (name || bio) {
// 	  userData.update(req.params.id, req.body)
// 		.then(user => {
// 		  if (user) {
// 			res.status(200).json(user);
// 		  } else {
// 			res
// 			  .status(404)
// 			  .json({ message: "The user doesn't exist with that ID" });
// 		  }
// 		})
// 		.catch(() => {
// 		  res.status(500).json({ error: "The user couldn't be updated" });
// 		});
// 	} else {
// 	  res
// 		.status(400)
// 		.json({ message: "Please provide name and bio for the user" });
// 	}
//   });

