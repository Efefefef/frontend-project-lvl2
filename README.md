[![Maintainability](https://api.codeclimate.com/v1/badges/e26466aefb9d2d98928a/maintainability)](https://codeclimate.com/github/Efefefef/frontend-project-lvl2/maintainability)
![Node CI](https://github.com/Efefefef/frontend-project-lvl2/workflows/Node%20CI/badge.svg)

<h1>Diff utility</h1>

Compares two `json`, `yml` or `ini` files and shows a difference.

Output is possible in several different formats

You could run it as CLI utility or import as a library

<h2>Install</h2>

`npm install` to install dependencies


<h2>CLI utility</h2>

`npm link` to install the package binaries globally

`$ genDiff(<firstFile> <secondFile>)`

<h2>Library</h2>

`import genDiff from genDiff`

`genDiff(<firstFile> <secondFile>)`

<h2>Options</h2>

You can change the format option by passing 

`-f, --format <format>`

Default formatting with no option provided:

ascii format=default

For plain formatting pass `-f plain`:

ascii format=yml

For json formatting pass `-f json`:

ascii format=ini
