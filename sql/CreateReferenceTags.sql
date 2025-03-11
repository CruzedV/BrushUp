INSERT INTO imagetags (tag_id, name) VALUES
  (uuid_generate_v4(), 'Мужчина'),
  (uuid_generate_v4(), 'Женщина'),
  (uuid_generate_v4(), 'В действии'),
  (uuid_generate_v4(), 'Статичная'),
  (uuid_generate_v4(), 'Спереди'),
  (uuid_generate_v4(), 'Сбоку'),
  (uuid_generate_v4(), 'Сзади'),
  (uuid_generate_v4(), 'Другое'),
  (uuid_generate_v4(), 'В одежде')
  (uuid_generate_v4(), 'Без одежды')
ON CONFLICT (name) DO NOTHING;