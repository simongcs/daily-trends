install:
	npm install
dev:
	npm run start:dev
build-ts:
	npm run build
test:
	npm run test
start:
	npm run start
build:
	docker compose build
run:
	docker compose up -d
clear:
	rm -rf /dist