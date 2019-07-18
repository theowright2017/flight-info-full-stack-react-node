# flight-info-full-stack-react-node

For this web app I have used MongoDb as the database.  

To seed the database, use the following steps:

  1)  Clone the repo, move the following file to your Desktop  --   flighdata_B copy.csv
  
  
  2)  Be sure to have MongoDb installed https://docs.mongodb.com/manual/installation/, in terminal, run
      the command 'mongod' to start the database server
  
  
  3)  Using MongoDb Compass https://www.mongodb.com/products/compass , create a new database called 
      'flightInfo' and a new collection within called 'flights'
  
  
  4)  Using the following terminal command (Mac), you can import the CSV directly
      into your MongoDb.  Be sure to amend the command where needed if your file directory is different:
      
      mongoimport --db flightInfo --collection flights --type csv --headerline --file /Users/user/Desktop/flighdata_B.csv



Be sure to have the following installed:

  --  React.js
  --  Node.js
  --  MongoDb
  --  Express
  
  
To run the web app itself, perform the following steps:

  1)  Once the repo has been cloned and above steps have been followed, ensure mongod is running on server
  2)  In terminal, in 'server' folder, use command 'run server:dev' -- api is hosted on localhost:3000/api/flights
  3)  Then use use command 'npm start' this will run front end on localhost:8080
  

  
