import { createServer } from 'http';

const PORT = 8000;

const Users = [
{id:1, name:'John Doe'},
{id:2, name:'Raman Kumar'},
{id:3, name:'Pardeep kumar'},
{id:4, name:'Nushant kumar'},
{id:5, name:'Vishal'},
{id:6, name:'Inderjit singh'},
{id:7, name:'Ram '},
{id:8, name:'Vikram'},
{id:9, name:'Gurpreet Singh'},
{id:10, name:'Kajal'},
{id:11, name:'shweta'},
{id:12, name:'Rajdeep'},
];


//logger middleware


const logger= (req,res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
  }


//json middleware


const jsonMiddleware = (req,res, next) =>{
    res.setHeader('Content-Type', 'application/json');
    next();

}
//route handle for GET /api/users

const getUserHandler = (req, res)=>{

  res.write(JSON.stringify(Users));
  res.end();

  }

  // Route handle for GET /api/users/:id
    const getUserByIdHandler = (req, res) =>{
       const id = req.url.split('/')[3];
             const user = Users.find((user) => user.id === parseInt(id));

                if(user){
                    res.write(JSON.stringify(user));


                      // res.setHeader('Content-Type', 'application/json');

              //      res.end();
               }
               else{

                         res.statusCode = 404;
                         res.write(JSON.stringify({message: 'User Not Found'}));
                   // res.setHeader('Content-Type', 'application/json');

                               //res.end();


               }



                     res.end();
                      }




  //Not Found Users

//  const notFoundHandler = (req, res) => {
//    res.statusCode = 404;
//    res.write(JSON.stringify({message: 'Route not Found'}));
//    res.end();
//
//  }


  // not found handler

  const notFoundHandler = (req,res) => {
    res.statusCode = 404;
                  res.write(JSON.stringify({message: 'Route Not Found'}));
                  res.end();

  }


  // create the post method for userHandler

  const createUsersHandler = (req, res) => {
  let body = '';

  //listen for data

  req.on('data', (chunk)=>{
  body += chunk.toString();
  });
  req.on('end', ()=>{
  const newUser = JSON.parse(body);
  Users.push(newUser);
  res.statusCode = 201;
  res.write(JSON.stringify(newUser));
  })

  }

  //create the put method for userHandle


const dataPut = (req, res) => {
    if (req.method !== 'PUT') {
        res.statusCode = 405;
        res.write(JSON.stringify({ error: 'Method not allowed' }));
        res.end();
        return;
    }

    let body = '';

    // Listen for incoming data chunks
    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () => {
        try {
            const updatedUser = JSON.parse(body);

            // Assume `id` is passed in the request and matches a user in the array
            const userId = updatedUser.id;
            const userIndex = Users.findIndex((user) => user.id === userId);

            if (userIndex === -1) {
                res.statusCode = 404;
                res.write(JSON.stringify({ error: 'User not found' }));
                res.end();
                return;
            }

            // Update the user in the array
            Users[userIndex] = { ...Users[userIndex], ...updatedUser };

            res.statusCode = 200;
            res.write(JSON.stringify(Users[userIndex]));
            res.end();
        } catch (error) {
            res.statusCode = 400;
            res.write(JSON.stringify({ error: 'Invalid JSON or missing fields' }));
            res.end();
        }
    });
};


const server = createServer((req, res) => {
logger(req, res, ()=> {
  jsonMiddleware(req, res, () =>{
  if(req.url === '/api/Users' && req.method === 'GET'){

  getUserHandler(req,res);
  }
  else if(req.url.match(/\/api\/Users\/([0-9]+)/) && req.method == 'GET'){
        getUserByIdHandler(req,res);
  }else if(req.url ==='/api/Users' && req.method === 'POST'){
  createUsersHandler(req,res);
  }else if(req.url ==='/api/Users' && req.method === 'PUT'){
     dataPut(req,res);
     }

  else{
  notFoundHandler(req,res);
  }
  })
});
});


 server.listen(PORT, () => {
 console.log(`server running on port ${PORT}`);
});
