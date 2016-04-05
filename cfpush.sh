rm -rf .demeteorized
demeteorizer --architecture os.linux.x86_64

cp private/package.json .demeteorized/bundle/
cp private/manifest.yml .demeteorized/bundle/

cd .demeteorized/bundle
cf push
