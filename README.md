1. create docker.env ประกอบไปด้วย
MYSQL_ROOT_PASSWORD:
MYSQL_DATABASE:
MYSQL_USER:
MYSQL_PASSWORD:

2. create .env ใน Folder src ประกอบไปด้วยข้อมูลจากข้างบน docker.env

DATABASE_URL="mysql://root:MYSQL_ROOT_PASSWORD@envcard-mysql:3306/MYSQL_DATABASE"

MYSQL_HOST=envcard-mysql

MYSQL_PORT=3306

MYSQL_USER=MYSQL_USER

MYSQL_PASSWORD=MYSQL_PASSWORD

MYSQL_DB=MYSQL_DATABASE

SESSION_SECRET=  อะไรก้อได้

4. start service โดย run ใน terminal
```bash
# start ครั้งแรก ต้อง migrate + seeding เสมอ
docker compose --profile dev-fresh up -d

# start ครั้งหลัง ไม่ต้อง seed
docker compose --profile dev-update up -d

# start production
docker compose --profile fresh up -d

# start production ครั้งหลัง ไม่ต้อง seed
docker compose --profile prod-update up -d
```
