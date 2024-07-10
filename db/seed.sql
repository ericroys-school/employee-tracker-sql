insert into department (id, name) values 
('78b57f82-e53d-4a2a-8847-fdb5d942fa25', 'Engineering'),
('7225119c-26c2-4e43-a490-4e8c3d37a786', 'Quality Assurance'),
('a1ebfdc7-92e1-4e97-9b85-ef2d23e2bc29', 'Operations'),
('668036fb-345a-4157-affb-3534f9e10ea6', 'Bean Counters'),
('dd6e35ba-d91a-45ff-ad13-0fac598c727f', 'Artistry'),
('7e9903fc-512f-4204-aa92-ffc0158ba212', 'Food Service');

insert into role (id, title, salary, dept_id) values
('ba993d2a-f325-99c2-a57b-4bd3944d799e', 'Lead', 75000.02, '78b57f82-e53d-4a2a-8847-fdb5d942fa25'),
('bb993b2a-f3b5-99b2-a57b-4bd3944bb99f', 'Secretary', 97723.43, '78b57f82-e53d-4a2a-8847-fdb5d942fa25'),
('3c5d77f7-83fb-4cd6-bd3b-d8e74cc459f3', 'Janitor', 197723.43, '78b57f82-e53d-4a2a-8847-fdb5d942fa25'),
('afc37c76-8d2e-41ca-90ed-09bbcb618653', 'Mop Artist', 175000.02, '7225119c-26c2-4e43-a490-4e8c3d37a786'),
('1f928250-ceb9-468e-95a7-4321a8f6ccb6', 'Driver', 9723.43, '7225119c-26c2-4e43-a490-4e8c3d37a786'),
('20c0a282-46df-4266-8eac-41f1f94828b1', 'Planet Engineer', 23.43, '7225119c-26c2-4e43-a490-4e8c3d37a786');


insert into employee (id, first_name, last_name, role_id, manager_id) values
('b2789942-baba-4621-99a2-bc97f6888649', 'bob', 'builder', 'afc37c76-8d2e-41ca-90ed-09bbcb618653', 'c120c3ba-5931-45d6-bdfd-a9cf2eb07579' ),
('c120c3ba-5931-45d6-bdfd-a9cf2eb07579', 'mary', 'button', 'ba993d2a-f325-99c2-a57b-4bd3944d799e', NULL),
('36992116-03f7-4ff0-b0ef-f55081f300d6', 'tyvek', 'suit', '20c0a282-46df-4266-8eac-41f1f94828b1', 'b2789942-baba-4621-99a2-bc97f6888649');