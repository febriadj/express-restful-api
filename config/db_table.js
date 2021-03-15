module.exports = {
  employee: function() {
    return new Promise((resolve, reject) => {
      resolve(` 
      CREATE TABLE IF NOT EXISTS employee (
        nik int(10) PRIMARY KEY AUTO_INCREMENT,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        position ENUM('backend', 'frontend', 'ui designer', 'ux designer', 'it consultant')
      ) ENGINE = InnoDb AUTO_INCREMENT = 1000000001
      `)
    })
  },
  employee_details: function() {
    return new Promise((resolve, reject) => {
      resolve(`
      CREATE TABLE IF NOT EXISTS employee_details (
        nik_employee INT(10) AUTO_INCREMENT NOT NULL,
        full_name VARCHAR(150) NOT NULL,
        date_of_birth DATE,
        gender ENUM('male', 'female'),
        residence TEXT,
        salary BIGINT DEFAULT 0 NOT NULL,
        join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        FOREIGN KEY(nik_employee) REFERENCES employee(nik) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE = InnoDb AUTO_INCREMENT = 1000000001
      `)
    })
  } 
}