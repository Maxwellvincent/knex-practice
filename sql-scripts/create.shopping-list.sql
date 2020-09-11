Drop Table IF EXISTS shopping_list;
CREATE TABLE IF NOT EXISTS shopping_list (
    item_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name Text Not Null,
    price decimal(12,2) NOT NULL,
    category grocery NOT NULL,
    checked BOOLEAN DEFAULT false Not Null,
    date_added TIMESTAMP DEFAULT now() NOT NULL
);

Drop Type IF EXISTS grocery;
CREATE Type grocery AS Enum (
    'Main',
    'Snack',
    'Lunch',
    'Breakfast'
);