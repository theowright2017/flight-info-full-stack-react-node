# flight-info-full-stack-react-node

For this web app I have used MongoDb as the database.  

To seed the database, use the following steps:

  1)  Clone the repo, move the following file to your Desktop  --   flighdata_B copy.csv
  
  
  2)  Be sure to have MongoDb installed, run the Mongod server
  
  
  3)  Using MongoDb Compass https://www.mongodb.com/products/compass , create a new database called 
      'flightInfo' and a new collection within called 'flights'
  
  
  4)  Using the following terminal command (Mac), you can import the CSV directly
      into your MongoDb.  Be sure to amend the command where needed if your file directory is different:
      
      mongoimport --db flightInfo --collection flights --type csv --headerline --file /Users/user/Desktop/flighdata_B.csv
