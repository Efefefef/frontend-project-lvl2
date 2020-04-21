install:
	npm install

build:
	npx babel src --out-dir dist

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npx jest

test-coverage:
	npx jest --coverage

