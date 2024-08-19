command command nodejs 

setup {
    dep {
        npm install body-parser
        npm install cli
        npm install dotenv
        npm install mysql2
        npm install nodemon
        npm install sequelize
        shortcut = {{ npm i body-parser, cli, dotenv, mysql2, nodemon, sequelize, jsonwebtoken, bcrypt }}
    }
}


Skeleton {
    npx sequelize init
}

database migrations{
    error security = {{ Set-ExecutionPolicy RemoteSigned }}

    add:
         npx sequelize-cli db:migrate
         npx sequelize db:seed:all

    undo:
        npx sequelize db:migrate:undo:all
        npx sequelize db:seed:undo:all
}

run {
    npm run main 
}

exptra
cli command add file {
    file model+migration+attributes : 
        npx sequelize model:generate --name <User> --attributes name:string,job:string
    file migration : 
        npx sequelize migration:create --name=<create_users_table>
    file seeder : 
        npx sequelize seed:generate --name <nama-seeder>.js
}