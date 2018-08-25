const { pool } = require('../db-postgres/index');

pool.connect(()=>console.log('connected to postgres'));


const getAboutContents = (projectId, projectName, callback) => {
	let query = null;

	if (projectId) query = 'SELECT * FROM abouts where project_id = ' + projectId;
	else if (projectName) query = 'SELECT * FROM abouts INNER JOIN projects where projects.name = ' + projectName;

	pool.query(query, (err, res) => {
		callback(err, res);
	});

};

const getTiers = (projectId, projectName, callback) => {
	let query = null;

	if (projectId) query = 'SELECT * FROM tiers where project_id = ' + projectId;
	else if (projectName) query = 'SELECT * FROM tiers INNER JOIN projects where projects.name = ' + projectName;

	pool.query(query, (err, res) => {
		callback(err, res);
	});
};

const postNewTier = ({projectId}, params, callback) => {
	let query = 
	`INSERT INTO tiers
	(project_id, reward, description, base_pledge_amount, delivery_date, ship_to, max_backers) 
	VALUES ($1, $2, $3, $4, $5, $6, $7)`;
	let values = [projectId, params.reward, params.description, params.basePledge, params.deliveryDate, params.shipTo, params.maxBackers];
	
	pool.query(query, values, (err, res) => {
		callback(err, res);
	});
}

const editAbout = ({projectId, sectionId}, {sectionType, content}, callback) => {
	let query = 'UPDATE abouts SET section_type = $1, content = $2, project_id = $3 WHERE id = $4';
	let values = [sectionType, content, projectId, sectionId];
	
	pool.query(query, values, (err, res) => {
		callback(err, res);
	});
};

const deleteTier = ({tierId}, callback) => {
	let query = 'DELETE FROM tiers WHERE id = ' + tierId + 'returning *';
	
	pool.query(query, (err, res) => {
		callback(err, res);
	});
};

module.exports = {
	getAboutContents,
	getTiers,
	postNewTier,
	editAbout,
	deleteTier
}
