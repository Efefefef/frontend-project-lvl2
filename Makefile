install:
	npm install

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npx jest

test-coverage:
	npx jest --coverage

transpile:
	npx babel src --out-dir dist
