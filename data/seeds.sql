-- INSERT INTO role (title, salary, department_id)
-- VALUES ("Recruiter", 118000, 5);
-- SELECT * FROM department;

-- SELECT * FROM role;

-- update role
-- set salary = 100000
-- where id=1;

-- delete from department
-- where id=7;

/* SELECT employee.id, first_name, last_name, title,  name as department_name, manager_id, salary FROM role JOIN department ON role.department_id=department.id RIGHT JOIN employee ON role.id=employee.role_id  ;  */

-- INSERT INTO employee_tracker_db.employee (first_name, last_name, role_id, manager_id  )
-- VALUES ("Tatiana ", "Odonnell", 6,3),("Joseph ", "Cisneros", 5,2),("Neil ", "Parker", 4,2),("Mila ", "Hall", 3,1),("Everett ", "Vargas", 2,2),("Makenzie ", "Goodwin", 1,3),("Leanna ", "Haney", 2,1),("Charlize ", "Phillips", 4,3);

-- INSERT INTO employee_tracker_db.employee (first_name, last_name, role_id  )
-- VALUES ("Leland ", "Glover", 9),("Zoie ", "Chang", 8),("Valerie ", "Sharp", 7);