insert into department (id, name) values 
('78b57f82-e53d-4a2a-8847-fdb5d942fa25', 'Dept 1'),
('7225119c-26c2-4e43-a490-4e8c3d37a786', 'Dept 2'),
('a1ebfdc7-92e1-4e97-9b85-ef2d23e2bc29', 'Dept 3'),
('668036fb-345a-4157-affb-3534f9e10ea6', 'Dept 4'),
('dd6e35ba-d91a-45ff-ad13-0fac598c727f', 'Dept 5'),
('7e9903fc-512f-4204-aa92-ffc0158ba212', 'Dept 6'),
('726c6be6-9e2f-42bf-99e5-9ef36f882cfc', 'Dept 7'),
('b8544fc7-3e9a-4d4a-8a34-80e33070966f', 'Dept 8'),
('6fe9f0ab-f45a-472e-92e2-90909d5641a5', 'Dept 9'),
('95fe4049-a354-4d72-9a21-70dcf872a126', 'Dept 10'),
('898da5fd-5382-489c-b5e1-c7cfe7fb922f', 'Dept 11'),
('8a3dd24b-b6f4-4224-8267-135c272b84f0', 'Dept 12'),
('faf0e2b9-a6df-4919-aa97-93d8f7d21da3', 'Dept 13'),
('ffedd37c-edc3-4072-8bb8-5ebb5ff17580', 'Dept 14'),
('fdc62e56-acae-4b50-ba12-b2a4a9736d5a', 'Dept 15');

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