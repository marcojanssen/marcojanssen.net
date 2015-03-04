#!/bin/bash
rm -rf public/

git clone git@github.com:marcojanssen/marcojanssen.github.io.git public

hugo -b http://marcojanssen.net

cd public

git add --all
git commit -m "$1"
git push origin master

cd ../