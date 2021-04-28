DROP TABLE recorded_deaths;

CREATE TABLE recorded_deaths (
	status TEXT,
	elevation INT NOT NULL,
	name TEXT,
	country TEXT,
	coordinates TEXT,
	location TEXT,
	year INT NOT NULL,
	type TEXT,
	vei TEXT,
	total_deaths_description TEXT
);

SELECT * from recorded_deaths;