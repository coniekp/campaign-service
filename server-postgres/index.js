require('newrelic');
const {  
        getTiers, 
        getAboutSections, 
        postTier, 
        updateAboutSection, 
        deleteTier
      } = require('./controller.js');
const express = require('express');
const app = express();


//app.use(express.static('client/dist'));
app.use(express.json());

app.use(express.static('server-postgres'));

//API SUPPORTING CURRENT FRONT_END FEATURES
app.get('/api/projects/:projectId/campaign/tiers', getTiers);
app.get('/api/projects/:projectId/campaign/details', getAboutSections);

//EXTENDED CRUD API
app.post('/api/projects/:projectId/campaign/tiers/new', postTier);
app.put('/api/projects/:projectId/campaign/details/:sectionId', updateAboutSection);
app.delete('/api/projects/:projectId/campaign/tiers/:tierId', deleteTier);

app.listen(3002, () => console.log('Listening at ' + 8080));

module.exports = app;
