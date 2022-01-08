-- I know I should have done this in a more condensed format, but i got this mock data from https://www.mockaroo.com/ and I just copied and pasted it in the format it gave me

insert into departments (department_name) values ('Human Resources');1
insert into departments (department_name) values ('Accounting');2
insert into departments (department_name) values ('Research and Development');3
insert into departments (department_name) values ('Sales');4
--good


insert into roles (department_id, title, salary) values (3, 'Graphic Designer', '67000.00');
insert into roles (department_id, title, salary) values (3, 'Programmer', '58000.00');
insert into roles (department_id, title, salary) values (3, 'Engineer', '133000.00');
insert into roles (department_id, title, salary) values (4, 'Quality Control Specialist', '130000.00');
insert into roles (department_id, title, salary) values (1, 'Operator', '68000.00');
insert into roles (department_id, title, salary) values (1, 'Recruiter', '51000.00');
insert into roles (department_id, title, salary) values (4, 'Sales Associate', '43000.00');
insert into roles (department_id, title, salary) values (2, 'Tax Accountant', '46000.00');
insert into roles (department_id, title, salary) values (3, 'Head of R and D', '144000.00');
insert into roles (department_id, title, salary) values (4, 'Sales Manager', '100000.00');
insert into roles (department_id, title, salary) values (1, 'Human Resource Manager', '107000.');
insert into roles (department_id, title, salary) values (2, 'Head of Accounting', '98000.00');

--good




insert into employees (first_name, last_name, role_id, manager_id) values ('Claudius', 'Cobello', 9, 1); 
insert into employees (first_name, last_name, role_id, manager_id) values ('Karin', 'Mahedy', 1, 7);
insert into employees (first_name, last_name, role_id, manager_id) values ('Edythe', 'Lochhead', 10, 3); 
insert into employees (first_name, last_name, role_id, manager_id) values ('Venus', 'Stent', 4, 1);
insert into employees (first_name, last_name, role_id, manager_id) values ('Dorree', 'Tribe', 11, 5);
insert into employees (first_name, last_name, role_id, manager_id) values ('Stacy', 'Lunk', 5, 3);
insert into employees (first_name, last_name, role_id, manager_id) values ('Augustina', 'Vader', 12, 7); 
insert into employees (first_name, last_name, role_id, manager_id) values ('Marcella', 'Huchot', 4, 1);
insert into employees (first_name, last_name, role_id, manager_id) values ('Urbanus', 'Owain', 7, 1);
insert into employees (first_name, last_name, role_id, manager_id) values ('Teddy', 'Goodison', 3, 7);
insert into employees (first_name, last_name, role_id, manager_id) values ('Erda', 'Eger', 1, 7);
insert into employees (first_name, last_name, role_id, manager_id) values ('Alexa', 'Baddam', 2, 7);
insert into employees (first_name, last_name, role_id, manager_id) values ('Afton', 'Stearndale', 6, 3);
insert into employees (first_name, last_name, role_id, manager_id) values ('Dori', 'Serck', 8, 5);
insert into employees (first_name, last_name, role_id, manager_id) values ('Purcell', 'Esparza', 8, 5);
insert into employees (first_name, last_name, role_id, manager_id) values ('Lena', 'Sahnow', 1, 7);
insert into employees (first_name, last_name, role_id, manager_id) values ('Winfield', 'Van de Vlies', 7, 1);
insert into employees (first_name, last_name, role_id, manager_id) values ('Caye', 'Ozintsev', 3, 7);
insert into employees (first_name, last_name, role_id, manager_id) values ('Nelli', 'Gallop', 5, 3);
insert into employees (first_name, last_name, role_id, manager_id) values ('Kale', 'Plail', 6, 3);