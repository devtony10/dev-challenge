dev-challenge:

cd src/design/ui-preset
yarn; yarn build; yarn link

cd src/design/icons
yarn; yarn build; yarn link

cd src/design/ui
yarn; yarn build; yarn link ui-preset; yarn link icons


in project root directory:

yarn
yarn link ui

start the server:

yarn dev


dev-challenge-nest:

docker-compose up -d
yarn
yarn start:dev
