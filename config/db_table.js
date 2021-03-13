module.exports = {
  anime: async function() {
    try {
      return await `create table if not exists employee (
        nik int(10) primary key auto_increment,
        first_name varchar(100) not null,
        last_name varchar(100) not null,
        position enum('backend', 'frontend', 'ui designer', 'ux designer', 'it consultant')
      ) engine = innodb auto_increment = 1000000001`
    }
    catch(err) {
      console.log(err)
    }
  },
  anime_details: async function() {
    try {
      return await `create table if not exists employee_details (
        nik_employee int(10) auto_increment not null,
        full_name varchar(150) not null,
        age date,
        gender enum('male', 'female'),
        residence text,
        salary bigint default 0 not null,
        join_date timestamp default current_timestamp not null,
        foreign key(nik_employee) references employee(nik) on delete cascade on update cascade
      ) engine = innodb auto_increment = 1000000001`
    }
    catch(err) {
      console.log(err)
    }
  } 
}