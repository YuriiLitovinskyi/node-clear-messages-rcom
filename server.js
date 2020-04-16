const url = 'mongodb://localhost:27017/DBClientsPPK';

const MongoClient = require('mongodb').MongoClient;

const clearMessages = () => {
    MongoClient.connect(url, async (err, db) => {
        if(err) {            
            console.log('No connection to Database! Please start MongoDB service on default port 27017!');
            console.log(' ');           
            
            console.log(err);
            await sleep(15000);
        };
    
        console.log(`Switched to ${db.databaseName} database`);
    
        db.collection('Messages', async (err, collection) => {
            if(err) {
                console.log(err);
                await sleep(15000);
            };
    
            collection.remove({}, async (err, result) => {
                if(err) {
                    console.log(err);
                    await sleep(15000);
                };
    
                console.log(`Collection Messages is deleted! Result: ${result}`);
                db.close();

                await sleep(10000);
            });
        });
    });
};

const sleep = (timeout) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);        
    });
};

clearMessages();
