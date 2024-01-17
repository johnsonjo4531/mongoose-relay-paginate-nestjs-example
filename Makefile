go:
	$(MAKE) -j docker run

docker:
	docker compose -p mongoose-relay-paginate-example up

run:
	npm run start