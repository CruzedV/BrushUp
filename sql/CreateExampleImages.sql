-- Вставка изображения и привязка одного тега
WITH img AS (
  INSERT INTO imagereferences (image_url)
  VALUES ('http://localhost:3001/uploads/1.jpg')
  RETURNING reference_id
)
INSERT INTO referencetags (reference_id, tag_id)
SELECT img.reference_id, t.tag_id
FROM imagetags t, img
WHERE t.name = 'Женщина';

-- Два тега
WITH img AS (
  INSERT INTO imagereferences (image_url)
  VALUES ('http://localhost:3001/uploads/2.jpg')
  RETURNING reference_id
)
INSERT INTO referencetags (reference_id, tag_id)
SELECT img.reference_id, t.tag_id
FROM imagetags t, img
WHERE t.name IN ('Мужчина', 'Сбоку');

-- Ещё два тега
WITH img AS (
  INSERT INTO imagereferences (image_url)
  VALUES ('http://localhost:3001/uploads/3.jpg')
  RETURNING reference_id
)
INSERT INTO referencetags (reference_id, tag_id)
SELECT img.reference_id, t.tag_id
FROM imagetags t, img
WHERE t.name IN ('Женщина', 'Спереди');

-- Три тега
WITH img AS (
  INSERT INTO imagereferences (image_url)
  VALUES ('http://localhost:3001/uploads/4.jpg')
  RETURNING reference_id
)
INSERT INTO referencetags (reference_id, tag_id)
SELECT img.reference_id, t.tag_id
FROM imagetags t, img
WHERE t.name IN ('Мужчина', 'В одежде', 'Статичная');

-- Ещё три тега
WITH img AS (
  INSERT INTO imagereferences (image_url)
  VALUES ('http://localhost:3001/uploads/5.jpg')
  RETURNING reference_id
)
INSERT INTO referencetags (reference_id, tag_id)
SELECT img.reference_id, t.tag_id
FROM imagetags t, img
WHERE t.name IN ('Женщина', 'Без одежды', 'Сбоку');