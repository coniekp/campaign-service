const redis = require('redis')
const cache = redis.createClient(6379, '54.193.122.103');
const db = require('../db-postgres/controller');
const Log = require('log');

cache.on('connect', () => console.log('Connected to redis'));


const getTiers = (req, res) => {
  let { projectId } = req.params;
  let { projectName } = req.body;

 	cache.get(projectId , (err, cachedResults) => {
  	if (cachedResults) res.send(cachedResults);
    else {
    	db.getTiers(projectId, projectName, (err, results) => {
        if (err) {
          log.error(err);
          res.status(400).send();
        }
        else {
          let key = projectId;
          let val = JSON.stringify(results.rows);
          cache.set(key, val);
          res.send({'tiers': results.rows});
        }
	    });
	   }
	});
}


const getAboutSections = (req, res) => {
  let { projectId } = req.params;
  let { projectName } = req.body;
  cache.get(projectId, (err, cachedResults) => {
    if (cachedResults) res.send(JSON.parse(cachedResults));
    else {
      db.getAboutContents(projectId, projectName, (err, results) =>{
        if (err) {
          log.error(err);
          res.status(400).send();
        }
        else {
          let key = projectId;
          let val = JSON.stringify(results.rows);
          cache.set(key, val);
          res.send({'abouts': results.rows});
        }
      });
    }
  });
}


//EXTENDED CRUD API
const postTier = (req, res) => {
  db.postNewTier(req.params, req.body, (err, results) => {
    if (err) {
      log.error(err);
      res.status(500).send();
    }
    else {
      res.send(`Inserted ${results.rowCount} row(s)`);
    }
  });
}

const updateAboutSection = (req, res) => {
  db.editAbout(req.params, req.body, (err, results) => {
    if (err)  {
      log.error(err);
      res.status(500).send();
    }
    else {
      res.send(`Updated ${results.rowCount} row(s)`);
    }
  });
}

const deleteTier = (req, res) => {
  db.deleteTier(req.params, (err, results) => {
    if (err) {
      log.error(err);
      res.status(500).send();
    }
    else {
      res.send(`Deleted ${results.rowCount} row(s)`);
    }
  });
}


module.exports = {
  getTiers,
  postTier,
  deleteTier,
  getAboutSections,
  updateAboutSection,
}
