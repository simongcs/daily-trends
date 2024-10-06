build:
	npm run build
test:
	npm run test
start:
	npm run start
dbuild:
	docker compose up -d --build --force-recreate
clear:
	rm -rf /dist