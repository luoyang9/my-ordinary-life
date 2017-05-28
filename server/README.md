# Database Schema

## Event
| Field | Type | NOT NULL | Primary | AUTO INCREMENT |
| --- | --- | --- | --- | --- |
| _id | INT UNSIGNED | true | x | x |
| user_id | INT UNSIGNED | true |  |  |
| title | VARCHAR(140) | true |  |  |
| content | TEXT | true |  |  |
| date | DATETIME | true |  |  |

## User
| Field | Type | NOT NULL | Primary | AUTO INCREMENT |
| --- | --- | --- | --- | --- |
| _id | INT UNSIGNED | true | x | x |
| email | VARCHAR(20) | true |  |  |
| secret | TEXT | true |  |  |

