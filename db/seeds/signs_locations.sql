DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS signs;

CREATE TABLE locations(
  id SERIAL PRIMARY KEY,
  boro VARCHAR(50),
  order_no VARCHAR(100),
  main_st VARCHAR(200),
  from_st VARCHAR(200),
  to_st VARCHAR(200),
  sos VARCHAR(50)
);

CREATE TABLE signs(
  id SERIAL PRIMARY KEY,
  SRP_Boro VARCHAR(50),
  SRP_Order VARCHAR(100),
  SRP_seq VARCHAR(200),
  SR_Distx VARCHAR(200),
  SR_Arrow VARCHAR(200),
  Sign_description VARCHAR(3000000),
  SR_Mutcd_Code VARCHAR(50)
);

-- absolute file paths necessary
COPY locations
  (boro, order_no, main_st, from_st, to_st, sos)
FROM '/Users/dylanmoylan/Downloads/locations.CSV'
  DELIMITER ',' CSV;

COPY signs
  (SRP_Boro, SRP_Order, SRP_seq, SR_Distx, SR_Arrow, Sign_description, SR_Mutcd_Code)
FROM '/Users/dylanmoylan/Downloads/signs.CSV'
  DELIMITER ',' CSV;
