[![Maintainability](https://api.codeclimate.com/v1/badges/e26466aefb9d2d98928a/maintainability)](https://codeclimate.com/github/Efefefef/frontend-project-lvl2/maintainability)
![Node CI](https://github.com/Efefefef/frontend-project-lvl2/workflows/Node%20CI/badge.svg)

<h1>Diff utility</h1>

Compares two `json`, `yml` or `ini` files and shows a difference

Output is possible in several different formats

You could run it as a CLI utility or import as a library

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

[![asciicast](https://asciinema.org/a/RmZcJiJX9eSsj1xGXGbJ3NcYx.svg)](https://asciinema.org/a/RmZcJiJX9eSsj1xGXGbJ3NcYx)

For plain formatting pass `-f plain`:

[![asciicast](https://asciinema.org/a/kNhS4QiOqnvZqewiDW4nPRdHh.svg)](https://asciinema.org/a/kNhS4QiOqnvZqewiDW4nPRdHh)

For json formatting pass `-f json`:

[![asciicast](https://asciinema.org/a/hB2udU4kKhGQBCnSoHyhCN3Ow.svg)](https://asciinema.org/a/hB2udU4kKhGQBCnSoHyhCN3Ow)
