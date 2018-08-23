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
const port = process.env.PORT || 3002;


app.use(express.static('client/dist'));
app.use(express.json());

//API SUPPORTING CURRENT FRONT_END FEATURES
app.get('/api/projects/:projectId/campaign/tiers', getTiers);
app.get('/api/projects/:projectId/campaign/details', getAboutSections);

//EXTENDED CRUD API
app.post('/api/projects/:projectId/campaign/tiers/new', postTier);
app.put('/api/projects/:projectId/campaign/details/:sectionId', updateAboutSection);
app.delete('/api/projects/:projectId/campaign/tiers/:tierId', deleteTier);

app.listen(port, () => console.log('Listening at ' + port));

module.exports = app;
