CREATE TABLE projects (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50)
);

CREATE TABLE abouts (
	id SERIAL PRIMARY KEY,
	project_id INTEGER,
	section_type VARCHAR(20),
	content TEXT
);

CREATE TABLE tiers (
  id SERIAL PRIMARY KEY,
  project_id INTEGER,
  reward VARCHAR (100),
  description TEXT,
  base_pledge_amount INTEGER,
  delivery_date DATE,
  ship_to VARCHAR (50),
  reward_quantity INTEGER
);

CREATE TABLE pledges (
  id SERIAL PRIMARY KEY, 
  tier_id INTEGER,
  user_id INTEGER,
  pledge_amount INTEGER,
  ship_to VARCHAR(8)
);


COPY projects (name) 
FROM 'projects.csv' 
DELIMITER ',' CSV HEADER;

COPY abouts (project_id, section_type, content) 
FROM 'abouts.csv' 
DELIMITER ',' CSV HEADER;

COPY tiers (project_id, reward, description, base_pledge_amount, delivery_date, ship_to, reward_quantity) 
FROM 'tiers.csv' 
DELIMITER ',' CSV HEADER;

COPY pledges (tier_id, user_id, pledge_amount, ship_to) 
FROM 'pledges.csv' 
DELIMITER ',' CSV HEADER;


CREATE INDEX project_id_idx 
ON projects USING btree(name);

CREATE INDEX project_id_abouts_b_idx 
ON abouts USING btree(project_id);

CREATE INDEX project_id_tiers_b_idx 
ON tiers USING btree(project_id);

CREATE INDEX tier_id_idx 
ON pledges USING btree(tier_id);


ALTER TABLE abouts 
ADD FOREIGN KEY (project_id) 
REFERENCES projects(id);

ALTER TABLE tiers 
ADD FOREIGN KEY (project_id) 
REFERENCES projects(id);

ALTER TABLE pledges 
ADD FOREIGN KEY (tier_id) 
REFERENCES tiers(id);
