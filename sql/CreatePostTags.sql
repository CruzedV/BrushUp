INSERT INTO tags (tag_id, name, color) VALUES
  (uuid_generate_v4(), 'Рисунок карандашом', '#A9A9A9'),
  (uuid_generate_v4(), 'Цифровое рисование', '#FF4500'),
  (uuid_generate_v4(), 'Живопись', '#8A2BE2'),
  (uuid_generate_v4(), 'Акварель', '#1E90FF'),
  (uuid_generate_v4(), 'Масло', '#FFD700'),
  (uuid_generate_v4(), 'Анатомия', '#DC143C'),
  (uuid_generate_v4(), 'Перспектива', '#32CD32'),
  (uuid_generate_v4(), 'Композиция', '#FF69B4'),
  (uuid_generate_v4(), 'Портрет', '#8B4513'),
  (uuid_generate_v4(), 'Фигурное рисование', '#4682B4')
ON CONFLICT (name) DO NOTHING;