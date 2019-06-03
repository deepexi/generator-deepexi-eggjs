[ -d test_proj ] && rm -rf test_proj

mkdir -p test_proj/
cd test_proj

yo deepexi-eggjs -c --db=mongo

npm i
npm test
# npm run dev
cd ..
rm -rf test_proj
